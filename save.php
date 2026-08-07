<?php
header('Content-Type: application/json; charset=utf-8');

// Obtém a senha do api-config.php (DEVE estar configurado)
$configFile = __DIR__ . '/api-config.php';
if (!file_exists($configFile)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'api-config.php não encontrado. Crie o arquivo com define("API_PASSWORD", "sua_senha");']);
    exit;
}
require_once $configFile;
if (!defined('API_PASSWORD') || !API_PASSWORD) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'API_PASSWORD não definida em api-config.php']);
    exit;
}
$password = API_PASSWORD;

require_once __DIR__ . '/_secure.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Método não permitido']);
    exit;
}

$body = json_decode(file_get_contents('php://input'), true);
if (!$body) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'JSON inválido']);
    exit;
}

// Autenticação: sessão PHP (auth.php) ou senha (com hash_equals + limite de tentativas)
if (!_session_authed()) {
    $rec = _rate_state(_client_ip());
    if (_rate_is_blocked($rec)) {
        http_response_code(429);
        echo json_encode(['ok' => false, 'error' => 'Muitas tentativas. Aguarde ' . ceil($rec['retry_after'] / 60) . ' min.']);
        exit;
    }
    if (!isset($body['password']) || !_check_password($body['password'], $password)) {
        _rate_fail($rec);
        http_response_code(403);
        echo json_encode(['ok' => false, 'error' => 'Senha incorreta']);
        exit;
    }
    _rate_ok($rec);
}

if (!isset($body['content'])) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Conteúdo não enviado']);
    exit;
}

$content = $body['content'];

// InfinityFree bloqueia POSTs cujo corpo parece código JS.
// O painel envia o conteúdo em base64 (encoded=true) para burlar o filtro.
if (!empty($body['encoded']) && is_string($content)) {
    $decoded = base64_decode($content, true);
    if ($decoded !== false) {
        $content = $decoded;
    }
}

// ── Validação básica ──
$trimmed = trim($content);
if (strlen($trimmed) < 10) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Conteúdo muito curto']);
    exit;
}

// Verifica se parece JS válido (const/var/let/function)
if (!preg_match('/\b(const|var|let|function|window|document|\/\/|\/\*)\b/', $trimmed)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Conteúdo não parece JavaScript válido']);
    exit;
}

// ── Validação com Node.js (se disponível) ──
$tmpFile = __DIR__ . '/js/data.tmp.js';
if (file_put_contents($tmpFile, $content) === false) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Erro ao escrever arquivo temporário']);
    exit;
}

$nodeOutput = null;
// node/--check é só uma validação extra. Em hospedagens que desabilitam shell_exec
// (ex.: InfinityFree) a chamada fatal derrubaria o script — então só roda se existir.
if (function_exists('shell_exec')) {
    $nodeOutput = @shell_exec('node --check ' . escapeshellarg($tmpFile) . ' 2>&1');
}
if ($nodeOutput !== null && strpos($nodeOutput, 'SyntaxError') !== false) {
    unlink($tmpFile);
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Erro de sintaxe JavaScript: ' . trim($nodeOutput)]);
    exit;
}

// ── Se passou, move para o definitivo ──
$final = __DIR__ . '/js/data.js';
if (!@rename($tmpFile, $final)) {
    @unlink($tmpFile);
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Erro ao salvar em js/data.js (verifique a permissão de escrita da pasta js/)']);
    exit;
}

echo json_encode(['ok' => true, 'message' => 'data.js salvo com sucesso!']);
