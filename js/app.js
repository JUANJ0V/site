/* ===== CARD LABELS (Portuguese) ===== */
var _cardLabels = {
  sale: "Venda",
  rent: "Aluguel",
  launch: "Lan\u00E7amento",
  beds: "quarto",
  baths: "banheiro",
  garage: "vaga",
  features: "Caracter\u00EDsticas",
  description: "Descri\u00E7\u00E3o",
  galleryAria: "Galeria de imagens",
  galleryClose: "Fechar galeria",
  galleryPrev: "Anterior",
  galleryNext: "Pr\u00F3ximo",
  galleryDetails: "Detalhes",
  zone: "Zona",
  whatsapp: "Tenho interesse neste im\u00F3vel",
  readMore: "Ler mais",
  by: "por",
  backToBlog: "\u2190 Voltar ao blog",
  viewAll: "Ver todos",
  viewDetails: "Ver detalhes",
  noneAvailable: "Nenhum dispon\u00EDvel",
  finError: "Preencha todos os campos.",
  finObs: "* Valores aproximados. Procure um banco para simula\u00E7\u00E3o oficial.",
  linkCopied: "Link copiado!",
  sale2: "Venda",
  rent2: "Aluguel",
  copyright: "Todos os direitos reservados."
};
function _cardT() { return _cardLabels; }
function _transData() { return []; }
function _propT() { return null; }
function _empT() { return null; }
function _t(section) {
  if (section === 'sections') return {
    clear: 'Limpar',
    noResultsSale: 'Nenhum im\u00F3vel \u00E0 venda encontrado',
    noResultsRent: 'Nenhum im\u00F3vel para alugar encontrado',
    noResultsLanc: 'Nenhum lan\u00E7amento encontrado nesta regi\u00E3o'
  };
  return {};
}

/* ===== BASE PATH DETECTION ===== */
// Handles subdirectory deployments (e.g. GitHub Pages /site/)
var BASE_PATH = (function() {
  var p = window.location.pathname.replace(/\/index\.html$/, '').replace(/\/+$/, '');
  return p === '' ? '' : p + '/';
})();

// Handle initial redirect from 404.html (GitHub Pages SPA fallback)
(function() {
  var redirectPath = sessionStorage.getItem('redirect');
  if (redirectPath) {
    sessionStorage.removeItem('redirect');
    if (BASE_PATH && redirectPath.indexOf(BASE_PATH) === 0) {
      var afterBase = redirectPath.substring(BASE_PATH.length).replace(/^\/+|\/+$/g, '');
      if (afterBase && afterBase !== 'index.html') {
        var clean = BASE_PATH.replace(/\/$/, '') + '/' + afterBase + '/';
        history.replaceState(null, '', clean);
        window._redirectId = afterBase;
      }
    } else {
      var rid = redirectPath.replace(/^\/+|\/+$/g, '');
      if (rid && rid !== 'index.html') {
        history.replaceState(null, '', redirectPath);
        window._redirectId = rid;
      }
    }
  }
})();

