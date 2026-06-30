  <!-- HERO -->
  <section id="inicio" class="hero">
    <div class="hero-media" id="heroMedia">
    </div>
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <p class="eyebrow" style="margin-bottom:1.5rem;">Sua jornada começa aqui</p>
          <h1>Furpal em Balneário Camboriú | Assessoria Imobiliária Completa</h1>
      <p>Mais de 500 imóveis no Território Catarinense. Te acompanhamos do início ao fim para você investir com segurança e confiança.</p>
      <div class="hero-search">
        <form class="hero-search-inner" onsubmit="handleSearch();return false;">
          <select id="search-type" aria-label="Tipo de imóvel">
            <option value="">Tipo de imóvel</option>
          </select>
          <select id="search-location" aria-label="Localização">
            <option value="">Localização</option>
          </select>
          <select id="search-purpose" aria-label="Finalidade">
            <option value="">Todos os imóveis</option>
          </select>
          <input id="search-price" type="number" placeholder="Preço máximo" aria-label="Preço máximo" min="0" step="10000" />
          <button type="submit">Buscar</button>
        </form>
      </div>
      <div class="hero-actions">
        <a href="/comprar/" class="btn-primary">Ver imóveis</a>
        <a href="/contato/" class="btn-outline nav-whatsapp-cta" data-whatsapp-msg="Olá, gostaria de pedir uma assessoria sobre investimentos em imóveis.">Solicitar assessoria</a>
      </div>
    </div>
    <div class="hero-nav" id="heroNav"></div>
  </section>

  <!-- CONHECER A REGIÃO -->
  <section id="location-info" class="location-info" style="display:none;">
    <div class="container">
      <div id="location-info-content"></div>
      <div style="text-align:center;margin-top:2rem;">
        <button onclick="closeLocationInfo()" class="btn-gold-outline" style="font-size:0.8rem;padding:0.75rem 2rem;cursor:pointer;">Fechar</button>
      </div>
    </div>
  </section>
