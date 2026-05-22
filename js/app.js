/* ===== SHARED CARD HTML ===== */
function buildPropertyCardHTML(p, badgeClass, badgeText) {
  let propsHtml = "";
  if (p.category === "Terreno") {
    propsHtml = '<span>\uD83D\uDCD0 ' + p.area + ' m\u00B2</span>'
      + '<span>\uD83D\uDCCD Zona ' + (p.zone || 'Urbana') + '</span>'
      + '<span>\uD83E\uDDF1 Topografia ' + (p.topography || 'Plana') + '</span>';
  } else if (p.category === "Comercial") {
    propsHtml = '<span>\uD83D\uDDA5\uFE0F Sala</span><span>\uD83D\uDEC1 ' + p.baths + (p.baths === 1 ? ' banheiro' : ' banheiros') + '</span><span>\uD83D\uDCD0 ' + p.area + ' m\u00B2</span>';
  } else {
    propsHtml = '';
    if (p.beds) propsHtml += '<span>\uD83D\uDECF\uFE0F ' + p.beds + (p.beds === 1 ? ' quarto' : ' quartos') + '</span>';
    if (p.baths) propsHtml += '<span>\uD83D\uDEC1 ' + p.baths + (p.baths === 1 ? ' banheiro' : ' banheiros') + '</span>';
    if (p.garage) propsHtml += '<span>\uD83D\uDE97 ' + p.garage + (p.garage === 1 ? ' vaga' : ' vagas') + '</span>';
    propsHtml += '<span>\uD83D\uDCD0 ' + p.area + ' m\u00B2</span>';
  }

  var tagsHtml = '';
  tagsHtml += '<span class="card-tag tag-' + p.category.toLowerCase().replace(/[\/\s]+/g, '') + '">' + p.category + '</span>';
  if (p.video) tagsHtml += '<span class="card-tag tag-tour">\u25B6 Tour Virtual</span>';

  var locationHtml = '<span class="card-location">\uD83D\uDCCD ' + p.location + '</span>';

  var priceDisplay = p.price;
  if (p.type === 'rent' && p.price.indexOf('/m\u00EAs') === -1) priceDisplay += ' /m\u00EAs';
  var rawMsg = WHATSAPP_MSG.replace('{titulo}', p.title).replace('{preco}', priceDisplay);
  var whatsappUrl = WHATSAPP_URL + '?text=' + encodeURIComponent(rawMsg);

  var statusHtml = '';
  if (p.status && p.status !== 'disponivel') {
    var statusClass = p.status === 'vendido' ? 'status-vendido' : 'status-locado';
    statusHtml = '<span class="status-badge ' + statusClass + '">' + p.status.charAt(0).toUpperCase() + p.status.slice(1) + '</span>';
  }

  return '<div class="card-wrap reveal">'
    + '<a href="#' + p.id + '" class="card">'
    + '<div class="card-img"><img src="' + p.img + '" alt="' + p.title.replace(/"/g, '&quot;') + '" loading="lazy" />'
    + statusHtml
    + '</div>'
    + '<div class="card-body">'
    + '<div class="card-head">'
    + '<span class="badge ' + badgeClass + '">' + badgeText + '</span>'
    + '<span class="card-tags">' + tagsHtml + '</span>'
    + '</div>'
    + '<h3>' + p.title + '</h3>'
    + locationHtml
    + '<p class="price">' + priceDisplay + '</p>'
    + '<p class="card-desc">' + p.desc + '</p>'
    + '<div class="props">' + propsHtml + '</div>'
    + '<span class="card-link">Ver detalhes \u2192</span>'
    + '</div></a>'
    + '<a href="' + whatsappUrl + '" target="_blank" class="card-whatsapp" aria-label="Quero saber mais no WhatsApp">'
    + '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>'
    + '<span>Quero saber mais</span>'
    + '</a>'
    + '</div>';
}

/* ===== SHARED LANC CARD HTML ===== */
function buildLancCardHTML(e) {
  return '<a href="#' + e.id + '" class="lanc-card">'
    + '<div class="card-img">'
    + '<img src="' + e.img + '" alt="' + e.title.replace(/"/g, '&quot;') + '" loading="lazy" />'
    + '<span class="badge badge-lanc lanc-badge">Lan\u00E7amento</span>'
    + '<span class="lanc-tag">' + e.price + '</span>'
    + '</div>'
    + '<div class="card-body">'
    + '<h3>' + e.title + '</h3>'
    + '<p>' + e.description.split('\n\n')[0] + '</p>'
    + '<div class="lanc-progress">'
    + '<div class="lanc-progress-bar"><div class="lanc-progress-fill" style="width:' + e.progress + '%"></div></div>'
    + '<div class="lanc-progress-label"><span>' + e.progressLabel + '</span><span>' + e.delivery + '</span></div>'
    + '</div>'
    + '<span class="card-link">Conhe\u00E7a o empreendimento \u2192</span>'
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
  for (var i = 0; i < end; i++) {
    html += buildPropertyCardHTML(filtered[i], type === "sale" ? "badge-sale" : "badge-rent", type === "sale" ? "Venda" : "Aluguel");
  }
  if (end < total) {
    html += '<div style="grid-column:1/-1;text-align:center;padding:2rem 0 0;">'
      + '<button class="btn-gold-outline load-more" data-container="' + containerSelector + '" data-type="' + type + '" style="font-size:0.75rem;padding:0.75rem 2rem;cursor:pointer;">Carregar mais (' + (total - end) + ' restantes)</button></div>';
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
  const backSection = p.type === "sale" ? "comprar" : "alugar";
  const badgeClass = p.type === "sale" ? "badge-sale" : "badge-rent";
  const badgeText = p.type === "sale" ? "Venda" : "Aluguel";

  let propsLgHtml = '';
  if (p.category === "Terreno") {
    var frontText = p.front ? p.front + ' m' : '\u2014';
    var backText = p.back ? p.back + ' m' : '\u2014';
    propsLgHtml = '<span><span class="num">' + p.area + '</span><span class="lbl">m\u00B2</span></span>'
      + '<span><span class="num">' + frontText + '</span><span class="lbl">Frente</span></span>'
      + '<span><span class="num">' + backText + '</span><span class="lbl">Fundos</span></span>'
      + '<span><span class="num">' + (p.zone || 'Urbana') + '</span><span class="lbl">Zona</span></span>';
  } else {
    propsLgHtml = '';
    if (p.beds && p.category !== "Comercial") {
      propsLgHtml += '<span><span class="num">' + p.beds + '</span><span class="lbl">' + (p.beds === 1 ? 'Quarto' : 'Quartos') + '</span></span>';
    }
    if (p.baths) {
      propsLgHtml += '<span><span class="num">' + p.baths + '</span><span class="lbl">' + (p.baths === 1 ? 'Banheiro' : 'Banheiros') + '</span></span>';
    }
    if (p.garage !== undefined) {
      propsLgHtml += '<span><span class="num">' + p.garage + '</span><span class="lbl">' + (p.garage <= 1 ? 'Vaga' : 'Vagas') + '</span></span>';
    }
    propsLgHtml += '<span><span class="num">' + p.area + '</span><span class="lbl">m\u00B2</span></span>';
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
  for (let f = 0; f < p.features.length; f++) {
    featuresHtml += '<li>' + p.features[f] + '</li>';
  }

  const paragraphs = p.description.split('\n\n');
  let descHtml = '';
  for (let d = 0; d < paragraphs.length; d++) {
    descHtml += '<p>' + paragraphs[d] + '</p>';
  }

  var statusDetailHtml = '';
  if (p.status && p.status !== 'disponivel') {
    var stCls = p.status === 'vendido' ? 'status-vendido' : 'status-locado';
    statusDetailHtml = '<span class="status-badge status-badge-lg ' + stCls + '">' + p.status.charAt(0).toUpperCase() + p.status.slice(1) + '</span>';
  }

  const sectionLabel = p.type === 'sale' ? 'Comprar' : 'Alugar';
  var detailPriceDisplay = p.price;
  if (p.type === 'rent' && p.price.indexOf('/m\u00EAs') === -1) detailPriceDisplay += ' /m\u00EAs';
  var detailRawMsg = WHATSAPP_MSG.replace('{titulo}', p.title).replace('{preco}', detailPriceDisplay);
  var detailWhatsUrl = WHATSAPP_URL + '?text=' + encodeURIComponent(detailRawMsg);

  const detailEl = document.createElement('div');
  detailEl.className = 'detail-card';
  detailEl.id = p.id;
  detailEl.innerHTML = '<div class="detail-inner">'
    + '<nav class="detail-breadcrumb" aria-label="Breadcrumb"><a href="#topo">In\u00EDcio</a> <span class="sep">/</span> <a href="#' + backSection + '">' + sectionLabel + '</a> <span class="sep">/</span> <span>' + p.title + '</span></nav>'
    + '<div class="detail-header">'
    + '<div>'
    + '<p class="eyebrow">' + eyebrow + '</p>'
    + '<h1>' + p.title + '</h1>'
    + '<p class="price">' + (p.type === 'rent' && p.price.indexOf('/m\u00EAs') === -1 ? p.price + ' /m\u00EAs' : p.price) + statusDetailHtml + '</p>'
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
    + '<div><h2>Sobre este im\u00F3vel</h2>' + descHtml + '</div>'
    + '<div class="detail-features"><h3>Caracter\u00EDsticas</h3><ul>' + featuresHtml + '</ul></div>'
    + '</div>'
    + '<div class="detail-actions">'
    + '<a href="' + detailWhatsUrl + '" class="btn-primary" target="_blank">Agendar visita</a>'
    + (p.maps ? '<a href="' + p.maps + '" class="btn-gold-outline" target="_blank">Ver no mapa</a>' : '')
    + '<button class="btn-gold-outline btn-share" onclick="shareProperty(\'' + p.id + '\')">Compartilhar</button>'
    + '<a href="#' + backSection + '" class="btn-gold-outline">Outros im\u00F3veis</a>'
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

  let tagsHtml = '';
  const tagClasses = ['emp-tag-red', 'emp-tag-gold', 'emp-tag-deep'];
  for (let t = 0; t < emp.tags.length; t++) {
    tagsHtml += '<span class="emp-tag ' + tagClasses[t % 3] + '">' + emp.tags[t] + '</span>';
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
  for (let tl = 0; tl < emp.timeline.length; tl++) {
    const item = emp.timeline[tl];
    timelineHtml += '<div class="tl-item">'
      + '<p class="tl-date">' + item.date + '</p>'
      + '<p class="tl-title">' + item.title + '</p>'
      + '<p class="tl-desc">' + item.desc + '</p>'
      + '</div>';
  }

  let amenitiesHtml = '';
  for (let a = 0; a < emp.amenities.length; a++) {
    amenitiesHtml += '<li>' + emp.amenities[a] + '</li>';
  }

  let priceRowsHtml = '';
  for (let pr = 0; pr < emp.prices.length; pr++) {
    const row = emp.prices[pr];
    const cls = row.highlight ? ' class="highlight"' : '';
    priceRowsHtml += '<tr' + cls + '><td>' + row.unit + '</td><td>' + row.area + '</td><td>' + row.value + '</td></tr>';
  }

  let paymentHtml = '';
  for (let pp = 0; pp < emp.payment.length; pp++) {
    paymentHtml += '<div><p class="pp-label">' + emp.payment[pp].label + '</p><p class="pp-value">' + emp.payment[pp].value + '</p></div>';
  }

  const paragraphs = emp.description.split('\n\n');
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
    + '<h3>Sobre o empreendimento</h3>'
    + descHtml
    + '<h3 style="margin-top:1.5rem;">Plantas</h3>'
    + '<div class="media-grid-thumbs" style="margin-bottom:1.5rem;">' + plantsHtml + '</div>'
    + '<h3>Cronograma de obras</h3>'
    + '<div class="timeline">' + timelineHtml + '</div>'
    + '</div>'
    + '<div>'
    + '<h3>Lazer e amenities</h3>'
    + '<ul class="amenities">' + amenitiesHtml + '</ul>'
    + '<h3>Tabela de pre\u00E7os</h3>'
    + '<table class="price-table"><thead><tr><th>Unidade</th><th>\u00C1rea</th><th>Valor</th></tr></thead><tbody>' + priceRowsHtml + '</tbody></table>'
    + '<h3>Condi\u00E7\u00F5es de pagamento</h3>'
    + '<div class="payment-plan">' + paymentHtml + '</div>'
    + '<a href="#contato" class="btn-primary" style="margin-top:1rem;">Quero saber mais</a>'
    + '</div>'
    + '</div>'
    + '</div>';

  document.body.appendChild(empEl);
}

function renderFAQs() {
  const container = document.querySelector('.faq-section');
  if (!container) return;
  let html = "";
  for (let i = 0; i < FAQS.length; i++) {
    html += '<details class="faq-item">'
      + '<summary>' + FAQS[i].q + '</summary>'
      + '<div class="faq-answer">' + FAQS[i].a + '</div>'
      + '</details>';
  }
  container.innerHTML = html;
}

function renderDepoimentos() {
  const container = document.querySelector('#depoimentos .grid-3');
  if (!container) return;
  let html = "";
  for (let i = 0; i < DEPOIMENTOS.length; i++) {
    const d = DEPOIMENTOS[i];
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
  for (let i = 0; i < PARCEIROS.length; i++) {
    const p = PARCEIROS[i];
    if (p.img) {
      html += '<a href="' + p.url + '" style="opacity:0.6;transition:opacity 0.2s;filter:grayscale(1);" onmouseover="this.style.opacity=\'1\'" onmouseout="this.style.opacity=\'0.6\'">'
        + '<img src="' + p.img + '" alt="' + p.name.replace(/"/g, '&quot;') + '" style="max-height:60px;width:auto;" loading="lazy" />'
        + '</a>';
    } else {
      html += '<a href="' + p.url + '" style="display:flex;align-items:center;justify-content:center;opacity:0.6;transition:opacity 0.2s;filter:grayscale(1);padding:1rem;font-size:0.85rem;font-weight:500;color:var(--text);border:1px solid var(--border);border-radius:4px;text-decoration:none;" onmouseover="this.style.opacity=\'1\'" onmouseout="this.style.opacity=\'0.6\'">'
        + p.name
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
  link.href = "#" + data.id;
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
    a.href = '#' + sectionId;
    a.textContent = cat + ' (' + count + ')';
    a.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.hash = sectionId;
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
    if (sorted.length === 0) {
      var noneMsg = 'Nenhum dispon\u00EDvel';
      for (var ci = 0; ci < containers.length; ci++) {
        containers[ci].innerHTML = '<span style="display:block;padding:0.4rem 1.25rem;font-size:0.65rem;color:rgba(255,255,255,0.35);">' + noneMsg + '</span>';
      }
      return;
    }
    for (var ci = 0; ci < sorted.length; ci++) {
      for (var ci2 = 0; ci2 < containers.length; ci2++) {
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
    for (var li = 0; li < EMPREENDIMENTOS.length; li++) {
      for (var lj = 0; lj < lancContainers.length; lj++) {
        var la = document.createElement('a');
        la.href = '#' + EMPREENDIMENTOS[li].id;
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
  }

  function updateNav(id) {
    const links = document.querySelectorAll(".nav-list a");
    for (let i = 0; i < links.length; i++) links[i].classList.remove("active");
    var match = document.querySelector('.nav-list a[href="#' + id + '"]');
    if (!match && id === "inicio") match = document.querySelector('.nav-list a[href="#topo"]');
    if (match) match.classList.add("active");
  }

  const groups = {
    inicio: ["inicio", "sobre", "stats", "servicos", "depoimentos", "parceiros", "faq", "contato"],
    financiamento: ["financiamento"]
  };

  function navigate(id) {
    closeGallery();
    window.scrollTo(0, 0);
    if (!id || id === "topo") {
      id = "inicio";
      window.location.hash = 'inicio';
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
    } else {
      if (DISABLED_SECTIONS && DISABLED_SECTIONS.indexOf(id) !== -1) {
        navigate('inicio');
        return;
      }
      pageContent.style.display = "";
      const section = document.getElementById(id);
      if (section) section.classList.add("active");
      updateNav(id);
      if (id === 'comprar' && _origCompraHTML && !_searchActive) {
        const c = document.querySelector('#comprar .grid-3');
        if (c) {
          c.innerHTML = _origCompraHTML;
          if (typeof window._revealObserver !== 'undefined') {
            c.querySelectorAll('.reveal').forEach(function(el) { window._revealObserver.observe(el); });
          }
        }
      }
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
    if (!href || href.charAt(0) !== "#") return;
    if (a.hasAttribute("target")) return;
    const id = href.slice(1);
    if (!id) return;
    e.preventDefault();
    window.location.hash = id;
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

  window.addEventListener("hashchange", function() {
    navigate(window.location.hash.slice(1));
  });

  navigate(window.location.hash.slice(1) || "inicio");

  // Auto-calc financiamento with defaults
  if (document.getElementById('finSimulator')) calcFinancing();

})();

/* ===== DARK MODE ===== */
(function() {
  const html = document.documentElement;
  const btn = document.querySelector('.theme-toggle');
  const stored = localStorage.getItem('theme');
  function apply(theme) {
    html.setAttribute('data-theme', theme);
    btn.textContent = theme === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19';
    localStorage.setItem('theme', theme);
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
    document.querySelector('#finResult .fin-obs').textContent = 'A entrada n\u00E3o pode ser maior ou igual ao valor do im\u00F3vel.';
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
  document.querySelector('#finResult .fin-obs').textContent = '* Simula\u00E7\u00E3o com taxa fixa de juros. Valores aproximados sujeitos a aprova\u00E7\u00E3o de cr\u00E9dito.';
}

/* ===== SHARE ===== */
function shareProperty(propId) {
  var p = null;
  for (var i = 0; i < PROPERTIES.length; i++) {
    if (PROPERTIES[i].id === propId) { p = PROPERTIES[i]; break; }
  }
  if (!p) return;
  var url = window.location.origin + window.location.pathname + '#' + propId;
  var text = p.title + ' - ' + p.price + ' - ' + SITE_NAME;
  if (navigator.share) {
    navigator.share({ title: p.title, text: text, url: url }).catch(function() {});
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(function() {
      var btn = document.querySelector('.btn-share');
      if (btn) {
        var orig = btn.textContent;
        btn.textContent = 'Link copiado!';
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
  window.location.hash = prevPurpose === 'rent' ? 'alugar' : 'comprar';
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
  let html = '';
  if (results.length === 0) {
    html = '<div style="grid-column:1/-1;text-align:center;padding:3rem 1rem;color:var(--muted-foreground);"><p style="font-size:1.25rem;">Nenhum im\u00F3vel \u00E0 venda encontrado</p></div>';
  } else {
    for (let i = 0; i < results.length; i++) html += buildPropertyCardHTML(results[i], 'badge-sale', 'Venda');
  }
  html += '<div style="grid-column:1/-1;text-align:center;padding:1rem 0;"><button onclick="clearComprarSearch()" class="btn-gold-outline" style="font-size:0.7rem;padding:0.6rem 1.5rem;cursor:pointer;">Limpar filtros</button></div>';
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
  let html = '';
  if (results.length === 0) {
    html = '<div style="grid-column:1/-1;text-align:center;padding:3rem 1rem;color:var(--muted-foreground);"><p style="font-size:1.25rem;">Nenhum im\u00F3vel para alugar encontrado</p></div>';
  } else {
    for (let i = 0; i < results.length; i++) html += buildPropertyCardHTML(results[i], 'badge-rent', 'Aluguel');
  }
  html += '<div style="grid-column:1/-1;text-align:center;padding:1rem 0;"><button onclick="clearAlugarSearch()" class="btn-gold-outline" style="font-size:0.7rem;padding:0.6rem 1.5rem;cursor:pointer;">Limpar filtros</button></div>';
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
  let html = '';
  if (results.length === 0) {
    html = '<div style="grid-column:1/-1;text-align:center;padding:3rem 1rem;color:var(--muted-foreground);"><p style="font-size:1.25rem;">Nenhum lan\u00E7amento encontrado nesta regi\u00E3o</p></div>';
  } else {
    for (let i = 0; i < results.length; i++) html += buildLancCardHTML(results[i]);
  }
  html += '<div style="grid-column:1/-1;text-align:center;padding:1rem 0;"><button onclick="clearLancSearch()" class="btn-gold-outline" style="font-size:0.7rem;padding:0.6rem 1.5rem;cursor:pointer;">Limpar filtros</button></div>';
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

  if (showSale) {
    window.location.hash = 'comprar';
  } else {
    window.location.hash = 'alugar';
  }
}