/* ===== SPA ROUTER HELPERS ===== */
function getSectionId() {
  if (window.location.protocol === 'file:') return 'inicio';
  var p = window.location.pathname.replace(/\/+$/, '') || '/';
  // Strip BASE_PATH prefix (normalize: compare with or without trailing slash)
  var bp = BASE_PATH.replace(/\/+$/, '');
  if (bp && p.indexOf(bp) === 0) {
    p = p.substring(bp.length) || '/';
  }
  if (p === '' || p === '/' || p === '/index.html') return 'inicio';
  return p.replace(/^\//, '');
}
function goTo(id) {
  if (!id || id === 'topo') id = 'inicio';
  var url = id === 'inicio' ? BASE_PATH : BASE_PATH + id + '/';
  if (window.location.pathname !== url) {
    try { history.pushState(null, '', url); } catch(e) {}
  }
  if (window._spaNavigate) window._spaNavigate(id);
}

/* ===== SHARED CARD HTML ===== */
function buildPropertyCardHTML(p, badgeClass, badgeText) {
  var ct = _cardT();
  var propT = _propT(p.id);
  var desc = (propT && propT.desc) || p.desc;
  var title = (propT && propT.title) || p.title;
  let propsHtml = "";
  if (p.category === "Terreno") {
    propsHtml = '<span>\uD83D\uDCD0 ' + p.area + ' m\u00B2</span>'
      + '<span>\uD83D\uDCCD ' + ct.zone + ' ' + (p.zone || 'Urbana') + '</span>'
      + '<span>\uD83E\uDDF1 ' + ct.topography + ' ' + (p.topography || 'Plana') + '</span>';
  } else if (p.category === "Comercial") {
    propsHtml = '<span>\uD83D\uDDA5\uFE0F ' + ct.sala + '</span><span>\uD83D\uDEC1 ' + p.baths + (p.baths === 1 ? ' ' + ct.bathroom : ' ' + ct.bathrooms) + '</span><span>\uD83D\uDCD0 ' + p.area + ' m\u00B2</span>';
  } else {
    propsHtml = '';
    if (p.beds) propsHtml += '<span>\uD83D\uDECF\uFE0F ' + p.beds + (p.beds === 1 ? ' ' + ct.bedroom : ' ' + ct.bedrooms) + '</span>';
    if (p.baths) propsHtml += '<span>\uD83D\uDEC1 ' + p.baths + (p.baths === 1 ? ' ' + ct.bathroom : ' ' + ct.bathrooms) + '</span>';
    if (p.garage) propsHtml += '<span>\uD83D\uDE97 ' + p.garage + (p.garage === 1 ? ' ' + ct.parking : ' ' + ct.parkings) + '</span>';
    propsHtml += '<span>\uD83D\uDCD0 ' + p.area + ' m\u00B2</span>';
  }

  var tagsHtml = '';
  tagsHtml += '<span class="card-tag tag-' + p.category.toLowerCase().replace(/[\/\s]+/g, '') + '">' + p.category + '</span>';
  if (p.video) tagsHtml += '<span class="card-tag tag-tour">\u25B6 ' + ct.virtualTour + '</span>';

  var locationHtml = '<span class="card-location">\uD83D\uDCCD ' + p.location + '</span>';

  var priceDisplay = p.price;
  if (p.type === 'rent' && p.price.indexOf('/m\u00EAs') === -1) priceDisplay += ' ' + ct.perMonth;
  var propUrl = window.location.origin + BASE_PATH + p.id + '/';
  var rawMsg = WHATSAPP_MSG.replace('{titulo}', title).replace('{preco}', priceDisplay) + '\n\n' + propUrl;
  var whatsappUrl = WHATSAPP_URL + '?text=' + encodeURIComponent(rawMsg);

  var statusHtml = '';
  if (p.status && p.status !== 'disponivel') {
    var statusClass = p.status === 'vendido' ? 'status-vendido' : 'status-locado';
    var statusTxt = p.status === 'vendido' ? ct.sold : ct.rented;
    statusHtml = '<span class="status-badge ' + statusClass + '">' + statusTxt + '</span>';
  }

  return '<div class="card-wrap reveal">'
    + '<a href="/' + p.id + '/" class="card">'
    + '<div class="card-img"><img src="' + p.img + '" alt="' + title.replace(/"/g, '&quot;') + '" loading="lazy" />'
    + '<button class="fav-btn" data-id="' + p.id + '" aria-label="' + ct.favorite + '" onclick="event.preventDefault();event.stopPropagation();toggleFav(\'' + p.id + '\');">' + (isFav(p.id) ? '\u2764' : '\u2661') + '</button>'
    + statusHtml
    + '</div>'
    + '<div class="card-body">'
    + '<div class="card-head">'
    + '<span class="badge ' + badgeClass + '">' + badgeText + '</span>'
    + '<span class="card-tags">' + tagsHtml + '</span>'
    + '</div>'
    + '<h3>' + title + '</h3>'
    + locationHtml
    + '<p class="price">' + priceDisplay + '</p>'
    + '<p class="card-desc">' + desc + '</p>'
    + '<div class="props">' + propsHtml + '</div>'
    + '<span class="card-link">' + ct.viewDetails + ' \u2192</span>'
    + '</div></a>'
    + '<a href="' + whatsappUrl + '" target="_blank" class="card-whatsapp" aria-label="Quero saber mais no WhatsApp">'
    + '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>'
    + '<span>' + ct.wantToKnow + '</span>'
    + '</a>'
    + '</div>';
}

/* ===== SHARED LANC CARD HTML ===== */
function buildLancCardHTML(e) {
  var ct = _cardT();
  var eT = _empT(e.id);
  var lancDesc = (eT && eT.description) ? eT.description.split('\n\n')[0] : e.description.split('\n\n')[0];
  var lancTitle = (eT && eT.title) || e.title;
  return '<a href="/' + e.id + '/" class="lanc-card">'
    + '<div class="card-img">'
    + '<img src="' + e.img + '" alt="' + lancTitle.replace(/"/g, '&quot;') + '" loading="lazy" />'
    + '<span class="badge badge-lanc lanc-badge">' + ct.launch + '</span>'
    + '<span class="lanc-tag">' + e.price + '</span>'
    + '</div>'
    + '<div class="card-body">'
    + '<h3>' + lancTitle + '</h3>'
    + '<p>' + lancDesc + '</p>'
    + '<div class="lanc-progress">'
    + '<div class="lanc-progress-bar"><div class="lanc-progress-fill" style="width:' + e.progress + '%"></div></div>'
    + '<div class="lanc-progress-label"><span>' + e.progressLabel + '</span><span>' + e.delivery + '</span></div>'
    + '</div>'
    + '<span class="card-link">' + ct.learnMore + ' \u2192</span>'
    + '</div></a>';
}

/* ===== RENDER FUNCTIONS ===== */
let _origCompraHTML = '';
let _origAlugaHTML = '';
let _origLancHTML = '';
var _pageState = {};
var _searchActive = false;

function renderPropertyCards(containerSelector, type) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  const filtered = PROPERTIES.filter(function(p) { return p.type === type; });
  _pageState[containerSelector] = { all: filtered, page: 1, perPage: PAGE_SIZE };
  renderPropertyPage(containerSelector, type);
}

function renderPropertyPage(containerSelector, type) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  var state = _pageState[containerSelector];
  if (!state) return;
  var filtered = state.all;
  var total = filtered.length;
  var end = Math.min(state.page * state.perPage, total);
  var html = "";
  var ct = _cardT();
  for (var i = 0; i < end; i++) {
    var badgeText = filtered[i].type === "sale" ? ct.sale : ct.rent;
    html += buildPropertyCardHTML(filtered[i], type === "sale" ? "badge-sale" : "badge-rent", badgeText);
  }
  if (end < total) {
    html += '<div style="grid-column:1/-1;text-align:center;padding:2rem 0 0;">'
      + '<button class="btn-gold-outline load-more" data-container="' + containerSelector + '" data-type="' + type + '" style="font-size:0.75rem;padding:0.75rem 2rem;cursor:pointer;">' + ct.loadMore + ' (' + (total - end) + ' ' + ct.remaining + ')</button></div>';
  }
  container.innerHTML = html;
  if (typeof window._revealObserver !== 'undefined') {
    container.querySelectorAll('.reveal').forEach(function(el) { window._revealObserver.observe(el); });
  }
  if (containerSelector === '#comprar .grid-3') {
    _origCompraHTML = html;
  } else if (containerSelector === '#alugar .grid-2') {
    _origAlugaHTML = html;
  }
}

function renderDetailCard(propId) {
  const existing = document.getElementById(propId);
  if (existing) return;
  document.querySelectorAll('.detail-card').forEach(function(el) { el.remove(); });
  let p = null;
  for (let i = 0; i < PROPERTIES.length; i++) {
    if (PROPERTIES[i].id === propId) { p = PROPERTIES[i]; break; }
  }
  if (!p) return;
  updateMetaTags(p);
  const backSection = p.type === "sale" ? "comprar" : "alugar";
  var ct = _cardT();
  var pT = _propT(propId);
  var detailFeatures = (pT && pT.features) || p.features;
  var detailDescription = (pT && pT.description) || p.description;
  var detailTitle = (pT && pT.title) || p.title;

  let propsLgHtml = '';
  if (p.category === "Terreno") {
    var frontText = p.front ? p.front + ' m' : '\u2014';
    var backText = p.back ? p.back + ' m' : '\u2014';
    propsLgHtml = '<span><span class="num">' + p.area + '</span><span class="lbl">' + ct.sqm + '</span></span>'
      + '<span><span class="num">' + frontText + '</span><span class="lbl">' + ct.front + '</span></span>'
      + '<span><span class="num">' + backText + '</span><span class="lbl">' + ct.backs + '</span></span>'
      + '<span><span class="num">' + (p.zone || 'Urbana') + '</span><span class="lbl">' + ct.zone + '</span></span>';
  } else {
    propsLgHtml = '';
    if (p.beds && p.category !== "Comercial") {
      propsLgHtml += '<span><span class="num">' + p.beds + '</span><span class="lbl">' + (p.beds === 1 ? ct.bedroom.charAt(0).toUpperCase() + ct.bedroom.slice(1) : ct.bedrooms.charAt(0).toUpperCase() + ct.bedrooms.slice(1)) + '</span></span>';
    }
    if (p.baths) {
      propsLgHtml += '<span><span class="num">' + p.baths + '</span><span class="lbl">' + (p.baths === 1 ? ct.bathroom.charAt(0).toUpperCase() + ct.bathroom.slice(1) : ct.bathrooms.charAt(0).toUpperCase() + ct.bathrooms.slice(1)) + '</span></span>';
    }
    if (p.garage !== undefined) {
      propsLgHtml += '<span><span class="num">' + p.garage + '</span><span class="lbl">' + (p.garage <= 1 ? ct.parking.charAt(0).toUpperCase() + ct.parking.slice(1) : ct.parkings.charAt(0).toUpperCase() + ct.parkings.slice(1)) + '</span></span>';
    }
    propsLgHtml += '<span><span class="num">' + p.area + '</span><span class="lbl">' + ct.sqm + '</span></span>';
  }

  const locClean = p.location;
  // If we have a full location with state, use it from the eyebrow pattern
  const eyebrowMap = {
    "Balneário Camboriú": "Balneário Camboriú — SC",
    "Florianópolis": "Florianópolis — SC",
    "Itapema": "Itapema — SC",
    "Bombinhas": "Bombinhas — SC",
    "Joinville": "Joinville — SC"
  };
  const eyebrow = eyebrowMap[locClean] || locClean;

  let thumbHtml = '';
  for (let g = 1; g < p.gallery.length; g++) {
    thumbHtml += '<img src="' + p.gallery[g].replace('w=1200', 'w=800') + '" alt="Galeria" class="gallery-trigger" data-idx="' + g + '" loading="lazy" />';
  }

  let featuresHtml = '';
  for (let f = 0; f < detailFeatures.length; f++) {
    featuresHtml += '<li>' + detailFeatures[f] + '</li>';
  }

  const paragraphs = detailDescription.split('\n\n');
  let descHtml = '';
  for (let d = 0; d < paragraphs.length; d++) {
    descHtml += '<p>' + paragraphs[d] + '</p>';
  }

  var statusDetailHtml = '';
  if (p.status && p.status !== 'disponivel') {
    var stCls = p.status === 'vendido' ? 'status-vendido' : 'status-locado';
    var stTxt = p.status === 'vendido' ? ct.sold : ct.rented;
    statusDetailHtml = '<span class="status-badge status-badge-lg ' + stCls + '">' + stTxt + '</span>';
  }

  var detailPriceDisplay = p.price;
  if (p.type === 'rent' && p.price.indexOf('/m\u00EAs') === -1) detailPriceDisplay += ' ' + ct.perMonth;
  var detailPropUrl = window.location.origin + BASE_PATH + p.id + '/';
  var detailRawMsg = WHATSAPP_MSG.replace('{titulo}', p.title).replace('{preco}', detailPriceDisplay) + '\n\n' + detailPropUrl;
  var detailWhatsUrl = WHATSAPP_URL + '?text=' + encodeURIComponent(detailRawMsg);

  const detailEl = document.createElement('div');
  detailEl.className = 'detail-card';
  detailEl.id = p.id;
  detailEl.innerHTML = '<div class="detail-inner">'
    + '<div class="detail-header">'
    + '<div>'
    + '<p class="eyebrow">' + eyebrow + '</p>'
    + '<h1>' + detailTitle + '</h1>'
    + '<p class="price">' + (p.type === 'rent' && p.price.indexOf('/m\u00EAs') === -1 ? p.price + ' ' + ct.perMonth : p.price) + statusDetailHtml + '</p>'
    + '<div class="props-lg">' + propsLgHtml + '</div>'
    + '</div>'
    + '<div>'
    + '<div class="detail-gallery">'
    + '<div class="detail-gallery-main">'
    + '<img src="' + p.gallery[0] + '" alt="' + p.title.replace(/"/g, '&quot;') + '" class="gallery-trigger" data-idx="0" loading="lazy" />'
    + '</div>'
    + '<div class="detail-gallery-thumbs">' + thumbHtml + '</div>'
    + '</div>'
    + '</div>'
    + '</div>'
    + '<div class="detail-video"><iframe src="' + p.video + '" title="Tour ' + p.title.replace(/"/g, '&quot;') + '" allowfullscreen loading="lazy"></iframe></div>'
    + '<div class="detail-description">'
    + '<div><h2>' + ct.aboutProperty + '</h2>' + descHtml + '</div>'
    + '<div class="detail-features"><h3>' + ct.features + '</h3><ul>' + featuresHtml + '</ul></div>'
    + '</div>'
    + '<div class="detail-actions">'
    + '<a href="' + detailWhatsUrl + '" class="btn-primary" target="_blank">' + ct.scheduleVisit + '</a>'
    + (p.maps ? '<a href="' + p.maps + '" class="btn-gold-outline" target="_blank">' + ct.viewOnMap + '</a>' : '')
    + '<button class="btn-gold-outline btn-share" onclick="shareProperty(\'' + p.id + '\')">' + ct.share + '</button>'
    + '<a href="/' + backSection + '/" class="btn-gold-outline">' + ct.otherProperties + '</a>'
    + '</div>'
    + '</div>';

  document.body.appendChild(detailEl);
}

function renderEmpreendimentoCards() {
  const container = document.querySelector('#lancamentos .grid-3');
  if (!container) return;
  let html = "";
  for (let i = 0; i < EMPREENDIMENTOS.length; i++) {
    html += buildLancCardHTML(EMPREENDIMENTOS[i]);
  }
  container.innerHTML = html;
  _origLancHTML = html;
}

function renderEmpreendimentoDetail(empId) {
  const existing = document.getElementById(empId);
  if (existing) return;
  let emp = null;
  for (let i = 0; i < EMPREENDIMENTOS.length; i++) {
    if (EMPREENDIMENTOS[i].id === empId) { emp = EMPREENDIMENTOS[i]; break; }
  }
  if (!emp) return;
  updateMetaTags(emp);
  var ct = _cardT();
  var eT = _empT(empId);
  var empTags = (eT && eT.tags) || emp.tags;
  var empAmenities = (eT && eT.amenities) || emp.amenities;
  var empTimeline = (eT && eT.timeline) || emp.timeline;
  var empPayment = (eT && eT.payment) || emp.payment;
  var empDesc = (eT && eT.description) || emp.description;

  let tagsHtml = '';
  const tagClasses = ['emp-tag-red', 'emp-tag-gold', 'emp-tag-deep'];
  for (let t = 0; t < empTags.length; t++) {
    tagsHtml += '<span class="emp-tag ' + tagClasses[t % 3] + '">' + empTags[t] + '</span>';
  }

  let thumbHtml = '';
  for (let g = 1; g < emp.gallery.length; g++) {
    thumbHtml += '<img src="' + emp.gallery[g] + '" alt="Galeria" class="gallery-trigger" data-idx="' + g + '" loading="lazy" />';
  }

  let plantsHtml = '';
  for (let pl = 0; pl < emp.plants.length; pl++) {
    plantsHtml += '<a href="' + emp.plants[pl] + '" target="_blank"><img src="' + emp.plants[pl] + '" alt="Planta" loading="lazy" /></a>';
  }

  let timelineHtml = '';
  for (let tl = 0; tl < empTimeline.length; tl++) {
    const item = empTimeline[tl];
    timelineHtml += '<div class="tl-item">'
      + '<p class="tl-date">' + item.date + '</p>'
      + '<p class="tl-title">' + item.title + '</p>'
      + '<p class="tl-desc">' + item.desc + '</p>'
      + '</div>';
  }

  let amenitiesHtml = '';
  for (let a = 0; a < empAmenities.length; a++) {
    amenitiesHtml += '<li>' + empAmenities[a] + '</li>';
  }

  let priceRowsHtml = '';
  for (let pr = 0; pr < emp.prices.length; pr++) {
    const row = emp.prices[pr];
    const cls = row.highlight ? ' class="highlight"' : '';
    priceRowsHtml += '<tr' + cls + '><td>' + row.unit + '</td><td>' + row.area + '</td><td>' + row.value + '</td></tr>';
  }

  let paymentHtml = '';
  for (let pp = 0; pp < empPayment.length; pp++) {
    paymentHtml += '<div><p class="pp-label">' + empPayment[pp].label + '</p><p class="pp-value">' + empPayment[pp].value + '</p></div>';
  }

  const paragraphs = empDesc.split('\n\n');
  let descHtml = '';
  for (let d = 1; d < paragraphs.length; d++) {
    descHtml += '<p>' + paragraphs[d] + '</p>';
  }

  const empEl = document.createElement('div');
  empEl.className = 'empreendimento';
  empEl.id = emp.id;
  empEl.innerHTML = '<div class="container">'
    + '<div class="emp-header">'
    + '<div>'
    + '<p class="eyebrow">' + emp.location + '</p>'
    + '<h2>' + emp.title + '</h2>'
    + '<p>' + paragraphs[0] + '</p>'
    + '<p class="price-lg">' + emp.price + '</p>'
    + '<div class="emp-tags" style="margin-top:1rem;">' + tagsHtml + '</div>'
    + '</div>'
    + '<div>'
    + '<div class="media-grid">'
    + '<div class="media-grid-main"><img src="' + emp.gallery[0] + '" alt="' + emp.title.replace(/"/g, '&quot;') + '" class="gallery-trigger" data-idx="0" loading="lazy" /></div>'
    + '<div class="media-grid-thumbs">' + thumbHtml + '</div>'
    + '</div>'
    + '</div>'
    + '</div>'
    + '<div class="video-wrapper"><iframe src="' + emp.video + '" title="' + emp.title.replace(/"/g, '&quot;') + '" allowfullscreen loading="lazy"></iframe></div>'
    + '<div class="emp-info">'
    + '<div>'
    + '<h3>' + ct.aboutDevelopment + '</h3>'
    + descHtml
    + '<h3 style="margin-top:1.5rem;">' + ct.floorPlans + '</h3>'
    + '<div class="media-grid-thumbs" style="margin-bottom:1.5rem;">' + plantsHtml + '</div>'
    + '<h3>' + ct.constructionTimeline + '</h3>'
    + '<div class="timeline">' + timelineHtml + '</div>'
    + '</div>'
    + '<div>'
    + '<h3>' + ct.amenities + '</h3>'
    + '<ul class="amenities">' + amenitiesHtml + '</ul>'
    + '<h3>' + ct.priceTable + '</h3>'
    + '<table class="price-table"><thead><tr><th>' + ct.unit + '</th><th>' + ct.area + '</th><th>' + ct.value + '</th></tr></thead><tbody>' + priceRowsHtml + '</tbody></table>'
    + '<h3>' + ct.paymentTerms + '</h3>'
    + '<div class="payment-plan">' + paymentHtml + '</div>'
    + '<a href="/contato/" class="btn-primary" style="margin-top:1rem;">' + ct.wantToKnow + '</a>'
    + '</div>'
    + '</div>'
    + '</div>';

  document.body.appendChild(empEl);
}

function renderFAQs() {
  const container = document.querySelector('.faq-section');
  if (!container) return;
  let html = "";
  var items = _transData('faq');
  if (!items || !items.length) items = FAQS;
  for (let i = 0; i < items.length; i++) {
    html += '<details class="faq-item">'
      + '<summary>' + items[i].q + '</summary>'
      + '<div class="faq-answer">' + items[i].a + '</div>'
      + '</details>';
  }
  container.innerHTML = html;
}

/* ===== FAVORITOS ===== */
function getFavs() {
  try { return JSON.parse(localStorage.getItem('favorites') || '[]'); } catch(e) { return []; }
}
function saveFavs(arr) {
  localStorage.setItem('favorites', JSON.stringify(arr));
}
function isFav(id) {
  return getFavs().indexOf(id) !== -1;
}
function toggleFav(id) {
  var favs = getFavs();
  var idx = favs.indexOf(id);
  if (idx === -1) { favs.push(id); } else { favs.splice(idx, 1); }
  saveFavs(favs);
  document.querySelectorAll('.fav-btn[data-id="' + id + '"]').forEach(function(b) {
    b.textContent = idx === -1 ? '\u2764' : '\u2661';
  });
  var favSec = document.getElementById('favoritos');
  if (favSec && favSec.classList.contains('active')) renderFavorites();
}
function renderFavorites() {
  var container = document.getElementById('fav-cards');
  if (!container) return;
  var favs = getFavs();
  var html = '';
  var emptyMsg = 'Nenhum im\u00F3vel favoritado ainda.';
  for (var fi = 0; fi < favs.length; fi++) {
    var p = null;
    for (var pj = 0; pj < PROPERTIES.length; pj++) {
      if (PROPERTIES[pj].id === favs[fi]) { p = PROPERTIES[pj]; break; }
    }
    if (!p) continue;
    var ct = _cardT();
    var badgeCls = p.type === 'sale' ? 'badge-sale' : 'badge-rent';
    var badgeTxt = p.type === 'sale' ? ct.sale : ct.rent;
    html += buildPropertyCardHTML(p, badgeCls, badgeTxt);
  }
  if (!html) html = '<p class="fav-empty" style="grid-column:1/-1;text-align:center;color:var(--text);padding:3rem 0;">' + emptyMsg + '</p>';
  container.innerHTML = html;
  if (typeof window._revealObserver !== 'undefined') {
    container.querySelectorAll('.reveal').forEach(function(el) { window._revealObserver.observe(el); });
  }
}

/* ===== BLOG ===== */
function renderBlogCards() {
  var container = document.getElementById('blog-cards');
  if (!container) return;
  var html = '';
  for (var bi = 0; bi < BLOG_POSTS.length; bi++) {
    var post = BLOG_POSTS[bi];
    var blogTitle = post.title;
    var blogExcerpt = post.excerpt;
    html += '<a href="/' + post.id + '/" class="blog-card">'
      + '<div class="blog-img"><img src="' + post.image + '" alt="' + blogTitle.replace(/"/g, '&quot;') + '" loading="lazy" /></div>'
      + '<div class="blog-body">'
      + '<div class="blog-meta"><span class="blog-date">' + post.date + '</span><span class="blog-category">' + post.category + '</span></div>'
      + '<h3>' + blogTitle + '</h3>'
      + '<p>' + blogExcerpt + '</p>'
      + '<span class="card-link">' + _cardT().readMore + ' &rarr;</span>'
      + '</div></a>';
  }
  container.innerHTML = html;
  if (typeof window._revealObserver !== 'undefined') {
    container.querySelectorAll('.reveal').forEach(function(el) { window._revealObserver.observe(el); });
  }
}
function renderBlogPost(postId) {
  var existing = document.getElementById(postId);
  if (existing) return;
  document.querySelectorAll('.blog-detail').forEach(function(el) { el.remove(); });
  var post = null;
  for (var bi = 0; bi < BLOG_POSTS.length; bi++) {
    if (BLOG_POSTS[bi].id === postId) { post = BLOG_POSTS[bi]; break; }
  }
  if (!post) return;
  // Update meta tags for blog post
  var blogContent = post.content;
  var blogTitle = post.title;
  var ttl = document.querySelector('title');
  if (ttl) ttl.textContent = blogTitle + ' \u2014 ' + SITE_NAME;
  var ogU = document.querySelector('meta[property="og:url"]');
  if (ogU) ogU.content = window.location.origin + BASE_PATH + postId + '/';
  function renderContent(text) {
    return text.split('\n\n').map(function(b) {
      if (/^###\s/.test(b)) return '<h3>' + b.replace(/^###\s+/, '') + '</h3>';
      if (/^##\s/.test(b)) return '<h2>' + b.replace(/^##\s+/, '') + '</h2>';
      return '<p>' + b + '</p>';
    }).join('');
  }
  var descHtml = renderContent(blogContent);
  var el = document.createElement('div');
  el.className = 'blog-detail';
  el.id = postId;
  el.innerHTML = '<div class="blog-detail-inner">'
    + '<div class="blog-detail-header">'
    + '<p class="blog-detail-meta"><span>' + post.date + '</span> <span>' + post.category + '</span></p>'
    + '<h1>' + blogTitle + '</h1>'
    + '<p class="blog-detail-author">' + _cardT().by + ' ' + (post.author || 'Su Imobili\u00E1ria') + '</p>'
    + '</div>'
    + '<div class="blog-detail-img"><img src="' + post.image + '" alt="' + blogTitle.replace(/"/g, '&quot;') + '" /></div>'
    + '<div class="blog-detail-content">' + descHtml + '</div>'
    + '<div class="blog-detail-back"><a href="/blog/" class="btn-gold-outline">&larr; ' + _cardT().backToBlog + '</a></div>'
    + '</div>';
  document.body.appendChild(el);
}

function renderDepoimentos() {
  const container = document.querySelector('#depoimentos .grid-3');
  if (!container) return;
  let html = "";
  var items = _transData('depoimentos');
  if (!items || !items.length) items = DEPOIMENTOS;
  for (let i = 0; i < items.length; i++) {
    const d = items[i];
    html += '<div class="service-card">'
      + '<p style="font-size:1.25rem;color:var(--gold);margin-bottom:1rem;">\u2605\u2605\u2605\u2605\u2605</p>'
      + '<p style="font-style:italic;margin-bottom:1rem;">"' + d.text + '"</p>'
      + '<p style="color:var(--text);font-weight:500;">\u2014 <strong>' + d.name + '</strong></p>'
      + '<p style="font-size:0.75rem;color:var(--muted-foreground);">' + d.role + '</p>'
      + '</div>';
  }
  container.innerHTML = html;
}

function renderParceiros() {
  const container = document.querySelector('#parceiros > .container > div:last-child');
  if (!container) return;
  let html = "";
  var names = _transData('parceiros');
  for (let i = 0; i < PARCEIROS.length; i++) {
    const p = PARCEIROS[i];
    var pName = names && names[i] ? names[i] : p.name;
    if (p.img) {
      html += '<a href="' + p.url + '" style="opacity:0.6;transition:opacity 0.2s;filter:grayscale(1);" onmouseover="this.style.opacity=\'1\'" onmouseout="this.style.opacity=\'0.6\'">'
        + '<img src="' + p.img + '" alt="' + pName.replace(/"/g, '&quot;') + '" style="max-height:60px;width:auto;" loading="lazy" />'
        + '</a>';
    } else {
      html += '<a href="' + p.url + '" style="display:flex;align-items:center;justify-content:center;opacity:0.6;transition:opacity 0.2s;filter:grayscale(1);padding:1rem;font-size:0.85rem;font-weight:500;color:var(--text);border:1px solid var(--border);border-radius:4px;text-decoration:none;" onmouseover="this.style.opacity=\'1\'" onmouseout="this.style.opacity=\'0.6\'">'
        + pName
        + '</a>';
    }
  }
  container.innerHTML = html;
}

/* ===== GALLERY MODAL ===== */
var _galleryData = null;
var _galleryIdx = 0;

function findGalleryItem(id) {
  for (var i = 0; i < PROPERTIES.length; i++) {
    if (PROPERTIES[i].id === id) return { type: "property", data: PROPERTIES[i] };
  }
  for (var i = 0; i < EMPREENDIMENTOS.length; i++) {
    if (EMPREENDIMENTOS[i].id === id) return { type: "empreendimento", data: EMPREENDIMENTOS[i] };
  }
  return null;
}

function openGallery(id) {
  var item = findGalleryItem(id);
  if (!item) return;
  _galleryData = item;
  _galleryIdx = 0;

  var modal = document.getElementById("galleryModal");
  if (!modal) return;
  modal.classList.add("active");
  document.body.style.overflow = "hidden";

  updateGallery();
}

function closeGallery() {
  var modal = document.getElementById("galleryModal");
  if (!modal) return;
  modal.classList.remove("active");
  document.body.style.overflow = "";
  _galleryData = null;
}

function updateGallery() {
  if (!_galleryData) return;
  var data = _galleryData.data;
  var gallery = data.gallery || [data.img];
  if (_galleryIdx < 0) _galleryIdx = gallery.length - 1;
  if (_galleryIdx >= gallery.length) _galleryIdx = 0;

  var img = document.getElementById("galleryMainImg");
  img.src = gallery[_galleryIdx];
  img.alt = data.title;

  var counter = document.getElementById("galleryCounter");
  counter.textContent = (_galleryIdx + 1) + " / " + gallery.length;

  document.getElementById("galleryTitle").textContent = data.title;
  document.getElementById("galleryPrice").textContent = data.price || "";

  var link = document.getElementById("galleryDetailsLink");
  link.href = "/" + data.id + "/";
  link.style.display = data.description ? "" : "none";

  var thumbs = document.getElementById("galleryThumbs");
  thumbs.innerHTML = "";
  for (var i = 0; i < gallery.length; i++) {
    var t = document.createElement("img");
    t.src = gallery[i].replace("w=1200", "w=200");
    t.alt = "";
    t.loading = "lazy";
    t.decoding = "async";
    if (i === _galleryIdx) t.className = "active";
    (function(idx) {
      t.addEventListener("click", function() { _galleryIdx = idx; updateGallery(); });
    })(i);
    thumbs.appendChild(t);
  }
  thumbs.scrollLeft = 0;
}

/* ===== DROPDOWN MENU ===== */
function buildDropdownMenus() {
  var hideMap = { comprar: 'mobDropComprar', alugar: 'mobDropAlugar', lancamentos: 'mobDropLanc' };
  var navDropMap = { comprar: 'navDropComprar', alugar: 'navDropAlugar', lancamentos: 'navDropLanc' };
  if (typeof DISABLED_SECTIONS !== 'undefined' && DISABLED_SECTIONS.length) {
    for (var hk in hideMap) {
      if (DISABLED_SECTIONS.indexOf(hk) !== -1) {
        var he = document.getElementById(hideMap[hk]);
        if (he) he.style.display = 'none';
        var ne = document.getElementById(navDropMap[hk]);
        if (ne) ne.style.display = 'none';
      }
    }
  }
  if (!ENABLE_DROPDOWN_MENU) { setupMobileNav(); return; }
  document.documentElement.classList.add('dd-active');

  function catLink(sectionId, cat, count) {
    var a = document.createElement('a');
    a.href = '/' + sectionId + '/';
    a.textContent = cat + ' (' + count + ')';
    a.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      goTo(sectionId);
      var iv = setInterval(function() {
        var sel = document.getElementById(sectionId + '-type');
        if (sel) {
          clearInterval(iv);
          sel.value = cat;
          var fn = sectionId === 'comprar' ? handleComprarSearch : handleAlugarSearch;
          if (typeof fn === 'function') fn();
        }
      }, 50);
    });
    return a;
  }

  function buildDD(ids, typeFilter) {
    var containers = [];
    for (var idi = 0; idi < ids.length; idi++) {
      var el = document.getElementById(ids[idi]);
      if (el) containers.push(el);
    }
    if (containers.length === 0) return;
    var items = PROPERTIES.filter(function(p) { return p.type === typeFilter; });
    var cats = {};
    for (var i = 0; i < items.length; i++) {
      var cat = items[i].category;
      if (!cats[cat]) cats[cat] = 0;
      cats[cat]++;
    }
    var sorted = Object.keys(cats).sort();
    var sectionId = typeFilter === 'sale' ? 'comprar' : 'alugar';
    // "Ver todos" link at top
    var allLink = document.createElement('a');
    allLink.href = '/' + sectionId + '/';
    allLink.textContent = _cardT().viewAll;
    allLink.style.borderBottom = '1px solid rgba(255,255,255,0.06)';
    allLink.style.marginBottom = '0.25rem';
    allLink.style.paddingBottom = '0.5rem';
    if (sorted.length === 0) {
      for (var ci = 0; ci < containers.length; ci++) {
        containers[ci].appendChild(allLink.cloneNode(true));
        var span = document.createElement('span');
        span.style.cssText = 'display:block;padding:0.4rem 1.25rem;font-size:0.65rem;color:rgba(255,255,255,0.35);';
        span.textContent = _cardT().noneAvailable;
        containers[ci].appendChild(span);
      }
      return;
    }
    for (var ci = 0; ci < sorted.length; ci++) {
      for (var ci2 = 0; ci2 < containers.length; ci2++) {
        if (ci === 0) containers[ci2].appendChild(allLink.cloneNode(true));
        containers[ci2].appendChild(catLink(sectionId, sorted[ci], cats[sorted[ci]]));
      }
    }
  }

  buildDD(['ddComprar', 'mobDdComprar'], 'sale');
  buildDD(['ddAlugar', 'mobDdAlugar'], 'rent');

  // Lançamentos dropdown
  var lancIds = ['ddLanc', 'mobDdLanc'];
  var lancContainers = [];
  for (var li = 0; li < lancIds.length; li++) {
    var el = document.getElementById(lancIds[li]);
    if (el) lancContainers.push(el);
  }
  if (lancContainers.length && EMPREENDIMENTOS && EMPREENDIMENTOS.length) {
    var allLancLink = document.createElement('a');
    allLancLink.href = '/lancamentos/';
    allLancLink.textContent = _cardT().viewAll;
    allLancLink.style.borderBottom = '1px solid rgba(255,255,255,0.06)';
    allLancLink.style.marginBottom = '0.25rem';
    allLancLink.style.paddingBottom = '0.5rem';
    for (var lj = 0; lj < lancContainers.length; lj++) {
      lancContainers[lj].appendChild(allLancLink.cloneNode(true));
    }
    for (var li = 0; li < EMPREENDIMENTOS.length; li++) {
      for (var lj = 0; lj < lancContainers.length; lj++) {
        var la = document.createElement('a');
        la.href = '/' + EMPREENDIMENTOS[li].id + '/';
        la.textContent = EMPREENDIMENTOS[li].title;
        lancContainers[lj].appendChild(la);
      }
    }
  }

  setupMobileNav(); // handles non-dropdown links

  // Mobile: toggle submenu and also close nav on sub-item click
  var mobileWrap = document.querySelectorAll('.mob-drop-wrap');
  for (var mi = 0; mi < mobileWrap.length; mi++) {
    var wrap = mobileWrap[mi];
    var link = wrap.querySelector('a');
    if (!link) continue;
    link.addEventListener('click', function(e) {
      var body = this.parentElement.querySelector('.mob-dd-body');
      if (body && body.children.length > 0) {
        e.preventDefault();
        e.stopPropagation();
        this.parentElement.classList.toggle('open');
      }
      // else: normal navigation (href works, SPA router handles it)
    });
    // Sub-items close nav
    var subLinks = wrap.querySelectorAll('.mob-dd-body a');
    for (var si = 0; si < subLinks.length; si++) {
      subLinks[si].addEventListener('click', function() {
        document.getElementById('mobileNav').classList.remove('open');
        document.body.style.overflow = '';
      });
    }
  }
} // end buildDropdownMenus

function setupMobileNav() {
  document.querySelectorAll('.nav-overlay a, .nav-overlay .close-btn').forEach(function(el) {
    if (ENABLE_DROPDOWN_MENU && el.closest('.mob-drop-wrap')) return; // handled by dropdown logic
    el.addEventListener('click', function() {
      document.getElementById('mobileNav').classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ===== INIT + SPA ROUTER ===== */
(function() {
  "use strict";

  document.documentElement.classList.add("spa");

  // Scroll reveal (set up before rendering so renderPropertyPage can observe new .reveal)
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function(entries) {
      for (var ei = 0; ei < entries.length; ei++) {
        if (entries[ei].isIntersecting) {
          entries[ei].target.classList.add('active');
          revealObserver.unobserve(entries[ei].target);
        }
      }
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(function(el) { revealObserver.observe(el); });
    window._revealObserver = revealObserver;
  }

  // Render all dynamic content from data (cards, lists only — details render on demand)
  renderPropertyCards('#comprar .grid-3', 'sale');
  renderPropertyCards('#alugar .grid-2', 'rent');
  renderEmpreendimentoCards();
  renderFAQs();
  renderDepoimentos();
  renderParceiros();
  renderBlogCards();
  buildDropdownMenus();

  // SPA router
  const EMPREENDIMENTO_IDS = {};
  for (let ei = 0; ei < EMPREENDIMENTOS.length; ei++) {
    EMPREENDIMENTO_IDS[EMPREENDIMENTOS[ei].id] = true;
  }

  const sections = document.querySelectorAll(".page-content > section[id]");
  const pageContent = document.querySelector(".page-content");

  function hideAll() {
    for (let i = 0; i < sections.length; i++) sections[i].classList.remove("active");
    document.querySelectorAll(".detail-card").forEach(function(el) { el.classList.remove("active"); });
    document.querySelectorAll(".empreendimento").forEach(function(el) { el.classList.remove("active"); });
    document.querySelectorAll(".blog-detail").forEach(function(el) { el.classList.remove("active"); });
  }

  function updateNav(id) {
    const links = document.querySelectorAll(".nav-list a");
    for (let i = 0; i < links.length; i++) links[i].classList.remove("active");
    var match = document.querySelector('.nav-list a[href="/' + id + '/"]');
    if (!match && id === "inicio") match = document.querySelector('.nav-list a[href="/"]');
    if (match) match.classList.add("active");
  }

  const groups = {
    inicio: ["inicio", "sobre", "stats", "servicos", "depoimentos", "parceiros", "faq"],
    financiamento: ["financiamento"]
  };

  function navigate(id) {
    closeGallery();
    window.scrollTo(0, 0);
    if (!id || id === "topo") {
      id = "inicio";
    }
    // Guard: skip if already showing this section (prevents flash)
    if (groups[id]) {
      var gs = document.getElementById(groups[id][0]);
      if (gs && gs.classList.contains('active')) return;
    }
    if (id !== 'comprar' && id !== 'alugar' && id !== 'lancamentos') {
      var gt = document.getElementById(id);
      if (gt && gt.classList.contains('active')) return;
    }
    hideAll();
    if (id.indexOf("prop-") === 0) {
      pageContent.style.display = "none";
      renderDetailCard(id);
      const card = document.getElementById(id);
      if (card) card.classList.add("active");
    } else if (id.indexOf("post-") === 0) {
      pageContent.style.display = "none";
      renderBlogPost(id);
      const postEl = document.getElementById(id);
      if (postEl) postEl.classList.add("active");
    } else if (EMPREENDIMENTO_IDS[id]) {
      pageContent.style.display = "none";
      renderEmpreendimentoDetail(id);
      const empEl = document.getElementById(id);
      if (empEl) empEl.classList.add("active");
    } else if (groups[id]) {
      _searchActive = false;
      pageContent.style.display = "";
      const groupSections = groups[id].filter(function(sid) {
        return !DISABLED_SECTIONS || DISABLED_SECTIONS.indexOf(sid) === -1;
      });
      for (let i = 0; i < groupSections.length; i++) {
        const s = document.getElementById(groupSections[i]);
        if (s) s.classList.add("active");
      }
      updateNav(id);
      resetMetaTags();
    } else {
      if (DISABLED_SECTIONS && DISABLED_SECTIONS.indexOf(id) !== -1) {
        navigate('inicio');
        return;
      }
      pageContent.style.display = "";
      const section = document.getElementById(id);
      if (section) section.classList.add("active");
      updateNav(id);
      resetMetaTags();
      if (id === 'mapa') { initMap(); invalidateMap(); }
      if (id === 'comprar' && _origCompraHTML && !_searchActive) {
        const c = document.querySelector('#comprar .grid-3');
        if (c) {
          c.innerHTML = _origCompraHTML;
          if (typeof window._revealObserver !== 'undefined') {
            c.querySelectorAll('.reveal').forEach(function(el) { window._revealObserver.observe(el); });
          }
        }
      }
      if (id === 'blog') renderBlogCards();
      if (id === 'favoritos') renderFavorites();
      if (id === 'alugar' && _origAlugaHTML && !_searchActive) {
        const a = document.querySelector('#alugar .grid-2');
        if (a) {
          a.innerHTML = _origAlugaHTML;
          if (typeof window._revealObserver !== 'undefined') {
            a.querySelectorAll('.reveal').forEach(function(el) { window._revealObserver.observe(el); });
          }
        }
      }
      if (id === 'lancamentos' && _origLancHTML && !_searchActive) {
        const l = document.querySelector('#lancamentos .grid-3');
        if (l) l.innerHTML = _origLancHTML;
      }
      if (id !== 'comprar' && id !== 'alugar' && id !== 'lancamentos') {
        _searchActive = false;
      }
    }
  }
  window._spaNavigate = navigate;

  document.querySelector(".menu-btn").addEventListener("click", function() {
    document.getElementById("mobileNav").classList.add("open");
    document.body.style.overflow = "hidden";
  });
  document.querySelector(".menu-btn").addEventListener("keydown", function(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      document.getElementById("mobileNav").classList.add("open");
      document.body.style.overflow = "hidden";
    }
  });

  document.addEventListener("click", function(e) {
    const a = e.target.closest("a");
    if (!a) return;
    const href = a.getAttribute("href");
    if (!href) return;
    if (a.hasAttribute("target")) return;
    // Home link
    if (href === '/' || href === '/index.html') {
      e.preventDefault();
      goTo('inicio');
      return;
    }
    // Internal SPA route: /section/ or /section-id/
    var match = href.match(/^\/([^\/]+)\/?$/);
    if (match) {
      e.preventDefault();
      goTo(match[1]);
    }
  });

  // Gallery: open from detail card / empreendimento image clicks
  document.addEventListener("click", function(e) {
    var trigger = e.target.closest(".gallery-trigger");
    if (!trigger) return;
    var container = trigger.closest(".detail-card, .empreendimento");
    if (!container) return;
    var propId = container.id;
    var idx = parseInt(trigger.getAttribute("data-idx"), 10) || 0;
    var item = findGalleryItem(propId);
    if (!item) return;
    _galleryData = item;
    _galleryIdx = idx;
    var modal = document.getElementById("galleryModal");
    if (!modal) return;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    updateGallery();
  });

  // Gallery: navigation
  var gModal = document.getElementById("galleryModal");
  if (gModal) {
    gModal.querySelector(".gallery-close").addEventListener("click", closeGallery);
    gModal.querySelector(".gallery-backdrop").addEventListener("click", closeGallery);
    gModal.querySelector(".gallery-prev").addEventListener("click", function() {
      _galleryIdx--; updateGallery();
    });
    gModal.querySelector(".gallery-next").addEventListener("click", function() {
      _galleryIdx++; updateGallery();
    });
    // "Ver detalhes completos" closes gallery first
    gModal.querySelector("#galleryDetailsLink").addEventListener("click", function() {
      closeGallery();
    });
    // Click on image halves to navigate
    gModal.querySelector("#galleryMainImg").addEventListener("click", function(e) {
      var rect = this.getBoundingClientRect();
      var x = e.clientX - rect.left;
      if (x < rect.width / 2) { _galleryIdx--; } else { _galleryIdx++; }
      updateGallery();
    });
    // Touch swipe
    var _touchStartX = 0;
    gModal.querySelector(".gallery-stage").addEventListener("touchstart", function(e) {
      _touchStartX = e.touches[0].clientX;
    }, { passive: true });
    gModal.querySelector(".gallery-stage").addEventListener("touchend", function(e) {
      var diff = _touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) { _galleryIdx++; } else { _galleryIdx--; }
        updateGallery();
      }
    }, { passive: true });
  }

  // Load more (pagination)
  document.addEventListener("click", function(e) {
    var btn = e.target.closest(".load-more");
    if (!btn) return;
    var sel = btn.getAttribute("data-container");
    var type = btn.getAttribute("data-type");
    var state = _pageState[sel];
    if (!state) return;
    state.page++;
    renderPropertyPage(sel, type);
  });

  // Back to top — scroll to current active section or top of page
  document.getElementById("backTop").addEventListener("click", function() {
    var active = document.querySelector(".page-content > section.active");
    if (active) {
      active.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  // Gallery: keyboard
  document.addEventListener("keydown", function(e) {
    var m = document.getElementById("galleryModal");
    if (!m || !m.classList.contains("active")) return;
    if (e.key === "Escape") { closeGallery(); return; }
    if (e.key === "ArrowLeft") { _galleryIdx--; updateGallery(); e.preventDefault(); }
    if (e.key === "ArrowRight") { _galleryIdx++; updateGallery(); e.preventDefault(); }
  });

  // Map: init once
  var _mapInstance = null;
  function initMap() {
    if (typeof L === 'undefined') return;
    if (_mapInstance) return;
    var container = document.getElementById('map');
    if (!container) return;
    _mapInstance = L.map('map', {
      center: [-27.0, -48.6],
      zoom: 9,
      zoomControl: true
    });
    window._mapInstance = _mapInstance;
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    var tileUrl = isDark
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var attr = '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>';
    L.tileLayer(tileUrl, { attribution: attr, maxZoom: 18 }).addTo(_mapInstance);

    function addMarker(p, iconColor, type) {
      var markerHtml = '<div style="background:' + iconColor + ';width:14px;height:14px;border-radius:50%;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,0.4);"></div>';
      var icon = L.divIcon({ html: markerHtml, iconSize: [14, 14], className: '' });
      var title = p.title || '';
      var price = p.price || '';
      var img = p.img || '';
      var link = '/' + p.id + '/';
      var popupHtml = '<div style="min-width:180px;font-family:Inter,sans-serif;">'
        + (img ? '<img src="' + img.replace('w=800', 'w=200') + '" alt="" style="width:100%;height:100px;object-fit:cover;border-radius:4px;margin-bottom:6px;" />' : '')
        + '<div style="font-size:0.8rem;font-weight:600;margin-bottom:2px;">' + title + '</div>'
        + '<div style="font-size:0.75rem;color:#888;">' + price + '</div>'
        + '<a href="' + link + '" style="display:inline-block;margin-top:4px;font-size:0.7rem;color:#d4af37;text-decoration:none;font-weight:600;">' + _cardT().viewDetails + ' &rarr;</a>'
        + '</div>';
      L.marker([p.lat, p.lng], { icon: icon })
        .addTo(_mapInstance)
        .bindPopup(popupHtml, { closeButton: true, maxWidth: 220 });
    }

    for (var mi = 0; mi < PROPERTIES.length; mi++) {
      var pr = PROPERTIES[mi];
      if (pr.lat && pr.lng) addMarker(pr, pr.type === 'sale' ? '#d4af37' : '#3b82f6', pr.type);
    }
    for (var ei = 0; ei < EMPREENDIMENTOS.length; ei++) {
      var em = EMPREENDIMENTOS[ei];
      if (em.lat && em.lng) addMarker(em, '#10b981', 'empreendimento');
    }
  }

  // Invalidate map size when section is shown
  function invalidateMap() {
    if (_mapInstance) setTimeout(function() { _mapInstance.invalidateSize(); }, 150);
  }

  window.addEventListener("popstate", function() {
    navigate(getSectionId());
  });

  navigate(window._redirectId || getSectionId());

  // Auto-calc financiamento with defaults
  if (document.getElementById('finSimulator')) calcFinancing();

})();

/* ===== DARK MODE ===== */
(function() {
  const html = document.documentElement;
  const btn = document.querySelector('.theme-toggle');
  const stored = localStorage.getItem('theme');
  function setMapTiles(theme) {
    if (!window._mapInstance) return;
    var tileUrl = theme === 'dark'
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    window._mapInstance.eachLayer(function(l) {
      if (l instanceof L.TileLayer) window._mapInstance.removeLayer(l);
    });
    L.tileLayer(tileUrl, { attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>', maxZoom: 18 }).addTo(window._mapInstance);
  }
  function apply(theme) {
    html.setAttribute('data-theme', theme);
    btn.textContent = theme === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';
    localStorage.setItem('theme', theme);
    setMapTiles(theme);
  }
  if (stored) {
    apply(stored);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    apply('dark');
  }
  if (btn) {
    btn.addEventListener('click', function() {
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      apply(next);
    });
  }
})();

/* ===== FINANCING CALCULATOR ===== */
function calcFinancing() {
  function parseNum(v) { return parseFloat(String(v).replace(',', '.')) || 0; }
  var price = parseNum(document.getElementById('fin-price').value);
  var down = parseNum(document.getElementById('fin-down').value);
  var annualRate = parseNum(document.getElementById('fin-rate').value);
  var termMonths = parseInt(document.getElementById('fin-term').value) || 240;

  if (down >= price) {
    document.getElementById('finResult').style.display = 'block';
    document.getElementById('fin-financed').textContent = '\u2014';
    document.getElementById('fin-monthly').textContent = '\u2014';
    document.getElementById('fin-total').textContent = '\u2014';
    document.getElementById('fin-interest').textContent = '\u2014';
    document.querySelector('#finResult .fin-obs').textContent = _cardT().finError || 'A entrada n\u00E3o pode ser maior ou igual ao valor do im\u00F3vel.';
    return;
  }

  var financed = price - down;
  var monthlyRate = annualRate / 100 / 12;
  var monthlyPayment = monthlyRate > 0
    ? financed * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1)
    : financed / termMonths;
  var totalPaid = monthlyPayment * termMonths;
  var totalInterest = totalPaid - financed;

  function fmt(v) {
    return 'R$ ' + v.toFixed(2).replace('.', ',');
  }

  document.getElementById('finResult').style.display = 'block';
  document.getElementById('fin-financed').textContent = fmt(financed);
  document.getElementById('fin-monthly').textContent = fmt(monthlyPayment);
  document.getElementById('fin-total').textContent = fmt(totalPaid);
  document.getElementById('fin-interest').textContent = fmt(totalInterest);
  document.querySelector('#finResult .fin-obs').textContent = _cardT().finObs || '* Simula\u00E7\u00E3o com taxa fixa de juros. Valores aproximados sujeitos a aprova\u00E7\u00E3o de cr\u00E9dito.';
}


/* ===== SHARE ===== */
function shareProperty(propId) {
  var p = null;
  for (var i = 0; i < PROPERTIES.length; i++) {
    if (PROPERTIES[i].id === propId) { p = PROPERTIES[i]; break; }
  }
  if (!p) return;
  var url = window.location.origin + BASE_PATH + propId + '/';
  var text = p.title + ' - ' + p.price + ' - ' + SITE_NAME;
  if (navigator.share) {
    navigator.share({ title: p.title, text: text, url: url }).catch(function() {});
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(function() {
      var btn = document.querySelector('.btn-share');
      if (btn) {
        var orig = btn.textContent;
        btn.textContent = _cardT().linkCopied;
        setTimeout(function() { btn.textContent = orig; }, 2000);
      }
    });
  }
}

/* ===== SEARCH ===== */
function clearSearch() {
  _searchActive = false;
  const compraContainer = document.querySelector('#comprar .grid-3');
  if (compraContainer && _origCompraHTML) {
    compraContainer.innerHTML = _origCompraHTML;
    if (typeof window._revealObserver !== 'undefined') {
      compraContainer.querySelectorAll('.reveal').forEach(function(el) { window._revealObserver.observe(el); });
    }
  }
  const alugaContainer = document.querySelector('#alugar .grid-2');
  if (alugaContainer && _origAlugaHTML) {
    alugaContainer.innerHTML = _origAlugaHTML;
    if (typeof window._revealObserver !== 'undefined') {
      alugaContainer.querySelectorAll('.reveal').forEach(function(el) { window._revealObserver.observe(el); });
    }
  }
  const lancContainer = document.querySelector('#lancamentos .grid-3');
  if (lancContainer && _origLancHTML) {
    lancContainer.innerHTML = _origLancHTML;
  }
  var prevPurpose = document.getElementById('search-purpose').value;
  document.getElementById('search-type').value = '';
  document.getElementById('search-location').value = '';
  document.getElementById('search-price').value = '';
  document.getElementById('search-purpose').value = '';
  var target = prevPurpose === 'rent' ? 'alugar' : 'comprar';
  if (DISABLED_SECTIONS && DISABLED_SECTIONS.indexOf(target) !== -1) target = 'comprar';
  goTo(target);
}

/* ===== SECTION-SPECIFIC SEARCH ===== */
function handleComprarSearch() {
  const typeVal = document.getElementById('comprar-type').value;
  const locationVal = document.getElementById('comprar-location').value;
  const priceText = document.getElementById('comprar-price').value;
  const container = document.querySelector('#comprar .grid-3');
  if (!container) return;
  if (!_origCompraHTML) { const c = document.querySelector('#comprar .grid-3'); if (c) _origCompraHTML = c.innerHTML; }
  if (!typeVal && !locationVal && !priceText) { clearComprarSearch(); return; }
  const results = PROPERTIES.filter(function(p) {
    if (p.type !== 'sale') return false;
    if (typeVal && p.category !== typeVal) return false;
    if (locationVal && p.location !== locationVal) return false;
    if (priceText) {
      const maxPrice = parseFloat(priceText.replace(/[^0-9]/g, ''));
      if (!isNaN(maxPrice) && p.priceNum > maxPrice) return false;
    }
    return true;
  });
  var ct = _cardT();
  var secT = _t('sections');
  let html = '';
  if (results.length === 0) {
    html = '<div style="grid-column:1/-1;text-align:center;padding:3rem 1rem;color:var(--muted-foreground);"><p style="font-size:1.25rem;">' + (secT.noResultsSale || 'Nenhum im\u00F3vel \u00E0 venda encontrado') + '</p></div>';
  } else {
    for (let i = 0; i < results.length; i++) html += buildPropertyCardHTML(results[i], 'badge-sale', ct.sale);
  }
  html += '<div style="grid-column:1/-1;text-align:center;padding:1rem 0;"><button onclick="clearComprarSearch()" class="btn-gold-outline" style="font-size:0.7rem;padding:0.6rem 1.5rem;cursor:pointer;">' + (secT.clear || 'Limpar') + '</button></div>';
  container.innerHTML = html;
  if (typeof window._revealObserver !== 'undefined') container.querySelectorAll('.reveal').forEach(function(el) { window._revealObserver.observe(el); });
}
function clearComprarSearch() {
  document.getElementById('comprar-type').value = '';
  document.getElementById('comprar-location').value = '';
  document.getElementById('comprar-price').value = '';
  const container = document.querySelector('#comprar .grid-3');
  if (container && _origCompraHTML) {
    container.innerHTML = _origCompraHTML;
    if (typeof window._revealObserver !== 'undefined') container.querySelectorAll('.reveal').forEach(function(el) { window._revealObserver.observe(el); });
  }
}

function handleAlugarSearch() {
  const typeVal = document.getElementById('alugar-type').value;
  const locationVal = document.getElementById('alugar-location').value;
  const priceText = document.getElementById('alugar-price').value;
  const container = document.querySelector('#alugar .grid-2');
  if (!container) return;
  if (!_origAlugaHTML) { const a = document.querySelector('#alugar .grid-2'); if (a) _origAlugaHTML = a.innerHTML; }
  if (!typeVal && !locationVal && !priceText) { clearAlugarSearch(); return; }
  const results = PROPERTIES.filter(function(p) {
    if (p.type !== 'rent') return false;
    if (typeVal && p.category !== typeVal) return false;
    if (locationVal && p.location !== locationVal) return false;
    if (priceText) {
      const maxPrice = parseFloat(priceText.replace(/[^0-9]/g, ''));
      if (!isNaN(maxPrice) && p.priceNum > maxPrice) return false;
    }
    return true;
  });
  var ct = _cardT();
  var secT = _t('sections');
  let html = '';
  if (results.length === 0) {
    html = '<div style="grid-column:1/-1;text-align:center;padding:3rem 1rem;color:var(--muted-foreground);"><p style="font-size:1.25rem;">' + (secT.noResultsRent || 'Nenhum im\u00F3vel para alugar encontrado') + '</p></div>';
  } else {
    for (let i = 0; i < results.length; i++) html += buildPropertyCardHTML(results[i], 'badge-rent', ct.rent);
  }
  html += '<div style="grid-column:1/-1;text-align:center;padding:1rem 0;"><button onclick="clearAlugarSearch()" class="btn-gold-outline" style="font-size:0.7rem;padding:0.6rem 1.5rem;cursor:pointer;">' + (secT.clear || 'Limpar') + '</button></div>';
  container.innerHTML = html;
  if (typeof window._revealObserver !== 'undefined') container.querySelectorAll('.reveal').forEach(function(el) { window._revealObserver.observe(el); });
}
function clearAlugarSearch() {
  document.getElementById('alugar-type').value = '';
  document.getElementById('alugar-location').value = '';
  document.getElementById('alugar-price').value = '';
  const container = document.querySelector('#alugar .grid-2');
  if (container && _origAlugaHTML) {
    container.innerHTML = _origAlugaHTML;
    if (typeof window._revealObserver !== 'undefined') container.querySelectorAll('.reveal').forEach(function(el) { window._revealObserver.observe(el); });
  }
}

function handleLancSearch() {
  const locationVal = document.getElementById('lanc-location').value;
  const container = document.querySelector('#lancamentos .grid-3');
  if (!container) return;
  if (!_origLancHTML) { const l = document.querySelector('#lancamentos .grid-3'); if (l) _origLancHTML = l.innerHTML; }
  if (!locationVal) { clearLancSearch(); return; }
  const results = EMPREENDIMENTOS.filter(function(e) { return e.location.indexOf(locationVal) !== -1; });
  var secT = _t('sections');
  let html = '';
  if (results.length === 0) {
    html = '<div style="grid-column:1/-1;text-align:center;padding:3rem 1rem;color:var(--muted-foreground);"><p style="font-size:1.25rem;">' + (secT.noResultsLanc || 'Nenhum lan\u00E7amento encontrado nesta regi\u00E3o') + '</p></div>';
  } else {
    for (let i = 0; i < results.length; i++) html += buildLancCardHTML(results[i]);
  }
  html += '<div style="grid-column:1/-1;text-align:center;padding:1rem 0;"><button onclick="clearLancSearch()" class="btn-gold-outline" style="font-size:0.7rem;padding:0.6rem 1.5rem;cursor:pointer;">' + (secT.clear || 'Limpar') + '</button></div>';
  container.innerHTML = html;
}
function clearLancSearch() {
  document.getElementById('lanc-location').value = '';
  const container = document.querySelector('#lancamentos .grid-3');
  if (container && _origLancHTML) container.innerHTML = _origLancHTML;
}

function handleSearch() {
  const typeVal = document.getElementById('search-type').value;
  const locationVal = document.getElementById('search-location').value;
  const priceText = document.getElementById('search-price').value;
  const purposeVal = document.getElementById('search-purpose').value;

  if (!typeVal && !locationVal && !priceText && !purposeVal) {
    clearSearch();
    return;
  }

  if (!_origCompraHTML) {
    const c = document.querySelector('#comprar .grid-3');
    if (c) _origCompraHTML = c.innerHTML;
  }
  if (!_origAlugaHTML) {
    const a = document.querySelector('#alugar .grid-2');
    if (a) _origAlugaHTML = a.innerHTML;
  }

  _searchActive = true;

  const results = PROPERTIES.filter(function(p) {
    if (purposeVal && p.type !== purposeVal) return false;
    if (typeVal && p.category !== typeVal) return false;
    if (locationVal && p.location !== locationVal) return false;
    if (priceText) {
      const maxPrice = parseFloat(priceText.replace(/[^0-9]/g, ''));
      if (!isNaN(maxPrice) && p.priceNum > maxPrice) return false;
    }
    // Skip types from disabled sections
    if (DISABLED_SECTIONS && DISABLED_SECTIONS.length) {
      var typeToSection = { sale: 'comprar', rent: 'alugar' };
      if (DISABLED_SECTIONS.indexOf(typeToSection[p.type]) !== -1) return false;
    }
    return true;
  });

  const showSale = purposeVal !== 'rent';
  const showRent = purposeVal !== 'sale';

  if (showSale) {
    const container = document.querySelector('#comprar .grid-3');
    if (container) {
      const saleResults = results.filter(function(p) { return p.type === 'sale'; });
      let html = '';
      if (saleResults.length === 0) {
        html = '<div style="grid-column:1/-1;text-align:center;padding:3rem 1rem;color:var(--muted-foreground);">'
          + '<p style="font-size:1.25rem;margin-bottom:0.5rem;">Nenhum im\u00F3vel \u00E0 venda encontrado</p>'
          + '</div>';
      } else {
        for (let i = 0; i < saleResults.length; i++) {
          html += buildPropertyCardHTML(saleResults[i], 'badge-sale', 'Venda');
        }
      }
      if (purposeVal !== 'rent') {
        html += '<div style="grid-column:1/-1;text-align:center;padding:1rem 0;">'
          + '<button onclick="clearSearch()" class="btn-gold-outline" style="font-size:0.7rem;padding:0.6rem 1.5rem;cursor:pointer;">Limpar busca</button></div>';
      }
      container.innerHTML = html;
      if (typeof window._revealObserver !== 'undefined') {
        container.querySelectorAll('.reveal').forEach(function(el) { window._revealObserver.observe(el); });
      }
    }
  }

  if (showRent) {
    const container = document.querySelector('#alugar .grid-2');
    if (container) {
      const rentResults = results.filter(function(p) { return p.type === 'rent'; });
      let html = '';
      if (rentResults.length === 0) {
        html = '<div style="grid-column:1/-1;text-align:center;padding:3rem 1rem;color:var(--muted-foreground);">'
          + '<p style="font-size:1.25rem;margin-bottom:0.5rem;">Nenhum im\u00F3vel para alugar encontrado</p>'
          + '</div>';
      } else {
        for (let i = 0; i < rentResults.length; i++) {
          html += buildPropertyCardHTML(rentResults[i], 'badge-rent', 'Aluguel');
        }
      }
      if (purposeVal !== 'sale') {
        html += '<div style="grid-column:1/-1;text-align:center;padding:1rem 0;">'
          + '<button onclick="clearSearch()" class="btn-gold-outline" style="font-size:0.7rem;padding:0.6rem 1.5rem;cursor:pointer;">Limpar busca</button></div>';
      }
      container.innerHTML = html;
      if (typeof window._revealObserver !== 'undefined') {
        container.querySelectorAll('.reveal').forEach(function(el) { window._revealObserver.observe(el); });
      }
    }
  }

  // Search lancamentos by location
  if (!_origLancHTML) {
    const l = document.querySelector('#lancamentos .grid-3');
    if (l) _origLancHTML = l.innerHTML;
  }
  const lancContainer = document.querySelector('#lancamentos .grid-3');
  if (lancContainer) {
    if (locationVal) {
      const lancResults = EMPREENDIMENTOS.filter(function(e) {
        return e.location.indexOf(locationVal) !== -1;
      });
      let lancHtml = '';
      for (let i = 0; i < lancResults.length; i++) {
        lancHtml += buildLancCardHTML(lancResults[i]);
      }
      lancContainer.innerHTML = lancHtml || '<div style="grid-column:1/-1;text-align:center;padding:3rem 1rem;color:var(--muted-foreground);"><p style="font-size:1.25rem;">Nenhum lan\u00E7amento encontrado nesta regi\u00E3o</p></div>';
    } else {
      lancContainer.innerHTML = _origLancHTML;
    }
  }

  var target = showSale ? 'comprar' : 'alugar';
  if (DISABLED_SECTIONS && DISABLED_SECTIONS.indexOf(target) !== -1) target = 'comprar';
  goTo(target);
}

/* ===== SEO META TAGS ===== */
function updateMetaTags(p) {
  var title = document.querySelector('title');
  if (title) title.textContent = p.title + ' \u2014 ' + SITE_NAME;
  var pDesc = p.desc || (p.description ? p.description.split('\n\n')[0] : '');
  var desc = document.querySelector('meta[name="description"]');
  if (desc) desc.content = (pDesc || p.title) + ' \u2014 ' + SITE_NAME;
  var ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.content = p.title + ' \u2014 ' + SITE_NAME;
  var ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.content = pDesc || p.title;
  var ogImg = document.querySelector('meta[property="og:image"]');
  if (ogImg && p.gallery && p.gallery.length) ogImg.content = p.gallery[0];
  var ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.content = window.location.origin + BASE_PATH + p.id + '/';
}

function resetMetaTags() {
  var title = document.querySelector('title');
  if (title) title.textContent = SITE_NAME + ' \u2014 Im\u00F3veis \u00E0 venda e aluguel';
  var desc = document.querySelector('meta[name="description"]');
  if (desc) desc.content = 'Su Imobili\u00E1ria \u2014 mais de 15 anos no litoral catarinense. Im\u00F3veis \u00E0 venda e aluguel em Balne\u00E1rio Cambori\u00FA, Florian\u00F3polis, Itapema, Bombinhas e Joinville.';
  var ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.content = SITE_NAME + ' \u2014 Im\u00F3veis \u00E0 venda e aluguel';
  var ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.content = 'Mais de 15 anos transformando sonhos em endere\u00E7os no litoral catarinense.';
  var ogImg = document.querySelector('meta[property="og:image"]');
  if (ogImg) ogImg.content = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80';
  var ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.content = window.location.origin + window.location.pathname;
}




