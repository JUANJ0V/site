<!DOCTYPE html>
<html lang="pt-BR" class="spa">
<head>
<?php include 'partials/head.php'; ?>
</head>
<body>
<div id="loading-screen" aria-hidden="true">
  <div class="loading-content">
    <div class="loading-brand">
      <span class="loading-wordmark">Furpal</span>
      <span class="loading-tagline">Assessoria Imobiliária Internacional</span>
    </div>
    <div class="loading-bar-track"><div class="loading-bar-fill"></div></div>
  </div>
</div>
<?php include 'partials/header.php'; ?>
<div class="page-content" role="main">
<?php
include 'partials/hero.php';
include 'partials/sobre.php';
include 'partials/imoveis.php';
include 'partials/servicos-equipe.php';
include 'partials/proof.php';
include 'partials/favoritos-blog-mapa.php';
include 'partials/faq-financiamento.php';
include 'partials/contato-privacidade.php';
?>
</div>
<?php
include 'partials/footer.php';
include 'partials/scripts.php';
?>
</body>
</html>
