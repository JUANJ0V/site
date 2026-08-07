<?php
/**
 * api-config.example.php
 *
 * Copie este arquivo como api-config.php e preencha com seus dados.
 *
 * MODO SIMPLES (padrão — sem banco de dados):
 *   - O site lê direto de js/data.js
 *   - No admin, "Salvar no servidor (PHP)" em Config reescreve data.js via save.php
 */

// ── Senha compartilhada ──
// Usada por save.php e upload.php (o painel pede 1x e fica salva no navegador)
define('API_PASSWORD', 'suasenhaaqui');

// ── Email para notificações de contato (opcional) ──
// Se definido, o formulário envia para este endereço via PHP mail() (ou FormSubmit.co de fallback).
// Se não definido, usa contato@furpal.com.br.
define('CONTACT_EMAIL', '');
