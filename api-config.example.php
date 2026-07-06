<?php
/**
 * api-config.example.php
 *
 * Copie este arquivo como api-config.php e preencha com seus dados.
 *
 * MODO SIMPLES (sem BD — salva direto no data.js via save.php):
 *   - Preencha apenas API_PASSWORD
 *   - No admin, use "Salvar no servidor (PHP)" em Config
 *
 * MODO BD (com MySQL — salva via api.php):
 *   - Preencha TODAS as constantes abaixo
 *   - Acesse /api.php?setup uma vez para criar as tabelas
 *   - No admin > Config, ative "Modo Banco de Dados" com URL base: /api.php
 */

// ── Senha compartilhada ──
// Usada pelo save.php (modo simples) e como token de autenticação da api.php
define('API_PASSWORD', 'suasenhaaqui');

// ── Email para notificações de contato (opcional) ──
// Se definido, o formulário de contato enviará emails para este endereço via PHP mail().
// Se não definido, usa contato@furpal.com.br como fallback.
// NOTA: muitos hosts gratuitos (InfinityFree free) bloqueiam PHP mail().
// Nesse caso o formulário cai de fallback para FormSubmit.co.
define('CONTACT_EMAIL', '');

// ── MySQL (obrigatório apenas para o modo BD) ──
define('DB_HOST',    'localhost');
define('DB_NAME',    'seudb');
define('DB_USER',    'seuusuario');
define('DB_PASS',    'suasenhamysql');
define('DB_CHARSET', 'utf8mb4');
