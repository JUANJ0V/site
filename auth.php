<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(array('ok' => false, 'error' => 'Método não permitido'));
    exit;
}

require_once __DIR__ . '/_secure.php';

$configFile = __DIR__ . '/api-config.php';
if (!file_exists($configFile)) {
    http_response_code(500);
    echo json_encode(array('ok' => false, 'error' => 'api-config.php não encontrado. Crie o arquivo com define("API_PASSWORD", "sua_senha");'));
    exit;
}
require_once $configFile;
if (!defined('API_PASSWORD') || !API_PASSWORD) {
    http_response_code(500);
    echo json_encode(array('ok' => false, 'error' => 'API_PASSWORD não definida em api-config.php'));
    exit;
}

$rec = _rate_state(_client_ip());
if (_rate_is_blocked($rec)) {
    http_response_code(429);
    echo json_encode(array('ok' => false, 'error' => 'Muitas tentativas. Aguarde ' . ceil($rec['retry_after'] / 60) . ' min.'));
    exit;
}

$body = json_decode(file_get_contents('php://input'), true);
$pwd = (is_array($body) && isset($body['password'])) ? $body['password'] : '';

if (!_check_password($pwd, API_PASSWORD)) {
    _rate_fail($rec);
    http_response_code(403);
    echo json_encode(array('ok' => false, 'error' => 'Senha incorreta'));
    exit;
}

_rate_ok($rec);

if (session_status() === PHP_SESSION_NONE) {
    session_set_cookie_params(array('lifetime' => 0, 'path' => '/', 'httponly' => true, 'samesite' => 'Lax'));
    @session_start();
}
$_SESSION['admin'] = true;

echo json_encode(array('ok' => true, 'message' => 'Autenticado'));
