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

$body = $_POST;
$file = isset($_FILES['file']) ? $_FILES['file'] : null;

// Autenticação: sessão PHP (auth.php) ou senha (com hash_equals + limite de tentativas)
if (!_session_authed()) {
    $rec = _rate_state(_client_ip());
    if (_rate_is_blocked($rec)) {
        http_response_code(429);
        echo json_encode(['ok' => false, 'error' => 'Muitas tentativas. Aguarde ' . ceil($rec['retry_after'] / 60) . ' min.']);
        exit;
    }
    if (empty($body['password']) || !_check_password($body['password'], $password)) {
        _rate_fail($rec);
        http_response_code(403);
        echo json_encode(['ok' => false, 'error' => 'Senha incorreta']);
        exit;
    }
    _rate_ok($rec);
}

if (!$file || $file['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    $errMsg = 'Erro no upload do arquivo';
    if ($file && $file['error'] === UPLOAD_ERR_INI_SIZE) $errMsg = 'Arquivo muito grande';
    echo json_encode(['ok' => false, 'error' => $errMsg]);
    exit;
}

$folder = isset($body['folder']) ? preg_replace('/[^a-zA-Z0-9_\/-]/', '', $body['folder']) : 'images';
if (!$folder) $folder = 'images';
if (strpos($folder, '..') !== false) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Pasta inválida']);
    exit;
}

$baseDir = __DIR__ . '/' . $folder;
if (strpos($baseDir, __DIR__) !== 0) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Pasta inválida']);
    exit;
}
if (!is_dir($baseDir)) {
    mkdir($baseDir, 0755, true);
}

$ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
$allowedExts = ['jpg','jpeg','png','gif','webp','mp4','webm','mov','avi'];
if (!in_array($ext, $allowedExts)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Tipo de arquivo não permitido: ' . $ext]);
    exit;
}

$isImage = in_array($ext, ['jpg','jpeg','png','gif','webp']);
if ($isImage && @getimagesize($file['tmp_name']) === false) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Arquivo de imagem inválido']);
    exit;
}

if ($file['size'] > 25 * 1024 * 1024) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Arquivo muito grande (máx. 25 MB)']);
    exit;
}

$name = '';
if (!empty($body['name'])) {
    $req = preg_replace('/[^a-zA-Z0-9._-]/', '', $body['name']);
    if ($req !== '' && strpos($req, '..') === false && strlen($req) <= 60 && strtolower(pathinfo($req, PATHINFO_EXTENSION)) === $ext) {
        $name = $req;
    }
}
if ($name === '') {
    $name = substr(preg_replace('/[^a-zA-Z0-9_-]/', '', pathinfo($file['name'], PATHINFO_FILENAME)), 0, 40) . '_' . time() . '.' . $ext;
}
$dest = $baseDir . '/' . $name;

if (!move_uploaded_file($file['tmp_name'], $dest)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Erro ao salvar arquivo']);
    exit;
}

$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$host = $_SERVER['HTTP_HOST'];
$basePath = rtrim(str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME'])), '/');
$url = $protocol . '://' . $host . $basePath . '/' . $folder . '/' . $name;

echo json_encode(['ok' => true, 'url' => $url]);
