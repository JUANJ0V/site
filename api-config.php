<?php
/**
 * api-config.php — Credenciais do banco de dados
 * Altere os valores abaixo com os dados do seu MySQL.
 * 
 * Hostinger: cPanel → Databases → MySQL Databases
 * - Nome do BD:   u123456789_site
 * - Usuário:      u123456789_admin
 * - Senha:        (a que você criou)
 * - Host:         localhost (ou mysql.hostinger.com)
 */

define('DB_HOST', 'localhost');
define('DB_NAME', 'seu_banco_de_dados');
define('DB_USER', 'seu_usuario');
define('DB_PASS', 'sua_senha');
define('DB_CHARSET', 'utf8mb4');

// Opcional: senha para autenticar a API (melhor que deixar aberto)
define('API_PASSWORD', ''); // Deixe vazio para desabilitar
