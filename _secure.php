<?php
/**
 * _secure.php — Helpers compartidos de seguridad
 * NO incluir directamente por URL: el .htaccess lo bloquea.
 */

// Comparación de contraseña a prueba de timing
function _check_password($provided, $expected) {
    return is_string($provided) && $provided !== '' && is_string($expected) && $expected !== ''
        && hash_equals($expected, $provided);
}

// IP real del cliente (solo REMOTE_ADDR: X-Forwarded-For es falsable y serviría para burlar el límite)
function _client_ip() {
    return isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : '0.0.0.0';
}

// Límite de intentos por IP: 10 fallos en 15 min → bloqueo de 15 min
function _rate_state($ip) {
    $dir = __DIR__ . '/tmp/ratelimit';
    if (!is_dir($dir)) @mkdir($dir, 0755, true);
    $file = $dir . '/' . md5($ip) . '.json';
    $now = time();
    $data = array('count' => 0, 'first' => $now, 'blocked_until' => 0);
    if (file_exists($file)) {
        $raw = @file_get_contents($file);
        $tmp = $raw ? json_decode($raw, true) : null;
        if (is_array($tmp)) {
            if (isset($tmp['count'])) $data['count'] = (int) $tmp['count'];
            if (isset($tmp['first'])) $data['first'] = (int) $tmp['first'];
            if (isset($tmp['blocked_until'])) $data['blocked_until'] = (int) $tmp['blocked_until'];
        }
    }
    if ($now - $data['first'] > 900) {
        $data = array('count' => 0, 'first' => $now, 'blocked_until' => 0);
    }
    $blocked = $data['blocked_until'] > $now;
    return array('ip' => $ip, 'file' => $file, 'data' => $data, 'blocked' => $blocked,
                 'retry_after' => $blocked ? ($data['blocked_until'] - $now) : 0);
}

function _rate_is_blocked($rec) {
    return $rec['blocked'];
}

function _rate_fail($rec) {
    $d = $rec['data'];
    $d['count'] = $d['count'] + 1;
    $d['first'] = time();
    if ($d['count'] >= 10) $d['blocked_until'] = time() + 900;
    @file_put_contents($rec['file'], json_encode($d));
}

function _rate_ok($rec) {
    $d = $rec['data'];
    $d['count'] = 0;
    $d['blocked_until'] = 0;
    @file_put_contents($rec['file'], json_encode($d));
}

// Autenticación por sesión PHP (la deja auth.php)
function _session_authed() {
    if (session_status() === PHP_SESSION_ACTIVE) {
        return !empty($_SESSION['admin']);
    }
    if (session_status() === PHP_SESSION_NONE) {
        session_set_cookie_params(array('lifetime' => 0, 'path' => '/', 'httponly' => true, 'samesite' => 'Lax'));
        @session_start();
        return !empty($_SESSION['admin']);
    }
    return false;
}

// Throttle simple por IP para envíos de formularios (p. ej. contacto)
function _throttle_once($ip, $key, $minInterval = 60) {
    $dir = __DIR__ . '/tmp/throttle';
    if (!is_dir($dir)) @mkdir($dir, 0755, true);
    $file = $dir . '/' . $key . '-' . md5($ip) . '.json';
    $now = time();
    $last = 0;
    if (file_exists($file)) {
        $raw = @file_get_contents($file);
        $d = $raw ? json_decode($raw, true) : null;
        if (is_array($d) && isset($d['t'])) $last = (int) $d['t'];
    }
    if ($now - $last < $minInterval) {
        return array('blocked' => true, 'wait' => $minInterval - ($now - $last));
    }
    @file_put_contents($file, json_encode(array('t' => $now)));
    return array('blocked' => false, 'wait' => 0);
}
