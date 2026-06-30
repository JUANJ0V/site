  <!-- COMPRAR -->
  <section id="comprar">
    <div class="container">
      <div class="section-header">
        <p class="eyebrow">Imóveis à venda</p>
        <div class="gold-rule"></div>
        <h2>Encontre o imóvel ideal para comprar</h2>
      </div>
      <form class="section-search" onsubmit="handleComprarSearch();return false;">
        <select id="comprar-type" aria-label="Tipo de imóvel"><option value="">Tipo</option></select>
        <select id="comprar-location" aria-label="Localização"><option value="">Localização</option></select>
        <input id="comprar-price" type="number" placeholder="Preço máx." aria-label="Preço máximo" min="0" step="10000" />
        <button type="submit">Filtrar</button>
        <button type="button" onclick="clearComprarSearch()">Limpar</button>
      </form>
      <div class="grid-3" id="compra-cards"></div>
      <div class="request-form-wrap">
        <div class="request-form">
          <div class="section-header" style="margin-bottom:1.5rem;">
            <p class="eyebrow">Não encontrou o imóvel ideal?</p>
            <div class="gold-rule"></div>
            <h2>Solicite uma busca personalizada</h2>
            <p style="margin-top:0.5rem;color:var(--muted-foreground);font-size:0.85rem;">Conte o que você procura e vamos encontrar o imóvel perfeito para você.</p>
          </div>
          <div class="request-form-grid" data-purpose="comprar"></div>
        </div>
      </div>
    </div>
  </section>

  <!-- ALUGAR -->
  <section id="alugar">
    <div class="container">
      <div class="section-header">
        <p class="eyebrow">Imóveis para alugar</p>
        <div class="gold-rule"></div>
        <h2>As melhores opções de aluguel</h2>
      </div>
      <form class="section-search" onsubmit="handleAlugarSearch();return false;">
        <select id="alugar-type" aria-label="Tipo de imóvel"><option value="">Tipo</option></select>
        <select id="alugar-location" aria-label="Localização"><option value="">Localização</option></select>
        <input id="alugar-price" type="number" placeholder="Preço máx." aria-label="Preço máximo" min="0" step="10000" />
        <button type="submit">Filtrar</button>
        <button type="button" onclick="clearAlugarSearch()">Limpar</button>
      </form>
      <div class="grid-2" id="aluga-cards"></div>
      <div class="request-form-wrap">
        <div class="request-form">
          <div class="section-header" style="margin-bottom:1.5rem;">
            <p class="eyebrow">Não encontrou o imóvel ideal?</p>
            <div class="gold-rule"></div>
            <h2>Solicite uma busca personalizada</h2>
            <p style="margin-top:0.5rem;color:var(--muted-foreground);font-size:0.85rem;">Conte o que você procura e vamos encontrar o imóvel perfeito para você.</p>
          </div>
          <div class="request-form-grid" data-purpose="alugar"></div>
        </div>
      </div>
    </div>
  </section>

  <!-- LANÇAMENTOS -->
  <section id="lancamentos">
    <div class="container">
      <div class="section-header">
        <p class="eyebrow">Lançamentos</p>
        <div class="gold-rule"></div>
        <h2>Empreendimentos exclusivos</h2>
      </div>
      <form class="section-search" onsubmit="handleLancSearch();return false;">
        <select id="lanc-location" aria-label="Localização"><option value="">Localização</option></select>
        <button type="submit">Filtrar</button>
        <button type="button" onclick="clearLancSearch()">Limpar</button>
      </form>
      <div class="grid-3" id="lanc-cards"></div>
    </div>
  </section>
