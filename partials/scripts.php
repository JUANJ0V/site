<script src="js/data.js?v=5"></script>
<script src="js/data-provider.js?v=2"></script>
<script src="js/admin.min.js?v=5"></script>
<script>
// If BD mode is active, load data from API BEFORE the page renders
(function() {
  if (window.DataProvider && DataProvider.isApi()) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', DataProvider.apiBase + '?action=all', false);
    try { xhr.send(); } catch(e) {}
    if (xhr.status === 200) {
      try {
        var d = JSON.parse(xhr.responseText);
        if (d.properties && d.properties.length) { try { PROPERTIES.length=0; d.properties.forEach(function(p){PROPERTIES.push(p);}); } catch(e) { window.PROPERTIES = d.properties; } }
        if (d.empreendimentos && d.empreendimentos.length) { try { EMPREENDIMENTOS.length=0; d.empreendimentos.forEach(function(e){EMPREENDIMENTOS.push(e);}); } catch(e) { window.EMPREENDIMENTOS = d.empreendimentos; } }
        if (d.faq && d.faq.length) { try { FAQS.length=0; d.faq.forEach(function(f){FAQS.push(f);}); } catch(e) { window.FAQS = d.faq; } }
        if (d.depoimentos && d.depoimentos.length) { try { DEPOIMENTOS.length=0; d.depoimentos.forEach(function(dd){DEPOIMENTOS.push(dd);}); } catch(e) { window.DEPOIMENTOS = d.depoimentos; } }
        if (d.parceiros && d.parceiros.length) { try { PARCEIROS.length=0; d.parceiros.forEach(function(pp){PARCEIROS.push(pp);}); } catch(e) { window.PARCEIROS = d.parceiros; } }
        if (d.blog && d.blog.length) { try { BLOG_POSTS.length=0; d.blog.forEach(function(b){BLOG_POSTS.push(b);}); } catch(e) { window.BLOG_POSTS = d.blog; } }
        if (d.team && d.team.length) { try { TEAM.length=0; d.team.forEach(function(t){TEAM.push(t);}); } catch(e) { window.TEAM = d.team; } }
        if (d.stats && d.stats.length) { try { STATS.length=0; d.stats.forEach(function(s){STATS.push(s);}); } catch(e) { window.STATS = d.stats; } }
        if (d.locations_info && typeof d.locations_info === 'object' && !Array.isArray(d.locations_info)) { try { Object.keys(LOCATIONS_INFO).forEach(function(k){delete LOCATIONS_INFO[k];}); Object.keys(d.locations_info).forEach(function(k){LOCATIONS_INFO[k]=d.locations_info[k];}); } catch(e) { window.LOCATIONS_INFO = d.locations_info; } }
      } catch(e) { console.warn('[BD] Erro ao parsear dados:', e); }
    }
  }
})();
</script>
<script>
// Auto-update site info from data.js constants
  document.addEventListener('DOMContentLoaded', function() {
    // Set header height CSS variable dynamically
    var headerEl = document.querySelector('.site-header');
    if (headerEl) {
      document.documentElement.style.setProperty('--header-height', headerEl.offsetHeight + 'px');
    }
    // Prevent Google Translate banner from pushing/shifting the page
    function cleanTranslateBanner() {
      document.body.style.removeProperty('top');
      document.body.style.removeProperty('position');
      document.querySelectorAll('.goog-te-banner-frame, iframe[src*="translate"], .skiptranslate iframe').forEach(function(f) {
        f.style.display = 'none'; f.style.height = '0'; f.style.visibility = 'hidden';
      });
    }
    cleanTranslateBanner();
    setInterval(cleanTranslateBanner, 100);
    // MutationObserver catches any inline style Google forces onto body immediately
    var translateObs = new MutationObserver(function(muts) {
      muts.forEach(function(m) {
        if (m.type === 'attributes' && m.attributeName === 'style') {
          m.target.style.removeProperty('top');
          m.target.style.removeProperty('position');
        }
      });
    });
    translateObs.observe(document.body, { attributes: true, attributeFilter: ['style'] });
  // Site name in logo and brand (first word plain, rest in gold span)
  document.querySelectorAll('.site-logo, .footer-brand .site-logo').forEach(function(el) {
    if (SITE_LOGO) {
      el.innerHTML = '<img src="' + SITE_LOGO + '" alt="' + SITE_NAME.replace(/"/g, '&quot;') + '" loading="lazy" />';
    } else {
      var words = SITE_NAME.split(' ');
      el.innerHTML = words.length > 1 ? words[0] + ' <span>' + words.slice(1).join(' ') + '</span>' : SITE_NAME;
    }
  });
  // Apply logo size/position config to CSS custom properties
  if (typeof LOGO_MAX_HEIGHT !== 'undefined') document.documentElement.style.setProperty('--logo-max-height', LOGO_MAX_HEIGHT);
  if (typeof LOGO_MAX_WIDTH !== 'undefined') document.documentElement.style.setProperty('--logo-max-width', LOGO_MAX_WIDTH);
  if (typeof LOGO_MARGIN !== 'undefined') document.documentElement.style.setProperty('--logo-margin', LOGO_MARGIN);
  // Page title, meta tags (rebuild after " — ")
  function rebuildMeta(text, name) {
    var parts = text.split('\u2014');
    return name + (parts.length > 1 ? ' \u2014 ' + parts.slice(1).join('\u2014').trim() : '');
  }
  var titleTag = document.querySelector('title');
  if (titleTag) titleTag.textContent = rebuildMeta(titleTag.textContent, SITE_NAME);
  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = rebuildMeta(metaDesc.content, SITE_NAME);
  var ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.content = rebuildMeta(ogTitle.content, SITE_NAME);
  var ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.content = rebuildMeta(ogDesc.content, SITE_NAME);
  // Footer copyright
  document.querySelectorAll('.footer-bottom span').forEach(function(span) {
    if (span.textContent.indexOf('Todos os direitos') > -1) {
      span.textContent = '\u00A9 ' + new Date().getFullYear() + ' ' + SITE_NAME + '. Todos os direitos reservados.';
    }
  });
  // WhatsApp links (skip team cards — each member has their own number)
  document.querySelectorAll('a[href*="wa.me/"]').forEach(function(a) {
    if (a.closest('.team-card')) return;
    a.href = a.href.replace(/wa.me\/\d+/, 'wa.me/' + WHATSAPP_NUMBER);
  });
  // WhatsApp display text in footer
  document.querySelectorAll('.footer-col li a[href*="wa.me/"]').forEach(function(a) {
    a.textContent = 'WhatsApp: ' + WHATSAPP_DISPLAY;
  });
  // WhatsApp CTAs com mensagem personalizada
  document.querySelectorAll('.nav-whatsapp-cta').forEach(function(a) {
    var msg = a.getAttribute('data-whatsapp-msg') || 'Olá, gostaria de falar com a Furpal.';
    a.href = WHATSAPP_URL + '?text=' + encodeURIComponent(msg);
    a.target = '_blank';
  });
  // Email links
  document.querySelectorAll('a[href^="mailto:"]').forEach(function(a) {
    a.href = 'mailto:' + SITE_EMAIL;
    if (a.textContent.indexOf('@') > -1) a.textContent = SITE_EMAIL;
  });
  // Footer address
  document.querySelectorAll('.footer-col li').forEach(function(li) {
    if (li.textContent.indexOf('Av.') > -1) {
      if (SITE_MAPS) {
        li.innerHTML = '<a href="' + SITE_MAPS + '" target="_blank" style="text-decoration:underline;">' + SITE_ADDRESS + '</a>';
      } else {
        li.textContent = SITE_ADDRESS;
      }
    }
    if (li.textContent.indexOf('Balneário') > -1 || li.textContent.indexOf('— SC') > -1) li.textContent = SITE_CITY + ' \u2014 ' + SITE_REGION;
  });
  // OG url
  var ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.content = SITE_URL;
  // JSON-LD
  var ld = document.querySelector('script[type="application/ld+json"]');
  if (ld) {
    try {
      var data = JSON.parse(ld.textContent);
      data.name = SITE_NAME;
      data.url = SITE_URL;
      data.telephone = '+' + WHATSAPP_NUMBER;
      data.address.streetAddress = SITE_ADDRESS;
      data.address.addressLocality = SITE_CITY;
      data.address.addressRegion = SITE_REGION;
      ld.textContent = JSON.stringify(data);
    } catch(e) {}
  }
  // Disabled nav sections
  if (DISABLED_SECTIONS && DISABLED_SECTIONS.length) {
    for (var ds = 0; ds < DISABLED_SECTIONS.length; ds++) {
      var sid = DISABLED_SECTIONS[ds];
      // Desktop nav
      var navLink = document.querySelector('.nav-list a[href="/' + sid + '/"]');
      if (navLink && navLink.parentElement) navLink.parentElement.style.display = 'none';
      // Mobile nav
      var mobLink = document.querySelector('#mobileNav a[href="/' + sid + '/"]');
      if (mobLink) mobLink.style.display = 'none';
      // Footer nav
      var footLink = document.querySelector('.site-footer a[href="/' + sid + '/"]');
      if (footLink && footLink.parentElement) footLink.parentElement.style.display = 'none';
    }
  }
  window.renderTeam = function() {
    var teamGrid = document.getElementById('teamGrid');
    if (!teamGrid) return;
    if (typeof TEAM === 'undefined' || !TEAM.length) return;
    teamGrid.innerHTML = '';
    for (var ti = 0; ti < TEAM.length; ti++) {
      var m = TEAM[ti];
      var card = document.createElement('div');
      card.className = 'team-card';
      var photoHtml = m.photo
        ? '<div class="team-photo"><img src="' + m.photo + '" alt="' + m.name + '" loading="lazy"></div>'
        : '<div class="team-photo team-photo-initial"><span>' + m.name.charAt(0) + '</span></div>';
      var socialHtml = '';
      if (m.social) {
        if (m.social.instagram) socialHtml += '<a href="' + m.social.instagram + '" target="_blank" rel="noopener" class="team-social" aria-label="Instagram"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>';
        if (m.social.linkedin) socialHtml += '<a href="' + m.social.linkedin + '" target="_blank" rel="noopener" class="team-social" aria-label="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>';
        if (m.social.whatsapp) socialHtml += '<a href="' + m.social.whatsapp + '" target="_blank" rel="noopener" class="team-social" aria-label="WhatsApp"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>';
        if (m.social.facebook) socialHtml += '<a href="' + m.social.facebook + '" target="_blank" rel="noopener" class="team-social" aria-label="Facebook"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>';
        if (m.social.youtube) socialHtml += '<a href="' + m.social.youtube + '" target="_blank" rel="noopener" class="team-social" aria-label="YouTube"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22.5 6.4a2.8 2.8 0 0 0-2-2C18.9 4 12 4 12 4s-6.9 0-8.5.4a2.8 2.8 0 0 0-2 2C1 8 1 12 1 12s0 4 .5 5.6a2.8 2.8 0 0 0 2 2C5.1 20 12 20 12 20s6.9 0 8.5-.4a2.8 2.8 0 0 0 2-2C23 16 23 12 23 12s0-4-.5-5.6z"/><polygon points="10 8 16 12 10 16 10 8"/></svg></a>';
        if (m.social.site) socialHtml += '<a href="' + m.social.site + '" target="_blank" rel="noopener" class="team-social" aria-label="Site"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></a>';
      }
      card.innerHTML = photoHtml + '<div class="team-body"><h3 class="team-name">' + m.name + '</h3><p class="team-role">' + m.role + '</p><p class="team-desc">' + m.desc + '</p>' + (socialHtml ? '<div class="team-social-row">' + socialHtml + '</div>' : '') + '</div>';
      teamGrid.appendChild(card);
    }
  }
  // Team — render cards
  renderTeam();
  // Stats en "Quem somos"
  (function() {
    var aboutStats = document.getElementById('aboutStats');
    if (aboutStats && typeof STATS !== 'undefined' && STATS.length) {
      aboutStats.innerHTML = '';
      var showCount = Math.min(3, STATS.length);
      for (var si = 0; si < showCount; si++) {
        var sd = document.createElement('div');
        sd.innerHTML = '<p class="stat-num">' + STATS[si].value + '</p><p class="stat-label">' + STATS[si].label + '</p>';
        aboutStats.appendChild(sd);
      }
    }
  })();
  // Section texts — editable from data.js
  var sectionTexts = [
    { id: 'hero', eyebrowSel: '.hero-content .eyebrow', eyebrow: HERO_EYEBROW, titleSel: '.hero-content h1', title: HERO_TITLE, subtitleSel: '.hero-content p + p', subtitle: HERO_SUBTITLE },
    { id: 'sobre', eyebrowSel: '#sobre .eyebrow', eyebrow: SECTION_SOBRE_EYEBROW, titleSel: '#sobre h2', title: SECTION_SOBRE_TITLE },
    { id: 'comprar', eyebrowSel: '#comprar .eyebrow', eyebrow: SECTION_COMPRAR_EYEBROW, titleSel: '#comprar h2', title: SECTION_COMPRAR_TITLE },
    { id: 'alugar', eyebrowSel: '#alugar .eyebrow', eyebrow: SECTION_ALUGAR_EYEBROW, titleSel: '#alugar h2', title: SECTION_ALUGAR_TITLE },
    { id: 'lancamentos', eyebrowSel: '#lancamentos .eyebrow', eyebrow: SECTION_LANCAMENTOS_EYEBROW, titleSel: '#lancamentos h2', title: SECTION_LANCAMENTOS_TITLE },
    { id: 'servicos', eyebrowSel: '#servicos .eyebrow', eyebrow: SECTION_SERVICOS_EYEBROW, titleSel: '#servicos h2', title: SECTION_SERVICOS_TITLE },
    { id: 'depoimentos', eyebrowSel: '#depoimentos .eyebrow', eyebrow: SECTION_DEPOIMENTOS_EYEBROW, titleSel: '#depoimentos h2', title: SECTION_DEPOIMENTOS_TITLE },
    { id: 'stats', eyebrowSel: '#sectionStatsEyebrow', eyebrow: SECTION_STATS_EYEBROW, titleSel: '#sectionStatsTitle', title: SECTION_STATS_TITLE },
    { id: 'parceiros', eyebrowSel: '#parceiros .eyebrow', eyebrow: SECTION_PARCEIROS_EYEBROW, titleSel: '#parceiros h2', title: SECTION_PARCEIROS_TITLE },
    { id: 'faq', eyebrowSel: '#faq .eyebrow', eyebrow: SECTION_FAQ_EYEBROW, titleSel: '#faq h2', title: SECTION_FAQ_TITLE },
    { id: 'financiamento', eyebrowSel: '#financiamento .eyebrow', eyebrow: SECTION_FINANCIAMENTO_EYEBROW, titleSel: '#financiamento h2', title: SECTION_FINANCIAMENTO_TITLE },
    { id: 'contato', eyebrowSel: '#contato-form .eyebrow', eyebrow: SECTION_CONTATO_EYEBROW, titleSel: '#contato-form h2', title: SECTION_CONTATO_TITLE },
    { id: 'privacidade', eyebrowSel: '#privacidade .eyebrow', eyebrow: SECTION_PRIVACIDADE_EYEBROW, titleSel: '#privacidade h2', title: SECTION_PRIVACIDADE_TITLE },
    { id: 'mapa', eyebrowSel: '#sectionMapaEyebrow', eyebrow: SECTION_MAPA_EYEBROW, titleSel: '#sectionMapaTitle', title: SECTION_MAPA_TITLE },
    { id: 'favoritos', eyebrowSel: '#sectionFavEyebrow', eyebrow: SECTION_FAVORITOS_EYEBROW, titleSel: '#sectionFavTitle', title: SECTION_FAVORITOS_TITLE },
    { id: 'blog', eyebrowSel: '#sectionBlogEyebrow', eyebrow: SECTION_BLOG_EYEBROW, titleSel: '#sectionBlogTitle', title: SECTION_BLOG_TITLE }
  ];
  for (var st = 0; st < sectionTexts.length; st++) {
    var s = sectionTexts[st];
    var e = document.querySelector(s.eyebrowSel);
    if (e) e.textContent = s.eyebrow;
    var t = document.querySelector(s.titleSel);
    if (t) t.textContent = s.title;
    if (s.subtitleSel) {
      var sub = document.querySelector(s.subtitleSel);
      if (sub) sub.textContent = s.subtitle;
    }
  }
  // Render dynamic content
  if (typeof renderFAQs === 'function') renderFAQs();
  if (typeof renderDepoimentos === 'function') renderDepoimentos();
  if (typeof renderParceiros === 'function') renderParceiros();
  // Populate search dropdowns from data
  function populateSelect(id, values) {
    var sel = document.getElementById(id);
    if (!sel) return;
    for (var pi = 0; pi < values.length; pi++) {
      var opt = document.createElement('option');
      opt.textContent = values[pi];
      sel.appendChild(opt);
    }
  }
  var categories = [], locations = [];
  for (var pi = 0; pi < PROPERTIES.length; pi++) {
    var p = PROPERTIES[pi];
    if (categories.indexOf(p.category) === -1) categories.push(p.category);
    if (locations.indexOf(p.location) === -1) locations.push(p.location);
  }
  categories.sort(); locations.sort();
  populateSelect('search-type', categories);
  // Add "Conhecer a região" option
  (function() {
    var ts = document.getElementById('search-type');
    var histOpt = document.createElement('option');
    histOpt.value = 'history';
    histOpt.textContent = 'Conhecer a região';
    ts.insertBefore(histOpt, ts.options[1] || null);
    var purposeEl = document.getElementById('search-purpose');
    var priceEl = document.getElementById('search-price');
    var btn = ts.closest('form').querySelector('button[type="submit"]');
    var origBtnText = btn ? btn.textContent : 'Buscar';
    function toggleHistoryMode(isHistory) {
      purposeEl.style.display = isHistory ? 'none' : '';
      priceEl.style.display = isHistory ? 'none' : '';
      if (btn) btn.textContent = isHistory ? 'Conhecer' : origBtnText;
    }
    function handleTypeChange() {
      var isHistory = ts.value === 'history';
      toggleHistoryMode(isHistory);
      if (!isHistory) {
        var locSec = document.getElementById('location-info');
        if (locSec && locSec.style.display !== 'none') {
          locSec.style.display = 'none';
          resetMetaTags();
          document.getElementById('search-purpose').value = '';
          document.getElementById('search-price').value = '';
        }
      }
    }
    ts.addEventListener('change', handleTypeChange);
    window._toggleHistoryMode = toggleHistoryMode;
  })();
  populateSelect('search-location', locations);
  populateSelect('comprar-type', categories);
  populateSelect('comprar-location', locations);
  populateSelect('alugar-type', categories);
  populateSelect('alugar-location', locations);
  populateSelect('lanc-location', locations);
  // Populate purpose dropdown from enabled sections
  var purposeSel = document.getElementById('search-purpose');
  var purposeMap = { comprar: { value: 'sale', label: 'Venda' }, alugar: { value: 'rent', label: 'Aluguel' } };
  var enabledPurposes = ['comprar', 'alugar'].filter(function(s) { return !DISABLED_SECTIONS || DISABLED_SECTIONS.indexOf(s) === -1; });
  for (var pp = 0; pp < enabledPurposes.length; pp++) {
    var info = purposeMap[enabledPurposes[pp]];
    var opt = document.createElement('option');
    opt.value = info.value;
    opt.textContent = info.label;
    purposeSel.appendChild(opt);
  }
  // Hero slideshow
  var heroMedia = document.getElementById('heroMedia');
  var heroNav = document.getElementById('heroNav');
  if (heroMedia && HERO_IMAGES && HERO_IMAGES.length) {
    heroMedia.innerHTML = '';
    if (HERO_VIDEO) {
      var vw = document.createElement('div');
      vw.className = 'hero-video-wrap';
      if (HERO_VIDEO.indexOf('youtube.com') !== -1 || HERO_VIDEO.indexOf('youtu.be') !== -1) {
        var ytId = HERO_VIDEO.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
        if (ytId) {
          vw.style.background = 'url(https://img.youtube.com/vi/' + ytId[1] + '/maxresdefault.jpg) center/cover no-repeat';
          var ytSrc = 'https://www.youtube-nocookie.com/embed/' + ytId[1] + '?autoplay=1&mute=1&loop=1&playlist=' + ytId[1] + '&controls=0&showinfo=0&modestbranding=1&rel=0';
          vw.innerHTML = '<iframe src="' + ytSrc + '" frameborder="0" allow="autoplay; encrypted-media; picture-in-picture" referrerpolicy="no-referrer-when-downgrade" style="width:100%;height:100%;pointer-events:none;" loading="lazy"></iframe>';
        }
      } else {
        vw.innerHTML = '<video autoplay muted loop playsinline><source src="' + HERO_VIDEO + '" type="video/mp4" /></video>';
      }
      heroMedia.appendChild(vw);
    }
    if (!HERO_VIDEO) {
    for (var si = 0; si < HERO_IMAGES.length; si++) {
      var img = document.createElement('img');
      img.className = 'hero-slide' + (si === 0 ? ' active' : '');
      img.src = HERO_IMAGES[si];
      img.alt = '';
      img.loading = si === 0 ? 'eager' : 'lazy';
      heroMedia.appendChild(img);
      var dot = document.createElement('button');
      dot.className = 'hero-dot' + (si === 0 ? ' active' : '');
      dot.setAttribute('data-slide', si);
      dot.setAttribute('aria-label', 'Slide ' + (si + 1));
      heroNav.appendChild(dot);
    }
    }
  }
  // Contact form — try our PHP endpoint first, fallback to formsubmit.co
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'Enviando...';
      btn.disabled = true;
      function showSuccess() {
        document.getElementById('formFields').style.display = 'none';
        document.getElementById('formSuccess').style.display = 'block';
      }
      fetch('send-contact.php', { method: 'POST', body: new FormData(form) })
        .then(function(r) { return r.json(); })
        .then(function(res) {
          if (res.ok) { showSuccess(); }
          else { throw new Error(res.error || 'Erro'); }
        })
        .catch(function() {
          // Fallback to formsubmit.co
          form.action = 'https://formsubmit.co/' + SITE_EMAIL;
          return fetch(form.action, { method: 'POST', body: new FormData(form) });
        })
        .then(function() { showSuccess(); })
        .catch(function() {
          // Last resort: native submit (opens formsubmit thank-you page)
          form.submit();
        })
        .finally(function() {
          btn.textContent = originalText;
          btn.disabled = false;
        });
    });
  }
  // Social media in nav + footer
  var socialSvgs = {
    instagram: '<svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>'
  };
  function renderSocial(containerId) {
    var c = document.getElementById(containerId);
    if (!c || !SOCIAL) return;
    var h = '';
    var order = ['instagram', 'facebook', 'youtube', 'linkedin'];
    for (var si2 = 0; si2 < order.length; si2++) {
      var k = order[si2];
      if (SOCIAL[k]) {
        h += '<a href="' + SOCIAL[k] + '" target="_blank" aria-label="' + k + '">' + socialSvgs[k] + '</a>';
      }
    }
    if (h) c.innerHTML = h;
  }
  // Auto-calc financiamento on input change
  var finInputs = document.querySelectorAll('#finSimulator input, #finSimulator select');
  for (var fi = 0; fi < finInputs.length; fi++) {
    finInputs[fi].addEventListener('input', calcFinancing);
  }
  renderSocial('navSocial');
  renderSocial('mobileSocial');
  renderSocial('footerSocial');
  // Hero slideshow — auto rotation + dot clicks
  if (!HERO_VIDEO && HERO_IMAGES && HERO_IMAGES.length > 1) {
    var heroCurrent = 0;
    var heroTimer = setInterval(heroNext, 5000);
    function heroGoTo(idx) {
      var slides = document.querySelectorAll('.hero-slide');
      var dots = document.querySelectorAll('.hero-dot');
      for (var h = 0; h < slides.length; h++) {
        slides[h].classList.toggle('active', h === idx);
        if (dots[h]) dots[h].classList.toggle('active', h === idx);
      }
      heroCurrent = idx;
    }
    function heroNext() { heroGoTo((heroCurrent + 1) % HERO_IMAGES.length); }
    document.getElementById('heroNav').addEventListener('click', function(e) {
      var dot = e.target.closest('.hero-dot');
      if (!dot) return;
      clearInterval(heroTimer);
      heroGoTo(parseInt(dot.getAttribute('data-slide'), 10));
      heroTimer = setInterval(heroNext, 5000);
    });
  }
  });
</script>
<div id="google_translate_element" style="display:none"></div>
<script>
function googleTranslateElementInit() {
  if (typeof google !== 'undefined' && google.translate) {
    new google.translate.TranslateElement({
      pageLanguage: 'pt',
      includedLanguages: 'pt,en,es',
      autoDisplay: false
    }, 'google_translate_element');
    // Connect custom buttons to hidden Google Translate select
    var checkCombo = setInterval(function() {
      var combo = document.getElementById('google_translate_element').querySelector('.goog-te-combo');
      if (combo) {
        clearInterval(checkCombo);
        document.querySelectorAll('.lang-btn').forEach(function(btn) {
          btn.addEventListener('click', function() {
            combo.value = this.dataset.lang;
            combo.dispatchEvent(new Event('change'));
            document.querySelectorAll('.lang-btn').forEach(function(b) { b.classList.remove('active'); });
            this.classList.add('active');
          });
        });
      }
    }, 100);
  }
}
</script>
<script src="js/app.min.js?v=9"></script>
<script src="https://cdn.plyr.io/3.7.8/plyr.js"></script>
<script>document.addEventListener('DOMContentLoaded',function(){var v=document.querySelector('.about-video');if(v)Plyr.setup(v);});</script>
<script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" async></script>
