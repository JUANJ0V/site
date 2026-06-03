/* ===================================================================
   ADMIN PANEL — Configuração
   =================================================================== */

const ADMIN_ENABLED = false; // ← Mude para true para ativar o painel
const ADMIN_USER    = "admin";
const ADMIN_PASS    = "admin123";
const GITHUB_REPO   = "JUANJ0V/site";
const GITHUB_BRANCH = "main";
const GITHUB_PATH   = "js/data.js";

/* ===================================================================
   INICIALIZAÇÃO
   =================================================================== */

(function() {
  if (!ADMIN_ENABLED) return;
  if (!window.location.search.includes('edit=1')) return;

  var ADMIN_TOKEN = localStorage.getItem('admin_github_token') || '';
  var ADMIN_LOGGED = sessionStorage.getItem('admin_logged') === '1';

  // ── Injetar CSS ──
  (function() {
    var css = document.createElement('style');
    css.textContent = `
      /* ── Panel backdrop ── */
      #adminPanel { display:none; position:fixed; z-index:99999; inset:0; background:rgba(0,0,0,0.85); font-family:system-ui,sans-serif; color:#fff; overflow:auto; }
      #adminPanel.active { display:flex; flex-direction:column; }
      #adminPanel * { box-sizing:border-box; }

      /* ── Login ── */
      #adminLogin { position:fixed; z-index:99999; inset:0; background:#0e142e; display:flex; align-items:center; justify-content:center; font-family:system-ui,sans-serif; }
      #adminLogin.hidden { display:none; }
      #adminLogin .box { background:#1a1f3a; padding:2.5rem; border-radius:12px; border:1px solid rgba(255,255,255,0.08); width:360px; max-width:90vw; }
      #adminLogin h2 { margin:0 0 0.25rem; color:#d4af37; font-size:1.25rem; }
      #adminLogin p { margin:0 0 1.5rem; color:rgba(255,255,255,0.5); font-size:0.85rem; }
      #adminLogin input { display:block; width:100%; padding:0.7rem 0.9rem; margin-bottom:0.75rem; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); border-radius:6px; color:#fff; font-size:0.9rem; outline:none; }
      #adminLogin input:focus { border-color:#d4af37; }
      #adminLogin button { width:100%; padding:0.7rem; background:#d4af37; border:none; border-radius:6px; color:#0e142e; font-weight:700; font-size:0.9rem; cursor:pointer; }
      #adminLogin .error { color:#ff6b6b; font-size:0.8rem; margin-top:0.5rem; display:none; }

      /* ── Header ── */
      .admin-header { display:flex; align-items:center; justify-content:space-between; padding:0.75rem 1.5rem; background:#0e142e; border-bottom:1px solid rgba(255,255,255,0.06); }
      .admin-header h1 { margin:0; font-size:1rem; color:#d4af37; }
      .admin-header .admin-actions { display:flex; gap:0.5rem; align-items:center; }
      .admin-header .admin-actions button, .admin-header .admin-actions a { padding:0.4rem 0.9rem; border-radius:5px; border:1px solid rgba(255,255,255,0.1); background:transparent; color:#fff; font-size:0.8rem; cursor:pointer; text-decoration:none; transition:all 0.15s; }
      .admin-header .admin-actions .btn-publish { background:#d4af37; color:#0e142e; border:none; font-weight:700; }
      .admin-header .admin-actions .btn-publish:hover { background:#c5a030; }

      /* ── Body ── */
      .admin-body { display:flex; flex:1; overflow:hidden; }
      .admin-sidebar { width:200px; min-width:200px; background:#0a0f24; border-right:1px solid rgba(255,255,255,0.05); padding:0.75rem 0; overflow-y:auto; }
      .admin-sidebar button { display:block; width:100%; text-align:left; padding:0.6rem 1.2rem; background:none; border:none; color:rgba(255,255,255,0.5); font-size:0.85rem; cursor:pointer; transition:all 0.15s; }
      .admin-sidebar button:hover { background:rgba(255,255,255,0.03); color:#fff; }
      .admin-sidebar button.active { background:rgba(212,175,55,0.1); color:#d4af37; border-right:2px solid #d4af37; }
      .admin-content { flex:1; padding:1.5rem; overflow-y:auto; }

      /* ── Cards / Tabelas ── */
      .admin-section { display:none; }
      .admin-section.active { display:block; }
      .admin-section h2 { margin:0 0 1rem; color:#d4af37; font-size:1.1rem; }
      .admin-section .desc { margin:0 0 1.5rem; color:rgba(255,255,255,0.4); font-size:0.8rem; }
      .admin-table { width:100%; border-collapse:collapse; font-size:0.82rem; }
      .admin-table th { text-align:left; padding:0.5rem 0.75rem; border-bottom:1px solid rgba(255,255,255,0.08); color:rgba(255,255,255,0.4); font-weight:600; text-transform:uppercase; font-size:0.7rem; letter-spacing:0.05em; }
      .admin-table td { padding:0.5rem 0.75rem; border-bottom:1px solid rgba(255,255,255,0.04); vertical-align:middle; }
      .admin-table tr:hover td { background:rgba(255,255,255,0.02); }
      .admin-table .actions { text-align:right; white-space:nowrap; }
      .admin-table .actions button { padding:0.25rem 0.6rem; border-radius:3px; border:1px solid rgba(255,255,255,0.1); background:transparent; color:rgba(255,255,255,0.6); font-size:0.75rem; cursor:pointer; margin-left:0.25rem; }
      .admin-table .actions .btn-del { border-color:rgba(255,80,80,0.3); color:#ff6b6b; }
      .admin-table .actions .btn-del:hover { background:rgba(255,80,80,0.1); }

      .btn-add { padding:0.45rem 1rem; border-radius:5px; border:1px solid rgba(212,175,55,0.3); background:transparent; color:#d4af37; font-size:0.8rem; cursor:pointer; margin-bottom:1rem; }
      .btn-add:hover { background:rgba(212,175,55,0.08); }

      /* ── Modal ── */
      .admin-modal { display:none; position:fixed; z-index:100000; inset:0; background:rgba(0,0,0,0.7); align-items:center; justify-content:center; }
      .admin-modal.active { display:flex; }
      .admin-modal .modal-box { background:#1a1f3a; border-radius:12px; border:1px solid rgba(255,255,255,0.08); width:700px; max-width:95vw; max-height:85vh; overflow-y:auto; padding:1.5rem; }
      .admin-modal .modal-box h3 { margin:0 0 1rem; color:#d4af37; font-size:1rem; }
      .admin-modal .modal-box label { display:block; margin:0.5rem 0 0.2rem; color:rgba(255,255,255,0.6); font-size:0.78rem; text-transform:uppercase; letter-spacing:0.05em; }
      .admin-modal .modal-box input, .admin-modal .modal-box textarea, .admin-modal .modal-box select { width:100%; padding:0.5rem 0.7rem; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); border-radius:5px; color:#fff; font-size:0.85rem; outline:none; }
      .admin-modal .modal-box input:focus, .admin-modal .modal-box textarea:focus { border-color:#d4af37; }
      .admin-modal .modal-box textarea { min-height:80px; resize:vertical; font-family:system-ui,sans-serif; }
      .admin-modal .modal-box .row2 { display:grid; grid-template-columns:1fr 1fr; gap:0 1rem; }
      .admin-modal .modal-box .row3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:0 1rem; }
      .admin-modal .modal-box .modal-actions { display:flex; gap:0.5rem; justify-content:flex-end; margin-top:1rem; padding-top:1rem; border-top:1px solid rgba(255,255,255,0.06); }
      .admin-modal .modal-box .modal-actions button { padding:0.45rem 1.2rem; border-radius:5px; font-size:0.82rem; cursor:pointer; }
      .admin-modal .modal-box .modal-actions .btn-save { background:#d4af37; color:#0e142e; border:none; font-weight:700; }
      .admin-modal .modal-box .modal-actions .btn-cancel { background:transparent; color:rgba(255,255,255,0.6); border:1px solid rgba(255,255,255,0.1); }

      /* ── Settings / Token ── */
      .admin-settings label { display:block; margin:0.75rem 0 0.25rem; color:rgba(255,255,255,0.5); font-size:0.78rem; text-transform:uppercase; letter-spacing:0.05em; }
      .admin-settings input, .admin-settings textarea { width:100%; max-width:500px; padding:0.5rem 0.7rem; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); border-radius:5px; color:#fff; font-size:0.85rem; outline:none; margin-bottom:0.5rem; }
      .admin-settings input:focus { border-color:#d4af37; }
      .admin-settings .note { color:rgba(255,255,255,0.3); font-size:0.75rem; margin:-0.25rem 0 0.75rem; }
      .admin-settings .btn-save { padding:0.45rem 1.2rem; border-radius:5px; background:#d4af37; color:#0e142e; border:none; font-weight:700; font-size:0.82rem; cursor:pointer; }

      /* ── Toast ── */
      #adminToast { position:fixed; z-index:100001; bottom:1.5rem; right:1.5rem; padding:0.7rem 1.2rem; border-radius:8px; font-size:0.85rem; opacity:0; transition:opacity 0.3s; pointer-events:none; }
      #adminToast.show { opacity:1; }
      #adminToast.success { background:#1b5e20; color:#a5d6a7; }
      #adminToast.error { background:#b71c1c; color:#ef9a9a; }
      #adminToast.info { background:#1a237e; color:#9fa8da; }

      /* ── Preview badge ── */
      .admin-preview-badge { position:fixed; top:0; left:0; right:0; z-index:99998; background:#d4af37; color:#0e142e; text-align:center; padding:0.25rem; font-size:0.75rem; font-weight:700; letter-spacing:0.05em; }
      body.admin-mode { padding-top:1.5rem; }
    `;
    document.head.appendChild(css);
  })();

  // ── Criar elementos ──
  var loginEl = document.createElement('div');
  loginEl.id = 'adminLogin';
  loginEl.innerHTML = '<div class="box"><h2>🔐 Painel Admin</h2><p>Entre para gerenciar o site</p><input type="text" id="adminUser" placeholder="Usuário" autocomplete="off"><input type="password" id="adminPass" placeholder="Senha"><button onclick="adminLogin()">Entrar</button><div class="error" id="adminLoginError">Usuário ou senha incorretos</div></div>';
  document.body.appendChild(loginEl);

  var panelEl = document.createElement('div');
  panelEl.id = 'adminPanel';
  panelEl.innerHTML = '<div class="admin-header"><h1>⚙️ Su Imobiliária — Admin</h1><div class="admin-actions"><a href="' + window.location.pathname.replace(/\/+$/,'') + '/" style="color:rgba(255,255,255,0.4);font-size:0.8rem;">Ver site →</a><button onclick="adminPublish()" class="btn-publish" id="adminPublishBtn">📦 Publicar no GitHub</button><button onclick="adminLogout()">Sair</button></div></div><div class="admin-body"><div class="admin-sidebar" id="adminSidebar"></div><div class="admin-content" id="adminContent"></div></div>';
  document.body.appendChild(panelEl);

  var toastEl = document.createElement('div');
  toastEl.id = 'adminToast';
  document.body.appendChild(toastEl);

  // ── Verificar login ──
  if (!ADMIN_LOGGED) {
    loginEl.classList.remove('hidden');
    panelEl.classList.remove('active');
    return;
  }
  loginEl.classList.add('hidden');
  panelEl.classList.add('active');
  document.body.classList.add('admin-mode');
  initAdminPanel();

  window.adminLogin = function() {
    var u = document.getElementById('adminUser').value;
    var p = document.getElementById('adminPass').value;
    if (u === ADMIN_USER && p === ADMIN_PASS) {
      sessionStorage.setItem('admin_logged', '1');
      loginEl.classList.add('hidden');
      panelEl.classList.add('active');
      document.body.classList.add('admin-mode');
      initAdminPanel();
    } else {
      document.getElementById('adminLoginError').style.display = 'block';
    }
  };

  window.adminLogout = function() {
    sessionStorage.removeItem('admin_logged');
    panelEl.classList.remove('active');
    loginEl.classList.remove('hidden');
    document.getElementById('adminUser').value = '';
    document.getElementById('adminPass').value = '';
    document.getElementById('adminLoginError').style.display = 'none';
    document.body.classList.remove('admin-mode');
  };

  window.adminToast = function(msg, type) {
    var t = document.getElementById('adminToast');
    t.textContent = msg;
    t.className = 'show ' + (type || 'info');
    clearTimeout(t._timeout);
    t._timeout = setTimeout(function() { t.classList.remove('show'); }, 3500);
  };

  // ── Dados editáveis (cópia de trabalho) ──
  var _data = null;

  function initAdminPanel() {
    _data = {
      constants: extractConstants(),
      STATS:        JSON.parse(JSON.stringify(window.STATS || [])),
      PROPERTIES:   JSON.parse(JSON.stringify(window.PROPERTIES || [])),
      EMPREENDIMENTOS: JSON.parse(JSON.stringify(window.EMPREENDIMENTOS || [])),
      FAQS:         JSON.parse(JSON.stringify(window.FAQS || [])),
      DEPOIMENTOS:  JSON.parse(JSON.stringify(window.DEPOIMENTOS || [])),
      PARCEIROS:    JSON.parse(JSON.stringify(window.PARCEIROS || [])),
      BLOG_POSTS:   JSON.parse(JSON.stringify(window.BLOG_POSTS || []))
    };
    buildSidebar();
    showTab('general');
  }

  function extractConstants() {
    var map = {};
    if (typeof WHATSAPP_NUMBER !== 'undefined') map.WHATSAPP_NUMBER = WHATSAPP_NUMBER;
    if (typeof WHATSAPP_DISPLAY !== 'undefined') map.WHATSAPP_DISPLAY = WHATSAPP_DISPLAY;
    if (typeof WHATSAPP_MSG !== 'undefined') map.WHATSAPP_MSG = WHATSAPP_MSG;
    if (typeof SITE_NAME !== 'undefined') map.SITE_NAME = SITE_NAME;
    if (typeof SITE_EMAIL !== 'undefined') map.SITE_EMAIL = SITE_EMAIL;
    if (typeof SITE_ADDRESS !== 'undefined') map.SITE_ADDRESS = SITE_ADDRESS;
    map.HERO_EYEBROW  = window.HERO_EYEBROW  || 'Seu lar começa aqui';
    map.HERO_TITLE    = window.HERO_TITLE    || 'Su Imobiliária';
    map.HERO_SUBTITLE = window.HERO_SUBTITLE || '';
    map.HERO_VIDEO    = window.HERO_VIDEO    || '';
    map.SECTION_SOBRE_EYEBROW   = window.SECTION_SOBRE_EYEBROW   || 'Quem somos';
    map.SECTION_SOBRE_TITLE     = window.SECTION_SOBRE_TITLE     || '';
    map.SECTION_COMPRAR_EYEBROW = window.SECTION_COMPRAR_EYEBROW || 'Imóveis à venda';
    map.SECTION_COMPRAR_TITLE   = window.SECTION_COMPRAR_TITLE   || '';
    map.SECTION_ALUGAR_EYEBROW  = window.SECTION_ALUGAR_EYEBROW  || 'Imóveis para alugar';
    map.SECTION_ALUGAR_TITLE    = window.SECTION_ALUGAR_TITLE    || '';
    map.SECTION_LANCAMENTOS_EYEBROW = window.SECTION_LANCAMENTOS_EYEBROW || 'Lançamentos';
    map.SECTION_LANCAMENTOS_TITLE   = window.SECTION_LANCAMENTOS_TITLE   || '';
    map.SECTION_CONTATO_EYEBROW = window.SECTION_CONTATO_EYEBROW || 'Fale conosco';
    map.SECTION_CONTATO_TITLE   = window.SECTION_CONTATO_TITLE   || '';
    map.DISABLED_SECTIONS = window.DISABLED_SECTIONS ? window.DISABLED_SECTIONS.slice() : [];
    map.SOCIAL = window.SOCIAL ? JSON.parse(JSON.stringify(window.SOCIAL)) : { instagram:'', facebook:'', youtube:'', linkedin:'' };
    map.PAGE_SIZE = window.PAGE_SIZE || 6;
    return map;
  }

  function buildSidebar() {
    var tabs = [
      { id:'general', label:'⚙️ Geral' },
      { id:'properties', label:'🏠 Imóveis' },
      { id:'empreendimentos', label:'🏗️ Lançamentos' },
      { id:'blog', label:'📝 Blog' },
      { id:'faq', label:'❓ FAQ' },
      { id:'depoimentos', label:'💬 Depoimentos' },
      { id:'parceiros', label:'🤝 Parceiros' },
      { id:'settings', label:'🔑 Config' }
    ];
    var sb = document.getElementById('adminSidebar');
    sb.innerHTML = '';
    tabs.forEach(function(t) {
      var btn = document.createElement('button');
      btn.textContent = t.label;
      btn.dataset.tab = t.id;
      btn.onclick = function() { showTab(t.id); };
      sb.appendChild(btn);
    });
  }

  window.showTab = function(id) {
    document.querySelectorAll('#adminSidebar button').forEach(function(b) { b.classList.remove('active'); });
    document.querySelectorAll('.admin-section').forEach(function(s) { s.classList.remove('active'); });
    var btn = document.querySelector('#adminSidebar button[data-tab="' + id + '"]');
    if (btn) btn.classList.add('active');
    var section = document.getElementById('adminSection_' + id);
    if (!section) renderTab(id);
    var el = document.getElementById('adminSection_' + id);
    if (el) el.classList.add('active');
  };

  function renderTab(id) {
    var container = document.getElementById('adminContent');
    var div = document.createElement('div');
    div.id = 'adminSection_' + id;
    div.className = 'admin-section';
    container.appendChild(div);
    switch (id) {
      case 'general': renderGeneral(div); break;
      case 'properties': renderProperties(div); break;
      case 'empreendimentos': renderEmpreendimentos(div); break;
      case 'blog': renderBlog(div); break;
      case 'faq': renderFaq(div); break;
      case 'depoimentos': renderDepoimentos(div); break;
      case 'parceiros': renderParceiros(div); break;
      case 'settings': renderSettings(div); break;
    }
  }

  /* =================================================================
     GENERAL SETTINGS
     ================================================================= */
  function renderGeneral(container) {
    var c = _data.constants;
    container.innerHTML = '<h2>⚙️ Configurações Gerais</h2><p class="desc">Texto do site, redes sociais e seções visíveis.</p>'
      + '<div class="admin-settings">'
      + '<label>Nome do site</label><input id="cfg_siteName" value="' + esc(c.SITE_NAME) + '">'
      + '<label>WhatsApp — Número (só dígitos)</label><input id="cfg_whatsNum" value="' + esc(c.WHATSAPP_NUMBER) + '">'
      + '<label>WhatsApp — Display</label><input id="cfg_whatsDisp" value="' + esc(c.WHATSAPP_DISPLAY) + '">'
      + '<label>WhatsApp — Mensagem padrão (use {titulo} e {preco})</label><textarea id="cfg_whatsMsg" rows="2">' + esc(c.WHATSAPP_MSG) + '</textarea>'
      + '<label>Email</label><input id="cfg_email" value="' + esc(c.SITE_EMAIL) + '">'
      + '<label>Endereço</label><input id="cfg_address" value="' + esc(c.SITE_ADDRESS) + '">'
      + '<hr style="border-color:rgba(255,255,255,0.06);margin:1rem 0;">'
      + '<label>Hero — Eyebrow</label><input id="cfg_heroEye" value="' + esc(c.HERO_EYEBROW) + '">'
      + '<label>Hero — Título</label><textarea id="cfg_heroTitle" rows="2">' + esc(c.HERO_TITLE) + '</textarea>'
      + '<label>Hero — Subtítulo</label><textarea id="cfg_heroSub" rows="2">' + esc(c.HERO_SUBTITLE) + '</textarea>'
      + '<label>Hero — URL do vídeo MP4 (opcional)</label><input id="cfg_heroVideo" value="' + esc(c.HERO_VIDEO) + '" placeholder="https://...mp4">'
      + '<hr style="border-color:rgba(255,255,255,0.06);margin:1rem 0;">'
      + '<label>Instagram (URL)</label><input id="cfg_ig" value="' + esc(c.SOCIAL.instagram || '') + '">'
      + '<label>Facebook (URL)</label><input id="cfg_fb" value="' + esc(c.SOCIAL.facebook || '') + '">'
      + '<label>YouTube (URL)</label><input id="cfg_yt" value="' + esc(c.SOCIAL.youtube || '') + '">'
      + '<label>LinkedIn (URL)</label><input id="cfg_li" value="' + esc(c.SOCIAL.linkedin || '') + '">'
      + '<hr style="border-color:rgba(255,255,255,0.06);margin:1rem 0;">'
      + '<label>Seções desabilitadas (IDs separados por vírgula)</label><input id="cfg_disabled" value="' + esc((c.DISABLED_SECTIONS||[]).join(', ')) + '">'
      + '<div class="note">Disponíveis: sobre, stats, servicos, depoimentos, parceiros, faq, financiamento, alugar, favoritos</div>'
      + '<label>Imóveis por página</label><input id="cfg_pageSize" value="' + (c.PAGE_SIZE || 6) + '" style="max-width:100px;">'
      + '<hr style="border-color:rgba(255,255,255,0.06);margin:1rem 0;">'
      + '<button class="btn-save" onclick="saveGeneral()">💾 Salvar alterações</button>'
      + '</div>';
  }

  window.saveGeneral = function() {
    var c = _data.constants;
    c.SITE_NAME = gv('cfg_siteName');
    c.WHATSAPP_NUMBER = gv('cfg_whatsNum');
    c.WHATSAPP_DISPLAY = gv('cfg_whatsDisp');
    c.WHATSAPP_MSG = gv('cfg_whatsMsg');
    c.SITE_EMAIL = gv('cfg_email');
    c.SITE_ADDRESS = gv('cfg_address');
    c.HERO_EYEBROW = gv('cfg_heroEye');
    c.HERO_TITLE = gv('cfg_heroTitle');
    c.HERO_SUBTITLE = gv('cfg_heroSub');
    c.HERO_VIDEO = gv('cfg_heroVideo');
    c.SOCIAL.instagram = gv('cfg_ig');
    c.SOCIAL.facebook = gv('cfg_fb');
    c.SOCIAL.youtube = gv('cfg_yt');
    c.SOCIAL.linkedin = gv('cfg_li');
    c.DISABLED_SECTIONS = gv('cfg_disabled').split(',').map(function(s){ return s.trim(); }).filter(Boolean);
    c.PAGE_SIZE = parseInt(gv('cfg_pageSize')) || 6;
    adminToast('✅ Configurações salvas. Não esqueça de publicar!', 'success');
  };

  /* =================================================================
     PROPERTIES
     ================================================================= */
  function renderProperties(container) {
    var html = '<h2>🏠 Imóveis (' + _data.PROPERTIES.length + ')</h2><p class="desc">Lista de imóveis para venda e aluguel.</p>';
    html += '<button class="btn-add" onclick="addProperty()">+ Novo Imóvel</button>';
    html += '<table class="admin-table"><thead><tr><th>Título</th><th>Tipo</th><th>Preço</th><th>Local</th><th>Status</th><th class="actions">Ações</th></tr></thead><tbody>';
    _data.PROPERTIES.forEach(function(p, i) {
      html += '<tr><td>' + esc(p.title) + '</td><td>' + esc(p.type === 'sale' ? 'Venda' : 'Aluguel') + '</td><td>' + esc(p.price) + '</td><td>' + esc(p.location) + '</td><td>' + esc(p.status || 'disponivel') + '</td>'
        + '<td class="actions"><button onclick="editProperty(' + i + ')">✏️</button><button class="btn-del" onclick="delProperty(' + i + ')">🗑️</button></td></tr>';
    });
    html += '</tbody></table>';
    container.innerHTML = html;
  }

  window.addProperty = function() {
    _data.PROPERTIES.push({
      id: 'prop-' + Date.now(),
      type: 'sale', category: 'Apartamento', title: 'Novo Imóvel', price: 'R$ 0',
      priceNum: 0, location: 'Balneário Camboriú', status: 'disponivel',
      desc: '', beds: 1, baths: 1, garage: 1, area: 50,
      img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80'],
      video: '', features: [''],
      description: '', maps: '', lat: -26.99, lng: -48.63
    });
    editProperty(_data.PROPERTIES.length - 1);
  };

  window.editProperty = function(idx) {
    var p = _data.PROPERTIES[idx];
    if (!p) return;
    openModal('✏️ Editar Imóvel',
      '<div class="row2"><div><label>Título</label><input id="prop_title" value="' + esc(p.title) + '"></div>'
      + '<div><label>ID (único)</label><input id="prop_id" value="' + esc(p.id) + '"></div></div>'
      + '<div class="row3"><div><label>Tipo</label><select id="prop_type"><option value="sale"' + (p.type==='sale'?' selected':'') + '>Venda</option><option value="rent"' + (p.type==='rent'?' selected':'') + '>Aluguel</option></select></div>'
      + '<div><label>Categoria</label><select id="prop_cat"><option value="Apartamento"' + (p.category==='Apartamento'?' selected':'') + '>Apartamento</option><option value="Casa"' + (p.category==='Casa'?' selected':'') + '>Casa</option><option value="Cobertura"' + (p.category==='Cobertura'?' selected':'') + '>Cobertura</option><option value="Kitnet/Studio"' + (p.category==='Kitnet/Studio'?' selected':'') + '>Kitnet/Studio</option><option value="Comercial"' + (p.category==='Comercial'?' selected':'') + '>Comercial</option><option value="Terreno"' + (p.category==='Terreno'?' selected':'') + '>Terreno</option></select></div>'
      + '<div><label>Status</label><select id="prop_status"><option value="disponivel"' + ((p.status||'disponivel')==='disponivel'?' selected':'') + '>Disponível</option><option value="vendido"' + (p.status==='vendido'?' selected':'') + '>Vendido</option><option value="locado"' + (p.status==='locado'?' selected':'') + '>Locado</option></select></div></div>'
      + '<div class="row3"><div><label>Preço (texto)</label><input id="prop_price" value="' + esc(p.price) + '"></div>'
      + '<div><label>Preço (número)</label><input id="prop_priceNum" type="number" value="' + (p.priceNum||0) + '"></div>'
      + '<div><label>Área (m²)</label><input id="prop_area" type="number" value="' + (p.area||0) + '"></div></div>'
      + '<div class="row3"><div><label>Quartos</label><input id="prop_beds" type="number" value="' + (p.beds||0) + '"></div>'
      + '<div><label>Banheiros</label><input id="prop_baths" type="number" value="' + (p.baths||0) + '"></div>'
      + '<div><label>Vagas</label><input id="prop_garage" type="number" value="' + (p.garage||0) + '"></div></div>'
      + '<label>Localização</label><input id="prop_loc" value="' + esc(p.location) + '">'
      + '<div class="row2"><div><label>Latitude</label><input id="prop_lat" type="number" step="any" value="' + (p.lat||'') + '"></div>'
      + '<div><label>Longitude</label><input id="prop_lng" type="number" step="any" value="' + (p.lng||'') + '"></div></div>'
      + '<label>URL do Maps</label><input id="prop_maps" value="' + esc(p.maps||'') + '">'
      + '<label>Descrição curta (card)</label><textarea id="prop_desc" rows="2">' + esc(p.desc||'') + '</textarea>'
      + '<label>Descrição longa (detalhes)</label><textarea id="prop_description" rows="4">' + esc(p.description||'') + '</textarea>'
      + '<label>URL da imagem principal</label><input id="prop_img" value="' + esc(p.img) + '">'
      + '<label>URL do vídeo YouTube embed</label><input id="prop_video" value="' + esc(p.video||'') + '">'
      + '<label>Galeria (URLs, uma por linha)</label><textarea id="prop_gallery" rows="3">' + ((p.gallery||[]).join('\n')) + '</textarea>'
      + '<label>Características (uma por linha)</label><textarea id="prop_features" rows="4">' + ((p.features||[]).join('\n')) + '</textarea>',
      function() {
        p.title = gv('prop_title');
        p.id = gv('prop_id');
        p.type = gv('prop_type');
        p.category = gv('prop_cat');
        p.status = gv('prop_status');
        p.price = gv('prop_price');
        p.priceNum = parseFloat(gv('prop_priceNum')) || 0;
        p.area = parseInt(gv('prop_area')) || 0;
        p.beds = parseInt(gv('prop_beds')) || 0;
        p.baths = parseInt(gv('prop_baths')) || 0;
        p.garage = parseInt(gv('prop_garage')) || 0;
        p.location = gv('prop_loc');
        p.lat = parseFloat(gv('prop_lat')) || undefined;
        p.lng = parseFloat(gv('prop_lng')) || undefined;
        p.maps = gv('prop_maps');
        p.desc = gv('prop_desc');
        p.description = gv('prop_description');
        p.img = gv('prop_img');
        p.video = gv('prop_video');
        p.gallery = gv('prop_gallery').split('\n').map(function(s){ return s.trim(); }).filter(Boolean);
        p.features = gv('prop_features').split('\n').map(function(s){ return s.trim(); }).filter(Boolean);
        adminToast('✅ Imóvel salvo', 'success');
        renderProperties(document.getElementById('adminSection_properties'));
      }
    );
  };

  window.delProperty = function(idx) {
    if (!confirm('Excluir "' + _data.PROPERTIES[idx].title + '"?')) return;
    _data.PROPERTIES.splice(idx, 1);
    renderProperties(document.getElementById('adminSection_properties'));
    adminToast('🗑️ Imóvel removido', 'info');
  };

  /* =================================================================
     EMPREENDIMENTOS
     ================================================================= */
  function renderEmpreendimentos(container) {
    var html = '<h2>🏗️ Lançamentos (' + _data.EMPREENDIMENTOS.length + ')</h2><p class="desc">Empreendimentos exclusivos.</p>';
    html += '<button class="btn-add" onclick="addEmp()">+ Novo Lançamento</button>';
    html += '<table class="admin-table"><thead><tr><th>Título</th><th>Preço</th><th>Progresso</th><th class="actions">Ações</th></tr></thead><tbody>';
    _data.EMPREENDIMENTOS.forEach(function(e, i) {
      html += '<tr><td>' + esc(e.title) + '</td><td>' + esc(e.price) + '</td><td>' + (e.progress || 0) + '%</td>'
        + '<td class="actions"><button onclick="editEmp(' + i + ')">✏️</button><button class="btn-del" onclick="delEmp(' + i + ')">🗑️</button></td></tr>';
    });
    html += '</tbody></table>';
    container.innerHTML = html;
  }

  window.addEmp = function() {
    _data.EMPREENDIMENTOS.push({
      id: 'emp-' + Date.now(),
      title: 'Novo Lançamento', location: 'Balneário Camboriú — SC',
      price: 'A partir de R$ 0', priceNum: 0, status: 'lancamento',
      description: '', img: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80'],
      video: '', tags: ['LANÇAMENTO'], progress: 0, progressLabel: '0%',
      delivery: '', plants: [], timeline: [], amenities: [], prices: [], payment: [],
      lat: -26.99, lng: -48.63
    });
    editEmp(_data.EMPREENDIMENTOS.length - 1);
  };

  window.editEmp = function(idx) {
    var e = _data.EMPREENDIMENTOS[idx];
    if (!e) return;
    openModal('✏️ Editar Lançamento',
      '<div class="row2"><div><label>Título</label><input id="emp_title" value="' + esc(e.title) + '"></div>'
      + '<div><label>ID</label><input id="emp_id" value="' + esc(e.id) + '"></div></div>'
      + '<div class="row2"><div><label>Preço (texto)</label><input id="emp_price" value="' + esc(e.price) + '"></div>'
      + '<div><label>Preço (número)</label><input id="emp_priceNum" type="number" value="' + (e.priceNum||0) + '"></div></div>'
      + '<label>Localização</label><input id="emp_loc" value="' + esc(e.location) + '">'
      + '<label>Descrição</label><textarea id="emp_desc" rows="4">' + esc(e.description || '') + '</textarea>'
      + '<label>URL da imagem principal</label><input id="emp_img" value="' + esc(e.img) + '">'
      + '<label>URL do vídeo YouTube embed</label><input id="emp_video" value="' + esc(e.video||'') + '">'
      + '<div class="row2"><div><label>Progresso (%)</label><input id="emp_prog" type="number" value="' + (e.progress||0) + '"></div>'
      + '<div><label>Label do progresso</label><input id="emp_progLabel" value="' + esc(e.progressLabel||'') + '"></div></div>'
      + '<label>Previsão de entrega</label><input id="emp_delivery" value="' + esc(e.delivery||'') + '">'
      + '<label>Tags (separadas por vírgula)</label><input id="emp_tags" value="' + esc((e.tags||[]).join(', ')) + '">'
      + '<label>Galeria (URLs, uma por linha)</label><textarea id="emp_gallery" rows="3">' + ((e.gallery||[]).join('\n')) + '</textarea>'
      + '<label>Comodidades (uma por linha)</label><textarea id="emp_amenities" rows="4">' + ((e.amenities||[]).join('\n')) + '</textarea>',
      function() {
        e.title = gv('emp_title');
        e.id = gv('emp_id');
        e.price = gv('emp_price');
        e.priceNum = parseFloat(gv('emp_priceNum')) || 0;
        e.location = gv('emp_loc');
        e.description = gv('emp_desc');
        e.img = gv('emp_img');
        e.video = gv('emp_video');
        e.progress = parseInt(gv('emp_prog')) || 0;
        e.progressLabel = gv('emp_progLabel');
        e.delivery = gv('emp_delivery');
        e.tags = gv('emp_tags').split(',').map(function(s){ return s.trim(); }).filter(Boolean);
        e.gallery = gv('emp_gallery').split('\n').map(function(s){ return s.trim(); }).filter(Boolean);
        e.amenities = gv('emp_amenities').split('\n').map(function(s){ return s.trim(); }).filter(Boolean);
        adminToast('✅ Lançamento salvo', 'success');
        renderEmpreendimentos(document.getElementById('adminSection_empreendimentos'));
      }
    );
  };

  window.delEmp = function(idx) {
    if (!confirm('Excluir "' + _data.EMPREENDIMENTOS[idx].title + '"?')) return;
    _data.EMPREENDIMENTOS.splice(idx, 1);
    renderEmpreendimentos(document.getElementById('adminSection_empreendimentos'));
    adminToast('🗑️ Lançamento removido', 'info');
  };

  /* =================================================================
     BLOG
     ================================================================= */
  function renderBlog(container) {
    var html = '<h2>📝 Blog (' + _data.BLOG_POSTS.length + ')</h2><p class="desc">Posts do blog.</p>';
    html += '<button class="btn-add" onclick="addPost()">+ Novo Post</button>';
    html += '<table class="admin-table"><thead><tr><th>Título</th><th>Data</th><th>Categoria</th><th class="actions">Ações</th></tr></thead><tbody>';
    _data.BLOG_POSTS.forEach(function(b, i) {
      html += '<tr><td>' + esc(b.title) + '</td><td>' + esc(b.date) + '</td><td>' + esc(b.category) + '</td>'
        + '<td class="actions"><button onclick="editPost(' + i + ')">✏️</button><button class="btn-del" onclick="delPost(' + i + ')">🗑️</button></td></tr>';
    });
    html += '</tbody></table>';
    container.innerHTML = html;
  }

  window.addPost = function() {
    _data.BLOG_POSTS.push({
      id: 'post-' + Date.now(),
      title: 'Novo Post', date: new Date().toLocaleDateString('pt-BR'),
      category: 'Dicas', author: 'Su Imobiliária',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
      excerpt: '', content: ''
    });
    editPost(_data.BLOG_POSTS.length - 1);
  };

  window.editPost = function(idx) {
    var b = _data.BLOG_POSTS[idx];
    if (!b) return;
    openModal('✏️ Editar Post',
      '<div class="row2"><div><label>Título</label><input id="post_title" value="' + esc(b.title) + '"></div>'
      + '<div><label>ID</label><input id="post_id" value="' + esc(b.id) + '"></div></div>'
      + '<div class="row3"><div><label>Data</label><input id="post_date" value="' + esc(b.date) + '"></div>'
      + '<div><label>Categoria</label><input id="post_cat" value="' + esc(b.category) + '"></div>'
      + '<div><label>Autor</label><input id="post_author" value="' + esc(b.author||'') + '"></div></div>'
      + '<label>URL da imagem</label><input id="post_img" value="' + esc(b.image) + '">'
      + '<label>Resumo (excerpt)</label><textarea id="post_excerpt" rows="2">' + esc(b.excerpt||'') + '</textarea>'
      + '<label>Conteúdo completo (use ## para subtítulos, \\n\\n para parágrafos)</label><textarea id="post_content" rows="8">' + esc(b.content) + '</textarea>',
      function() {
        b.title = gv('post_title');
        b.id = gv('post_id');
        b.date = gv('post_date');
        b.category = gv('post_cat');
        b.author = gv('post_author');
        b.image = gv('post_img');
        b.excerpt = gv('post_excerpt');
        b.content = gv('post_content');
        adminToast('✅ Post salvo', 'success');
        renderBlog(document.getElementById('adminSection_blog'));
      }
    );
  };

  window.delPost = function(idx) {
    if (!confirm('Excluir "' + _data.BLOG_POSTS[idx].title + '"?')) return;
    _data.BLOG_POSTS.splice(idx, 1);
    renderBlog(document.getElementById('adminSection_blog'));
    adminToast('🗑️ Post removido', 'info');
  };

  /* =================================================================
     FAQ
     ================================================================= */
  function renderFaq(container) {
    var html = '<h2>❓ FAQ (' + _data.FAQS.length + ')</h2><p class="desc">Perguntas frequentes.</p>';
    html += '<button class="btn-add" onclick="addFaq()">+ Nova Pergunta</button>';
    html += '<table class="admin-table"><thead><tr><th>Pergunta</th><th class="actions">Ações</th></tr></thead><tbody>';
    _data.FAQS.forEach(function(f, i) {
      html += '<tr><td>' + esc(f.q) + '</td>'
        + '<td class="actions"><button onclick="editFaq(' + i + ')">✏️</button><button class="btn-del" onclick="delFaq(' + i + ')">🗑️</button></td></tr>';
    });
    html += '</tbody></table>';
    container.innerHTML = html;
  }

  window.addFaq = function() {
    _data.FAQS.push({ q: 'Nova pergunta', a: 'Resposta...' });
    editFaq(_data.FAQS.length - 1);
  };

  window.editFaq = function(idx) {
    var f = _data.FAQS[idx];
    openModal('✏️ Editar FAQ',
      '<label>Pergunta</label><input id="faq_q" value="' + esc(f.q) + '">'
      + '<label>Resposta</label><textarea id="faq_a" rows="4">' + esc(f.a) + '</textarea>',
      function() {
        f.q = gv('faq_q');
        f.a = gv('faq_a');
        adminToast('✅ FAQ salva', 'success');
        renderFaq(document.getElementById('adminSection_faq'));
      }
    );
  };

  window.delFaq = function(idx) {
    if (!confirm('Excluir esta pergunta?')) return;
    _data.FAQS.splice(idx, 1);
    renderFaq(document.getElementById('adminSection_faq'));
    adminToast('🗑️ FAQ removida', 'info');
  };

  /* =================================================================
     DEPOIMENTOS
     ================================================================= */
  function renderDepoimentos(container) {
    var html = '<h2>💬 Depoimentos (' + _data.DEPOIMENTOS.length + ')</h2><p class="desc">Depoimentos de clientes.</p>';
    html += '<button class="btn-add" onclick="addDep()">+ Novo Depoimento</button>';
    html += '<table class="admin-table"><thead><tr><th>Nome</th><th>Texto</th><th class="actions">Ações</th></tr></thead><tbody>';
    _data.DEPOIMENTOS.forEach(function(d, i) {
      html += '<tr><td>' + esc(d.name) + '</td><td>' + esc(d.text.substring(0, 60)) + '...</td>'
        + '<td class="actions"><button onclick="editDep(' + i + ')">✏️</button><button class="btn-del" onclick="delDep(' + i + ')">🗑️</button></td></tr>';
    });
    html += '</tbody></table>';
    container.innerHTML = html;
  }

  window.addDep = function() {
    _data.DEPOIMENTOS.push({ text: '', name: 'Novo Cliente', role: '' });
    editDep(_data.DEPOIMENTOS.length - 1);
  };

  window.editDep = function(idx) {
    var d = _data.DEPOIMENTOS[idx];
    openModal('✏️ Editar Depoimento',
      '<label>Nome</label><input id="dep_name" value="' + esc(d.name) + '">'
      + '<label>Descrição (ex: Compradora • Apartamento • BC)</label><input id="dep_role" value="' + esc(d.role||'') + '">'
      + '<label>Texto</label><textarea id="dep_text" rows="4">' + esc(d.text) + '</textarea>',
      function() {
        d.name = gv('dep_name');
        d.role = gv('dep_role');
        d.text = gv('dep_text');
        adminToast('✅ Depoimento salvo', 'success');
        renderDepoimentos(document.getElementById('adminSection_depoimentos'));
      }
    );
  };

  window.delDep = function(idx) {
    if (!confirm('Excluir depoimento de "' + _data.DEPOIMENTOS[idx].name + '"?')) return;
    _data.DEPOIMENTOS.splice(idx, 1);
    renderDepoimentos(document.getElementById('adminSection_depoimentos'));
    adminToast('🗑️ Depoimento removido', 'info');
  };

  /* =================================================================
     PARCEIROS
     ================================================================= */
  function renderParceiros(container) {
    var html = '<h2>🤝 Parceiros (' + _data.PARCEIROS.length + ')</h2><p class="desc">Instituições parceiras.</p>';
    html += '<button class="btn-add" onclick="addParceiro()">+ Novo Parceiro</button>';
    html += '<table class="admin-table"><thead><tr><th>Nome</th><th>URL</th><th class="actions">Ações</th></tr></thead><tbody>';
    _data.PARCEIROS.forEach(function(p, i) {
      html += '<tr><td>' + esc(p.name) + '</td><td>' + esc(p.url) + '</td>'
        + '<td class="actions"><button onclick="editParceiro(' + i + ')">✏️</button><button class="btn-del" onclick="delParceiro(' + i + ')">🗑️</button></td></tr>';
    });
    html += '</tbody></table>';
    container.innerHTML = html;
  }

  window.addParceiro = function() {
    _data.PARCEIROS.push({ name: 'Novo Parceiro', img: '', url: '' });
    editParceiro(_data.PARCEIROS.length - 1);
  };

  window.editParceiro = function(idx) {
    var p = _data.PARCEIROS[idx];
    openModal('✏️ Editar Parceiro',
      '<label>Nome</label><input id="par_name" value="' + esc(p.name) + '">'
      + '<label>URL do logo</label><input id="par_img" value="' + esc(p.img||'') + '">'
      + '<label>Site</label><input id="par_url" value="' + esc(p.url||'') + '">',
      function() {
        p.name = gv('par_name');
        p.img = gv('par_img');
        p.url = gv('par_url');
        adminToast('✅ Parceiro salvo', 'success');
        renderParceiros(document.getElementById('adminSection_parceiros'));
      }
    );
  };

  window.delParceiro = function(idx) {
    if (!confirm('Excluir "' + _data.PARCEIROS[idx].name + '"?')) return;
    _data.PARCEIROS.splice(idx, 1);
    renderParceiros(document.getElementById('adminSection_parceiros'));
    adminToast('🗑️ Parceiro removido', 'info');
  };

  /* =================================================================
     SETTINGS (GitHub Token)
     ================================================================= */
  function renderSettings(container) {
    container.innerHTML = '<h2>🔑 Configurações Avançadas</h2><p class="desc">Token do GitHub para publicar as alterações automaticamente.</p>'
      + '<div class="admin-settings">'
      + '<label>GitHub Personal Access Token</label>'
      + '<input id="cfg_token" type="password" value="' + esc(ADMIN_TOKEN) + '" placeholder="ghp_... ou github_pat_...">'
      + '<div class="note">Crie em <a href="https://github.com/settings/tokens" target="_blank" style="color:#d4af37;">github.com/settings/tokens</a> com permissão <strong>repo</strong> (ou public_repo). Fica salvo só no seu navegador.</div>'
      + '<button class="btn-save" onclick="saveToken()">💾 Salvar Token</button>'
      + '<hr style="border-color:rgba(255,255,255,0.06);margin:1.5rem 0;">'
      + '<h3 style="color:#d4af37;font-size:0.95rem;margin:0 0 0.5rem;">📦 Publicar no GitHub</h3>'
      + '<p style="color:rgba(255,255,255,0.5);font-size:0.82rem;margin:0 0 0.75rem;">Depois de editar os dados, clique no botão "Publicar no GitHub" no topo da página. Isso faz um commit direto no repositório e o site atualiza em minutos.</p>'
      + '<hr style="border-color:rgba(255,255,255,0.06);margin:1.5rem 0;">'
      + '<h3 style="color:#d4af37;font-size:0.95rem;margin:0 0 0.5rem;">🔒 Desabilitar Painel</h3>'
      + '<p style="color:rgba(255,255,255,0.5);font-size:0.82rem;margin:0;">Para desligar o painel, mude <code style="background:rgba(255,255,255,0.06);padding:0.1rem 0.3rem;border-radius:3px;">ADMIN_ENABLED = false</code> no arquivo <code style="background:rgba(255,255,255,0.06);padding:0.1rem 0.3rem;border-radius:3px;">js/admin.js</code> (linha 3) e publique.</p>'
      + '</div>';
  }

  window.saveToken = function() {
    var token = document.getElementById('cfg_token').value.trim();
    localStorage.setItem('admin_github_token', token);
    ADMIN_TOKEN = token;
    adminToast('✅ Token salvo no navegador', 'success');
  };

  /* =================================================================
     GitHub PUBLISH
     ================================================================= */
  window.adminPublish = function() {
    var token = ADMIN_TOKEN;
    if (!token) {
      adminToast('❌ Primeiro salve seu GitHub Token na aba "Config"', 'error');
      showTab('settings');
      return;
    }

    var btn = document.getElementById('adminPublishBtn');
    btn.textContent = '⏳ Publicando...';
    btn.disabled = true;

    // Generate data.js content
    var content = generateDataJs();

    // GitHub API: GET current file to get SHA
    var apiUrl = 'https://api.github.com/repos/' + GITHUB_REPO + '/contents/' + GITHUB_PATH;

    fetch(apiUrl + '?ref=' + GITHUB_BRANCH, {
      headers: { 'Authorization': 'token ' + token, 'Accept': 'application/vnd.github.v3+json' }
    })
    .then(function(r) { return r.json(); })
    .then(function(file) {
      var sha = file.sha;
      var encoded = btoa(unescape(encodeURIComponent(content)));

      return fetch(apiUrl, {
        method: 'PUT',
        headers: { 'Authorization': 'token ' + token, 'Accept': 'application/vnd.github.v3+json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'Admin: atualização de dados',
          content: encoded,
          sha: sha,
          branch: GITHUB_BRANCH
        })
      });
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
      if (res.content) {
        adminToast('✅ Publicado com sucesso! O site atualiza em ~1-2 min.', 'success');
      } else {
        adminToast('❌ Erro: ' + (res.message || 'desconhecido'), 'error');
      }
    })
    .catch(function(err) {
      adminToast('❌ Erro de conexão: ' + err.message, 'error');
    })
    .finally(function() {
      btn.textContent = '📦 Publicar no GitHub';
      btn.disabled = false;
    });
  };

  function generateDataJs() {
    var c = _data.constants;
    // Helper: serialize a value to JS format
    function jsVal(v, indent) {
      var sp = '  ';
      if (v === null || v === undefined) return 'null';
      if (typeof v === 'string') return JSON.stringify(v);
      if (typeof v === 'number' || typeof v === 'boolean') return String(v);
      if (Array.isArray(v)) {
        if (v.length === 0) return '[]';
        var items = v.map(function(item) { return sp + indent + jsVal(item, indent + 1); });
        return '[\n' + items.join(',\n') + '\n' + indent + ']';
      }
      if (typeof v === 'object') {
        var keys = Object.keys(v);
        if (keys.length === 0) return '{}';
        var pairs = keys.map(function(k) {
          var val = jsVal(v[k], indent + 1);
          return sp + indent + k + ': ' + val;
        });
        return '{\n' + pairs.join(',\n') + '\n' + indent + '}';
      }
      return String(v);
    }

    function arrToJs(name, arr, indent) {
      var sp = indent || '';
      return '\n' + sp + 'const ' + name + ' = ' + jsVal(arr, sp + '') + ';\n';
    }

    function strConst(name, val) {
      return 'const ' + name + ' = ' + JSON.stringify(val) + ';\n';
    }

    function strExpr(name, expr) {
      return 'const ' + name + ' = ' + expr + ';\n';
    }

    var out = '/* ===================================================================\n';
    out += '   CONFIGURAÇÃO DO SITE — GERADO PELO PAINEL ADMIN\n';
    out += '   =================================================================== */\n\n';

    out += strConst('WHATSAPP_NUMBER', c.WHATSAPP_NUMBER || '');
    out += strConst('WHATSAPP_DISPLAY', c.WHATSAPP_DISPLAY || '');
    out += strExpr('WHATSAPP_URL', '"https://wa.me/" + WHATSAPP_NUMBER');
    out += strConst('WHATSAPP_MSG', c.WHATSAPP_MSG || '');
    out += '\n';
    out += strConst('SITE_NAME', c.SITE_NAME || '');
    out += strConst('SITE_LOGO', '');
    out += strConst('LOGO_MAX_HEIGHT', '2rem');
    out += strConst('LOGO_MAX_WIDTH', '200px');
    out += strConst('LOGO_MARGIN', '0');
    out += strConst('SITE_EMAIL', c.SITE_EMAIL || '');
    out += strConst('SITE_URL', 'https://suimobiliaria.com.br');
    out += strConst('SITE_ADDRESS', c.SITE_ADDRESS || '');
    out += strConst('SITE_MAPS', '');
    out += strConst('SITE_CITY', 'Balneário Camboriú');
    out += strConst('SITE_REGION', 'SC');
    out += '\n';
    out += strConst('SECTION_PARCEIROS_EYEBROW', 'Parceiros');
    out += strConst('SECTION_PARCEIROS_TITLE', 'Instituições que confiam em nós');
    out += '\n';
    out += strConst('HERO_EYEBROW', c.HERO_EYEBROW || '');
    out += strConst('HERO_TITLE', c.HERO_TITLE || '');
    out += strConst('HERO_SUBTITLE', c.HERO_SUBTITLE || '');
    out += '\n';
    out += strConst('SECTION_SOBRE_EYEBROW', c.SECTION_SOBRE_EYEBROW || 'Quem somos');
    out += strConst('SECTION_SOBRE_TITLE', c.SECTION_SOBRE_TITLE || '');
    out += strConst('SECTION_COMPRAR_EYEBROW', c.SECTION_COMPRAR_EYEBROW || 'Imóveis à venda');
    out += strConst('SECTION_COMPRAR_TITLE', c.SECTION_COMPRAR_TITLE || '');
    out += strConst('SECTION_ALUGAR_EYEBROW', c.SECTION_ALUGAR_EYEBROW || 'Imóveis para alugar');
    out += strConst('SECTION_ALUGAR_TITLE', c.SECTION_ALUGAR_TITLE || '');
    out += strConst('SECTION_LANCAMENTOS_EYEBROW', c.SECTION_LANCAMENTOS_EYEBROW || 'Lançamentos');
    out += strConst('SECTION_LANCAMENTOS_TITLE', c.SECTION_LANCAMENTOS_TITLE || '');
    out += strConst('SECTION_SERVICOS_EYEBROW', 'Serviços');
    out += strConst('SECTION_SERVICOS_TITLE', 'Tudo que você precisa em um só lugar');
    out += strConst('SECTION_DEPOIMENTOS_EYEBROW', 'Depoimentos');
    out += strConst('SECTION_DEPOIMENTOS_TITLE', 'O que nossos clientes dizem');
    out += strConst('SECTION_FAQ_EYEBROW', 'FAQ');
    out += strConst('SECTION_FAQ_TITLE', 'Perguntas frequentes');
    out += strConst('SECTION_FINANCIAMENTO_EYEBROW', 'Financiamento');
    out += strConst('SECTION_FINANCIAMENTO_TITLE', 'Simule seu financiamento imobiliário');
    out += strConst('SECTION_CONTATO_EYEBROW', c.SECTION_CONTATO_EYEBROW || 'Fale conosco');
    out += strConst('SECTION_CONTATO_TITLE', c.SECTION_CONTATO_TITLE || '');
    out += strConst('SECTION_MAPA_EYEBROW', 'Mapa de Imóveis');
    out += strConst('SECTION_MAPA_TITLE', 'Encontre no mapa');
    out += strConst('SECTION_BLOG_EYEBROW', 'Blog');
    out += strConst('SECTION_BLOG_TITLE', 'Últimas do blog');
    out += strConst('SECTION_FAVORITOS_EYEBROW', 'Favoritos');
    out += strConst('SECTION_FAVORITOS_TITLE', 'Meus imóveis favoritos');
    out += strConst('SECTION_FAVORITOS_EMPTY', 'Nenhum imóvel favoritado ainda.');

    out += '\n/* ===== STATS ===== */\n';
    out += arrToJs('STATS', _data.STATS);
    out += '\nconst HERO_IMAGES = [\n  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",\n  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",\n  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80"\n];\n';
    out += strConst('HERO_VIDEO', c.HERO_VIDEO || '');
    out += '\nconst DISABLED_SECTIONS = ' + JSON.stringify(c.DISABLED_SECTIONS || []) + ';\n';
    out += '\nconst SOCIAL = ' + JSON.stringify(c.SOCIAL || {}) + ';\n';
    out += '\nconst PAGE_SIZE = ' + (c.PAGE_SIZE || 6) + ';\n';
    out += '\nconst ENABLE_DROPDOWN_MENU = true;\n';

    out += '\n/* ===== PROPERTIES ===== */\n';
    out += arrToJs('PROPERTIES', _data.PROPERTIES);
    out += '\n/* ===== EMPREENDIMENTOS ===== */\n';
    out += arrToJs('EMPREENDIMENTOS', _data.EMPREENDIMENTOS);
    out += '\n/* ===== FAQS ===== */\n';
    out += arrToJs('FAQS', _data.FAQS);
    out += '\n/* ===== DEPOIMENTOS ===== */\n';
    out += arrToJs('DEPOIMENTOS', _data.DEPOIMENTOS);
    out += '\n/* ===== PARCEIROS ===== */\n';
    out += arrToJs('PARCEIROS', _data.PARCEIROS);
    out += '\n/* ===== BLOG_POSTS ===== */\n';
    out += arrToJs('BLOG_POSTS', _data.BLOG_POSTS);

    return out;
  }

  /* =================================================================
     HELPERS
     ================================================================= */
  function gv(id) {
    var el = document.getElementById(id);
    return el ? el.value : '';
  }

  function esc(s) {
    if (typeof s !== 'string') s = String(s || '');
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  function openModal(title, bodyHtml, onSave) {
    var existing = document.querySelector('.admin-modal');
    if (existing) existing.remove();
    var modal = document.createElement('div');
    modal.className = 'admin-modal active';
    modal.innerHTML = '<div class="modal-box"><h3>' + title + '</h3>' + bodyHtml
      + '<div class="modal-actions"><button class="btn-cancel" onclick="closeModal()">Cancelar</button><button class="btn-save" id="modalSaveBtn">💾 Salvar</button></div></div>';
    document.body.appendChild(modal);
    document.getElementById('modalSaveBtn').onclick = function() {
      var closeBtn = modal.querySelector('.btn-cancel');
      if (typeof onSave === 'function') onSave();
      closeModal();
    };
  }

  window.closeModal = function() {
    var modal = document.querySelector('.admin-modal');
    if (modal) modal.remove();
  };
})();
