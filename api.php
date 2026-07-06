<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }

$dataFile = __DIR__ . '/bd_data.json';

function loadData() {
  global $dataFile;
  if (!file_exists($dataFile)) {
    $empty = [
      'constants' => [],
      'stats' => [],
      'properties' => [],
      'empreendimentos' => [],
      'faq' => [],
      'depoimentos' => [],
      'parceiros' => [],
      'blog' => [],
      'team' => [],
      'locations_info' => []
    ];
    file_put_contents($dataFile, json_encode($empty, JSON_PRETTY_PRINT));
    chmod($dataFile, 0666);
    return $empty;
  }
  return json_decode(file_get_contents($dataFile), true);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $action = $_GET['action'] ?? '';
  if ($action === 'ping') {
    http_response_code(200);
    echo json_encode(['ok' => true]);
    exit;
  }
  $data = loadData();
  if ($action === 'all') {
    echo json_encode($data);
    exit;
  }
  if (array_key_exists($action, $data)) {
    echo json_encode($data[$action]);
    exit;
  }
  http_response_code(400);
  echo json_encode(['error' => 'Ação desconhecida: ' . $action]);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $password = '';
  $configFile = __DIR__ . '/api-config.php';
  if (file_exists($configFile)) {
    require_once $configFile;
    if (defined('API_PASSWORD')) $password = API_PASSWORD;
  }
  $body = json_decode(file_get_contents('php://input'), true);
  if (!$body) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'JSON inválido']);
    exit;
  }
  if ($password !== '' && empty($body['password'])) {
    http_response_code(403);
    echo json_encode(['ok' => false, 'error' => 'Senha não informada']);
    exit;
  }
  if ($password !== '' && $body['password'] !== $password) {
    http_response_code(403);
    echo json_encode(['ok' => false, 'error' => 'Senha incorreta']);
    exit;
  }
  unset($body['password']);
  $data = loadData();
  foreach ($body as $key => $value) {
    $data[$key] = $value;
  }
  $written = file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
  if ($written === false) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Erro ao escrever bd_data.json (sem permissão)', 'path' => $dataFile]);
    exit;
  }
  echo json_encode(['ok' => true, 'message' => 'Dados salvos no BD!']);
  exit;
}

http_response_code(405);
echo json_encode(['error' => 'Método não permitido']);
