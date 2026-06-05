<?php
header('Content-Type: application/json; charset=utf-8');

$password = 'fp2026';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Método não permitido']);
    exit;
}

$body = $_POST;
$file = isset($_FILES['file']) ? $_FILES['file'] : null;

if (!$body || empty($body['password']) || $body['password'] !== $password) {
    http_response_code(403);
    echo json_encode(['ok' => false, 'error' => 'Senha incorreta']);
    exit;
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

$baseDir = __DIR__ . '/' . $folder;
if (!is_dir($baseDir)) {
    mkdir($baseDir, 0755, true);
}

$ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
$allowedExts = ['jpg','jpeg','png','gif','webp','svg','mp4','webm','mov','avi'];
if (!in_array($ext, $allowedExts)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Tipo de arquivo não permitido: ' . $ext]);
    exit;
}

$name = preg_replace('/[^a-zA-Z0-9_-]/', '', pathinfo($file['name'], PATHINFO_FILENAME));
$name = substr($name, 0, 40) . '_' . time() . '.' . $ext;
$dest = $baseDir . '/' . $name;

if (!move_uploaded_file($file['tmp_name'], $dest)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Erro ao salvar arquivo']);
    exit;
}

$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$host = $_SERVER['HTTP_HOST'];
$url = $protocol . '://' . $host . '/' . $folder . '/' . $name;

echo json_encode(['ok' => true, 'url' => $url]);
