<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Método no permitido']);
    exit;
}

$name    = isset($_POST['Nome'])     ? trim($_POST['Nome'])     : '';
$email   = isset($_POST['Email'])    ? trim($_POST['Email'])    : '';
$phone   = isset($_POST['Telefone']) ? trim($_POST['Telefone']) : '';
$message = isset($_POST['Mensagem']) ? trim($_POST['Mensagem']) : '';

$name    = str_replace(["\r", "\n"], '', $name);
$email   = str_replace(["\r", "\n"], '', $email);
$phone   = str_replace(["\r", "\n"], '', $phone);
$message = str_replace(["\r", "\n"], '', $message);

$name    = mb_substr($name, 0, 100);
$email   = mb_substr($email, 0, 254);
$phone   = mb_substr($phone, 0, 30);
$message = mb_substr($message, 0, 5000);

if (!$name || !$email || !$message) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Nome, email e mensagem são obrigatórios']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Email inválido']);
    exit;
}

$to = 'contato@furpal.com.br';
$configFile = __DIR__ . '/api-config.php';
if (file_exists($configFile)) {
    require_once $configFile;
    if (defined('CONTACT_EMAIL')) $to = CONTACT_EMAIL;
}

$subject = 'Novo contato do site — ' . $name;
$headers = 'From: ' . $to . "\r\n"
         . 'Reply-To: ' . $email . "\r\n"
         . 'MIME-Version: 1.0' . "\r\n"
         . 'Content-Type: text/plain; charset=UTF-8' . "\r\n"
         . 'X-Mailer: PHP/' . phpversion();

$body = "Nome: $name\n"
      . "Email: $email\n"
      . "Telefone: $phone\n\n"
      . "Mensagem:\n$message\n";

$ok = @mail($to, $subject, $body, $headers);

if ($ok) {
    echo json_encode(['ok' => true, 'message' => 'Mensagem enviada com sucesso!']);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Erro ao enviar email. O servidor pode não suportar PHP mail().']);
}
