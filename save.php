<?php
header('Content-Type: application/json; charset=utf-8');

$password = 'fp2026';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Método não permitido']);
    exit;
}

$body = json_decode(file_get_contents('php://input'), true);

if (!$body || empty($body['password']) || $body['password'] !== $password) {
    http_response_code(403);
    echo json_encode(['ok' => false, 'error' => 'Senha incorreta']);
    exit;
}

if (!isset($body['content'])) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Conteúdo não enviado']);
    exit;
}

$file = __DIR__ . '/js/data.js';
$written = file_put_contents($file, $body['content']);

if ($written === false) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Erro ao escrever o arquivo']);
    exit;
}

echo json_encode(['ok' => true, 'message' => 'data.js salvo com sucesso!']);
