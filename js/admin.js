/* ===================================================================
   ADMIN PANEL — Configuração
   =================================================================== */

const ADMIN_ENABLED = true;

/* ===================================================================
   INICIALIZAÇÃO
   =================================================================== */

(function() {
  if (!ADMIN_ENABLED) return;
  if (!window.location.search.includes('edit=1')) return;

  var ADMIN_LOGGED = sessionStorage.getItem('admin_logged') === '1';

  // ── Injetar CSS ──
  (function() {
    var css = document.createElement('style');
    css.textContent = `
      #adminPanel { display:none; position:fixed; z-index:2147483647; inset:0; background:rgba(10,15,36,0.95); font-family:system-ui,sans-serif; color:#e8e8f0; overflow:auto; -webkit-overflow-scrolling:touch; }
      #adminPanel.active { display:flex; flex-direction:column; }
      #adminPanel * { box-sizing:border-box; }

      #adminLogin { position:fixed; z-index:2147483647; inset:0; background:linear-gradient(135deg,#0a0f24 0%,#141a3a 50%,#0e142e 100%); display:flex; align-items:center; justify-content:center; font-family:system-ui,sans-serif; }
      #adminLogin.hidden { display:none; }
      #adminLogin .box { background:linear-gradient(180deg,#20274a 0%,#1a1f3a 100%); padding:2.5rem; border-radius:16px; border:1px solid rgba(212,175,55,0.15); width:360px; max-width:90vw; box-shadow:0 20px 60px rgba(0,0,0,0.5),0 0 0 1px rgba(212,175,55,0.05); }
      #adminLogin h2 { margin:0 0 0.25rem; color:#d4af37; font-size:1.3rem; letter-spacing:-0.01em; }
      #adminLogin p { margin:0 0 1.75rem; color:rgba(255,255,255,0.35); font-size:0.85rem; }
      #adminLogin input { display:block; width:100%; padding:0.75rem 1rem; margin-bottom:0.75rem; background:rgba(0,0,0,0.25); border:1px solid rgba(255,255,255,0.06); border-radius:8px; color:#e8e8f0; font-size:0.9rem; outline:none; transition:border-color 0.2s,box-shadow 0.2s; }
      #adminLogin input:focus { border-color:#d4af37; box-shadow:0 0 0 3px rgba(212,175,55,0.08); }
      #adminLogin button { width:100%; padding:0.75rem; background:linear-gradient(135deg,#d4af37,#c5a030); border:none; border-radius:8px; color:#0a0f24; font-weight:700; font-size:0.9rem; cursor:pointer; transition:transform 0.15s,box-shadow 0.15s; }
      #adminLogin button:hover { transform:translateY(-1px); box-shadow:0 4px 16px rgba(212,175,55,0.3); }
      #adminLogin button:active { transform:translateY(0); }
      #adminLogin .error { color:#ff6b6b; font-size:0.8rem; margin-top:0.5rem; display:none; text-align:center; padding:0.5rem; background:rgba(255,80,80,0.1); border-radius:6px; }
      #adminFloatBtn { display:none; position:fixed; z-index:2147483647; bottom:1.2rem; left:1.2rem; background:#d4af37; color:#0a0f24; padding:0.55rem 1.1rem; border-radius:10px; font-size:0.85rem; font-weight:700; cursor:pointer; box-shadow:0 4px 16px rgba(0,0,0,0.4); align-items:center; gap:0.4rem; border:none; transition:transform 0.15s,box-shadow 0.15s; }
      #adminFloatBtn:hover { transform:translateY(-1px); box-shadow:0 6px 20px rgba(0,0,0,0.5); }

      .admin-header { display:flex; align-items:center; justify-content:space-between; padding:0.75rem 1.5rem; background:#0a0f24; border-bottom:1px solid rgba(255,255,255,0.05); }
      .admin-header h1 { margin:0; font-size:1rem; color:#d4af37; font-weight:600; }
      .admin-header .admin-actions { display:flex; gap:0.5rem; align-items:center; }
      .admin-header .admin-actions button, .admin-header .admin-actions a { padding:0.4rem 0.9rem; border-radius:6px; border:1px solid rgba(255,255,255,0.06); background:rgba(255,255,255,0.03); color:rgba(255,255,255,0.7); font-size:0.8rem; cursor:pointer; text-decoration:none; transition:all 0.15s; touch-action:manipulation; }
      .admin-header .admin-actions button:hover, .admin-header .admin-actions a:hover { background:rgba(255,255,255,0.06); color:#fff; }
      .admin-header .admin-actions .btn-publish { background:linear-gradient(135deg,#d4af37,#c5a030); color:#0a0f24; border:none; font-weight:700; }
      .admin-header .admin-actions .btn-publish:hover { background:linear-gradient(135deg,#c5a030,#b8962b); color:#0a0f24; box-shadow:0 2px 10px rgba(212,175,55,0.3); }

      .admin-body { display:flex; flex:1; overflow:hidden; }
      .admin-sidebar { width:220px; min-width:220px; background:#080c1e; border-right:1px solid rgba(255,255,255,0.03); padding:0.75rem 0.5rem; overflow-y:auto; }
      .admin-sidebar button { display:block; width:100%; text-align:left; padding:0.55rem 0.9rem; margin:0 0 4px; background:rgba(255,255,255,0.02); border:none; border-radius:9px; color:rgba(255,255,255,0.45); font-size:0.82rem; cursor:pointer; transition:all 0.15s; touch-action:manipulation; }
      .admin-mobile-tab { display:none; width:100%; padding:0.75rem 1rem; background:#080c1e; border:none; border-bottom:1px solid rgba(255,255,255,0.04); color:#fff; font-size:0.9rem; outline:none; cursor:pointer; }
      .admin-mobile-tab option { background:#080c1e; color:#fff; }
      .admin-sidebar button:hover { background:rgba(255,255,255,0.05); color:rgba(255,255,255,0.85); }
      .admin-sidebar button.active { background:rgba(212,175,55,0.13); color:#ffd700; box-shadow:inset 0 0 0 1px rgba(212,175,55,0.28); }
      .admin-content { flex:1; padding:1.5rem; overflow-y:auto; background:rgba(255,255,255,0.015); }

      .admin-section { display:none; }
      .admin-section.active { display:block; }
      .admin-section h2 { margin:0 0 0.4rem; color:#ffd700; font-size:1.2rem; font-weight:700; letter-spacing:-0.01em; }
      .admin-section h2::after { content:""; display:block; width:64px; height:3px; background:linear-gradient(90deg,#d4af37,rgba(212,175,55,0.1)); border-radius:3px; margin-top:6px; }
      .admin-section .desc { margin:0 0 1.5rem; color:rgba(255,255,255,0.35); font-size:0.82rem; }

      .admin-table { width:100%; border-collapse:separate; border-spacing:0; font-size:0.82rem; }
      .admin-table thead { position:sticky; top:0; z-index:1; }
      .admin-table th { text-align:left; padding:0.7rem 0.75rem; border-bottom:1px solid rgba(255,255,255,0.06); color:rgba(255,255,255,0.3); font-weight:600; text-transform:uppercase; font-size:0.65rem; letter-spacing:0.08em; background:#0e142e; }
      .admin-table td { padding:0.65rem 0.75rem; border-bottom:1px solid rgba(255,255,255,0.03); vertical-align:middle; }
      .admin-table tbody tr { transition:background 0.12s; }
      .admin-table tbody tr:hover td { background:rgba(212,175,55,0.03); }
      .admin-table tbody tr:nth-child(even) td { background:rgba(255,255,255,0.012); }
      .admin-table tbody tr:nth-child(even):hover td { background:rgba(212,175,55,0.04); }
      .admin-table .actions { text-align:right; white-space:nowrap; }
      .admin-table .actions button { padding:0.3rem 0.65rem; border-radius:5px; border:1px solid rgba(255,255,255,0.06); background:rgba(255,255,255,0.03); color:rgba(255,255,255,0.55); font-size:0.75rem; cursor:pointer; margin-left:0.35rem; transition:all 0.12s; }
      .admin-table .actions button:hover { background:rgba(255,255,255,0.06); color:#fff; }
      .admin-table .actions .btn-del { border-color:rgba(255,80,80,0.2); color:#ff6b6b; }
      .admin-table .actions .btn-del:hover { background:rgba(255,80,80,0.12); color:#ff6b6b; }

      .btn-add { padding:0.5rem 1.2rem; border-radius:8px; border:1px solid rgba(212,175,55,0.2); background:rgba(212,175,55,0.04); color:#d4af37; font-size:0.8rem; cursor:pointer; margin-bottom:1rem; transition:all 0.15s; font-weight:500; }
      .btn-add:hover { background:rgba(212,175,55,0.1); border-color:rgba(212,175,55,0.35); }

      .btn-save, .btn-del { display:inline-flex; align-items:center; gap:0.4rem; padding:0.5rem 1.4rem; border-radius:7px; font-size:0.82rem; font-weight:600; cursor:pointer; transition:all 0.15s; }
      .btn-save { background:linear-gradient(135deg,#d4af37,#c5a030); color:#0a0f24; border:none; font-weight:700; }
      .btn-save:hover { box-shadow:0 2px 10px rgba(212,175,55,0.25); transform:translateY(-1px); }
      .btn-del { background:rgba(255,80,80,0.06); color:#ff6b6b; border:1px solid rgba(255,80,80,0.25); }
      .btn-del:hover { background:rgba(255,80,80,0.14); border-color:rgba(255,80,80,0.45); }
      .btn-arrow { display:inline-flex; align-items:center; justify-content:center; width:2.1rem; height:2.1rem; padding:0; border-radius:7px; border:1px solid rgba(212,175,55,0.35); background:rgba(212,175,55,0.08); color:#d4af37; font-size:0.95rem; line-height:1; cursor:pointer; transition:all 0.15s; }
      .btn-arrow:hover:not(:disabled) { background:rgba(212,175,55,0.22); border-color:rgba(212,175,55,0.6); transform:translateY(-1px); }
      .btn-arrow:disabled { opacity:0.3; cursor:default; }

      .admin-modal { display:none; position:fixed; z-index:2147483647; inset:0; background:rgba(0,0,0,0.75); align-items:center; justify-content:center; backdrop-filter:blur(4px); -webkit-backdrop-filter:blur(4px); }
      .admin-modal.active { display:flex; }
      .admin-modal .modal-box { background:linear-gradient(180deg,#20274a 0%,#1a1f3a 100%); border-radius:16px; border:1px solid rgba(255,255,255,0.05); width:720px; max-width:95vw; max-height:85vh; overflow-y:auto; padding:1.5rem; box-shadow:0 20px 60px rgba(0,0,0,0.5); }
      .admin-modal .modal-box h3 { margin:0 0 1rem; color:#d4af37; font-size:1rem; font-weight:600; }
      .admin-modal .modal-box label { display:block; margin:0.6rem 0 0.25rem; color:rgba(255,255,255,0.45); font-size:0.72rem; text-transform:uppercase; letter-spacing:0.06em; }
      .admin-modal .modal-box input, .admin-modal .modal-box textarea, .admin-modal .modal-box select { width:100%; padding:0.55rem 0.75rem; background:rgba(0,0,0,0.2); border:1px solid rgba(255,255,255,0.06); border-radius:6px; color:#e8e8f0; font-size:0.85rem; outline:none; transition:border-color 0.2s,box-shadow 0.2s; }
      .admin-modal .modal-box select option { background:#1a1f3a; color:#e8e8f0; }
      .admin-modal .modal-box input:focus, .admin-modal .modal-box textarea:focus { border-color:#d4af37; box-shadow:0 0 0 3px rgba(212,175,55,0.06); }
      .admin-modal .modal-box textarea { min-height:80px; resize:vertical; font-family:system-ui,sans-serif; line-height:1.5; }
      .admin-modal .modal-box .row2 { display:grid; grid-template-columns:1fr 1fr; gap:0 1rem; }
      .admin-modal .modal-box .row3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:0 1rem; }
      .admin-modal .modal-box .row4 { display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:0 1rem; }
      .admin-modal .modal-box .modal-actions { display:flex; gap:0.5rem; justify-content:flex-end; margin-top:1rem; padding-top:1rem; border-top:1px solid rgba(255,255,255,0.05); }
      .admin-modal .modal-box .modal-actions button { padding:0.5rem 1.4rem; border-radius:7px; font-size:0.82rem; cursor:pointer; transition:all 0.15s; }
      .admin-modal .modal-box .modal-actions .btn-save { background:linear-gradient(135deg,#d4af37,#c5a030); color:#0a0f24; border:none; font-weight:700; }
      .admin-modal .modal-box .modal-actions .btn-save:hover { box-shadow:0 2px 10px rgba(212,175,55,0.25); transform:translateY(-1px); }
      .admin-modal .modal-box .modal-actions .btn-cancel { background:rgba(255,255,255,0.03); color:rgba(255,255,255,0.55); border:1px solid rgba(255,255,255,0.06); }
      .admin-modal .modal-box .modal-actions .btn-cancel:hover { background:rgba(255,255,255,0.06); color:#fff; }

      .admin-settings { background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.05); border-radius:14px; padding:1.25rem 1.5rem; }
      .admin-settings label { display:block; margin:0.75rem 0 0.25rem; color:rgba(255,255,255,0.45); font-size:0.72rem; text-transform:uppercase; letter-spacing:0.06em; }
      .admin-settings input, .admin-settings textarea { width:100%; max-width:500px; padding:0.55rem 0.75rem; background:rgba(0,0,0,0.2); border:1px solid rgba(255,255,255,0.06); border-radius:6px; color:#e8e8f0; font-size:0.85rem; outline:none; margin-bottom:0.5rem; transition:border-color 0.2s,box-shadow 0.2s; }
      .admin-settings input:focus { border-color:#d4af37; box-shadow:0 0 0 3px rgba(212,175,55,0.06); }
      .admin-settings .note { color:rgba(255,255,255,0.25); font-size:0.75rem; margin:-0.25rem 0 0.75rem; }
      .admin-settings .btn-save { padding:0.5rem 1.4rem; border-radius:7px; background:linear-gradient(135deg,#d4af37,#c5a030); color:#0a0f24; border:none; font-weight:700; font-size:0.82rem; cursor:pointer; transition:all 0.15s; }
      .admin-settings .btn-save:hover { box-shadow:0 2px 10px rgba(212,175,55,0.25); transform:translateY(-1px); }

      .btn-up { font-size:0.72rem; padding:0.25rem 0.8rem; background:rgba(212,175,55,0.14); border:1px solid rgba(212,175,55,0.45); border-radius:999px; color:#ffd700; cursor:pointer; vertical-align:middle; transition:all 0.15s; margin-left:6px; }
      .btn-up:hover { background:rgba(212,175,55,0.28); }

      #adminToast { position:fixed; z-index:2147483647; bottom:1.5rem; right:1.5rem; padding:0.75rem 1.25rem; border-radius:10px; font-size:0.85rem; opacity:0; transition:opacity 0.3s,transform 0.3s; pointer-events:none; transform:translateY(10px); box-shadow:0 4px 20px rgba(0,0,0,0.4); }
      #adminToast.show { opacity:1; transform:translateY(0); }
      #adminToast.success { background:linear-gradient(135deg,#1b5e20,#2e7d32); color:#a5d6a7; }
      #adminToast.error { background:linear-gradient(135deg,#b71c1c,#c62828); color:#ef9a9a; }
      #adminToast.info { background:linear-gradient(135deg,#1a237e,#283593); color:#9fa8da; }

      .admin-preview-badge { position:fixed; top:0; left:0; right:0; z-index:2147483647; background:linear-gradient(90deg,#d4af37,#c5a030); color:#0a0f24; text-align:center; padding:0.25rem; font-size:0.75rem; font-weight:700; letter-spacing:0.05em; }
      body.admin-mode { padding-top:1.5rem; }

      @media (max-width: 768px) {
        .admin-body { display:block; overflow:visible; }
        .admin-sidebar { width:100%; min-width:unset; padding:0; border-right:none; border-bottom:1px solid rgba(255,255,255,0.04); }
        .admin-desk-tab { display:none !important; }
        .admin-mobile-tab { display:block; width:100%; padding:0.75rem 1rem; font-size:0.9rem; }
        .admin-content { padding:1rem; overflow:visible; min-height:60vh; }
        .admin-header { flex-wrap:wrap; gap:0.5rem; }
        .admin-header h1 { font-size:0.85rem; }
        .admin-header .admin-actions button,
        .admin-header .admin-actions a { font-size:0.7rem; padding:0.3rem 0.6rem; }
        .admin-settings input,
        .admin-settings textarea { max-width:100%; }
        .admin-settings { padding:1rem; }
        .admin-table { font-size:0.7rem; display:block; overflow-x:auto; -webkit-overflow-scrolling:touch; white-space:nowrap; }
        .admin-table td, .admin-table th { padding:0.35rem 0.4rem; }
        .admin-modal .modal-box { max-width:98vw; padding:1rem; max-height:90vh; }
        .admin-modal .modal-box .row2,
        .admin-modal .modal-box .row3,
        .admin-modal .modal-box .row4 { grid-template-columns:1fr; }
        .admin-modal .modal-box input,
        .admin-modal .modal-box textarea,
        .admin-modal .modal-box select { font-size:16px; }
        #adminFloatBtn { bottom:0.75rem; left:0.75rem; padding:0.4rem 0.8rem; font-size:0.75rem; }
      }
    `;
    document.head.appendChild(css);
  })();

  // ── Criar elementos ──
  var loginEl = document.createElement('div');
  loginEl.id = 'adminLogin';
  loginEl.innerHTML = '<div class="box"><h2>🔐 Painel Admin</h2><p>Digite a senha do servidor para gerenciar o site</p><form onsubmit="adminLogin();return false"><input type="password" id="adminPass" placeholder="Senha do servidor" autocomplete="current-password"><button type="submit">Entrar</button></form><div class="error" id="adminLoginError">Senha incorreta</div></div>';
  document.body.appendChild(loginEl);

  var panelEl = document.createElement('div');
  panelEl.id = 'adminPanel';
  panelEl.innerHTML = '<div class="admin-header"><h1>⚙️ Furpal — Admin</h1><div class="admin-actions"><button onclick="adminToggleSite()" style="color:rgba(255,255,255,0.6);font-size:0.8rem;border:1px solid rgba(255,255,255,0.1);">👁 Ver site</button><button onclick="adminPublish()" class="btn-publish" id="adminPublishBtn">💾 Salvar no servidor</button><button onclick="adminLogout()">Sair</button></div></div><div class="admin-body"><div class="admin-sidebar" id="adminSidebar"></div><div class="admin-content" id="adminContent"></div></div>';
  document.body.appendChild(panelEl);

  var toastEl = document.createElement('div');
  toastEl.id = 'adminToast';
  document.body.appendChild(toastEl);

  function showLoginError() {
    var err = document.getElementById('adminLoginError');
    if (err) err.style.display = 'block';
  }

  // Autentica contra auth.php (server-side, con límite de intentos). Nada de credenciales en el código.
  function authRequest(p) {
    return fetch('auth.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: p })
    }).then(function(r) {
      return r.json().then(function(j) { return j; }).catch(function() { return {}; });
    });
  }

  function tryFrontendLogin(u, p) {
    if (!u && !p) { showLoginError(); return; }
    authRequest(p).then(function(res) {
      if (res && res.ok) {
        sessionStorage.setItem('admin_logged', '1');
        if (p) localStorage.setItem('admin_server_pass', p);
        loginEl.classList.add('hidden');
        panelEl.classList.add('active');
        document.body.classList.add('admin-mode');
        adminFloat.style.display = 'none';
        initAdminPanel();
      } else {
        showLoginError();
      }
    }).catch(function() {
      showLoginError();
    });
  }

  function fallbackFrontendLogin(u, p) {
    tryFrontendLogin(u, p);
  }

  window.adminLogin = function() {
    var u = document.getElementById('adminUser') ? document.getElementById('adminUser').value : '';
    var p = document.getElementById('adminPass').value;
    tryFrontendLogin(u, p);
  };

  var adminFloat = document.createElement('div');
  adminFloat.id = 'adminFloatBtn';
  adminFloat.innerHTML = '⚙️ Admin';
  adminFloat.onclick = function() {
    panelEl.classList.add('active');
    document.body.classList.add('admin-mode');
    adminFloat.style.display = 'none';
  };
  document.body.appendChild(adminFloat);

  function saveFormsToData() {
    var c = _data ? _data.constants : null;
    if (!c) return;
    // General tab
    if (document.getElementById('cfg_siteName')) {
      c.SITE_NAME = gv('cfg_siteName');
      c.SITE_LOGO = gv('cfg_logo');
      c.LOGO_MAX_HEIGHT = gv('cfg_logoH');
      c.LOGO_MAX_WIDTH = gv('cfg_logoW');
      c.LOGO_MARGIN = gv('cfg_logoM');
      c.WHATSAPP_NUMBER = gv('cfg_whatsNum');
      c.WHATSAPP_DISPLAY = gv('cfg_whatsDisp');
      c.WHATSAPP_MSG = gv('cfg_whatsMsg');
      c.SITE_EMAIL = gv('cfg_email');
      c.SITE_ADDRESS = gv('cfg_address');
      c.SITE_URL = gv('cfg_siteUrl');
      c.SITE_CITY = gv('cfg_city');
      c.SITE_REGION = gv('cfg_region');
      c.SITE_MAPS = gv('cfg_maps');
      c.HERO_EYEBROW = gv('cfg_heroEye');
      c.HERO_TITLE = gv('cfg_heroTitle');
      c.HERO_SUBTITLE = gv('cfg_heroSub');
      c.HERO_VIDEO = gv('cfg_heroVideo');
      if (c.SOCIAL) {
        c.SOCIAL.instagram = gv('cfg_ig');
        c.SOCIAL.facebook = gv('cfg_fb');
        c.SOCIAL.youtube = gv('cfg_yt');
        c.SOCIAL.linkedin = gv('cfg_li');
      }
      c.DISABLED_SECTIONS = gv('cfg_disabled').split(',').map(function(s){ return s.trim(); }).filter(Boolean);
      c.PAGE_SIZE = parseInt(gv('cfg_pageSize')) || 6;
      c.SECTION_SERVICOS_EYEBROW    = gv('cfg_servEye');
      c.SECTION_SERVICOS_TITLE      = gv('cfg_servTitle');
      c.SECTION_PARCEIROS_EYEBROW   = gv('cfg_parcEye');
      c.SECTION_PARCEIROS_TITLE     = gv('cfg_parcTitle');
      c.SECTION_DEPOIMENTOS_EYEBROW = gv('cfg_depEye');
      c.SECTION_DEPOIMENTOS_TITLE   = gv('cfg_depTitle');
      c.SECTION_FAQ_EYEBROW         = gv('cfg_faqEye');
      c.SECTION_FAQ_TITLE           = gv('cfg_faqTitle');
      c.SECTION_MAPA_EYEBROW        = gv('cfg_mapEye');
      c.SECTION_MAPA_TITLE          = gv('cfg_mapTitle');
      c.SECTION_BLOG_EYEBROW        = gv('cfg_blogEye');
      c.SECTION_BLOG_TITLE          = gv('cfg_blogTitle');
      c.SECTION_FAVORITOS_EYEBROW   = gv('cfg_favEye');
      c.SECTION_FAVORITOS_TITLE     = gv('cfg_favTitle');
      c.SECTION_FAVORITOS_EMPTY     = gv('cfg_favEmpty');
      c.SECTION_STATS_EYEBROW       = gv('cfg_statsEye');
      c.SECTION_STATS_TITLE         = gv('cfg_statsTitle');
      c.SECTION_PRIVACIDADE_EYEBROW = gv('cfg_privEye');
      c.SECTION_PRIVACIDADE_TITLE   = gv('cfg_privTitle');
      c.SECTION_SOBRE_EYEBROW      = gv('cfg_sobreEye');
      c.SECTION_SOBRE_TITLE        = gv('cfg_sobreTitle');
      c.SECTION_COMPRAR_EYEBROW    = gv('cfg_comprarEye');
      c.SECTION_COMPRAR_TITLE      = gv('cfg_comprarTitle');
      c.SECTION_ALUGAR_EYEBROW     = gv('cfg_alugarEye');
      c.SECTION_ALUGAR_TITLE       = gv('cfg_alugarTitle');
      c.SECTION_LANCAMENTOS_EYEBROW = gv('cfg_lancEye');
      c.SECTION_LANCAMENTOS_TITLE  = gv('cfg_lancTitle');
      c.SECTION_CONTATO_EYEBROW    = gv('cfg_contEye');
      c.SECTION_CONTATO_TITLE      = gv('cfg_contTitle');
      c.SECTION_FINANCIAMENTO_EYEBROW = gv('cfg_finEye');
      c.SECTION_FINANCIAMENTO_TITLE   = gv('cfg_finTitle');
    }
    // Financiamento tab (solo si es la pestaña activa, para no pisar los textos de la pestaña General)
    var finSection = document.getElementById('adminSection_financiamento');
    if (finSection && finSection.classList.contains('active') && document.getElementById('fin_eye')) {
      c.SECTION_FINANCIAMENTO_EYEBROW = gv('fin_eye');
      c.SECTION_FINANCIAMENTO_TITLE   = gv('fin_title');
      c.FIN_DEFAULT_PRICE = parseInt(gv('fin_defPrice')) || 500000;
      c.FIN_DEFAULT_DOWN  = parseInt(gv('fin_defDown'))  || 100000;
      c.FIN_DEFAULT_RATE  = parseFloat(gv('fin_defRate')) || 8.5;
      c.FIN_DEFAULT_TERM  = parseInt(gv('fin_defTerm'))   || 240;
    }
    // Sobre tab (solo si es la pestaña activa)
    var sobreSection = document.getElementById('adminSection_sobre');
    if (sobreSection && sobreSection.classList.contains('active') && document.getElementById('sobre_eye')) {
      c.SECTION_SOBRE_EYEBROW = gv('sobre_eye');
      c.SECTION_SOBRE_TITLE   = gv('sobre_title');
      c.SECTION_SOBRE_P1      = gv('sobre_p1');
      c.SECTION_SOBRE_P2      = gv('sobre_p2');
      c.SECTION_SOBRE_P3      = gv('sobre_p3');
      c.SOBRE_VIDEO           = gv('sobre_video');
      var stInputs = document.querySelectorAll('#adminSection_sobre .sobre-stat-val');
      var stLabels = document.querySelectorAll('#adminSection_sobre .sobre-stat-label');
      for (var si2 = 0; si2 < stInputs.length && si2 < _data.STATS.length; si2++) {
        _data.STATS[si2].value = stInputs[si2].value;
        if (stLabels[si2]) _data.STATS[si2].label = stLabels[si2].value;
      }
    }
    // Serviços tab (solo si es la pestaña activa)
    var servSection = document.getElementById('adminSection_servicos');
    if (servSection && servSection.classList.contains('active')) {
      var svTitles = servSection.querySelectorAll('.serv-card-title');
      var svTexts  = servSection.querySelectorAll('.serv-card-text');
      _data.SERVICES = [];
      for (var si3 = 0; si3 < svTitles.length; si3++) {
        _data.SERVICES.push({
          title: svTitles[si3].value,
          text:  svTexts[si3] ? svTexts[si3].value : ''
        });
      }
    }
  }

  window.adminToggleSite = function() {
    try { saveFormsToData(); } catch(e) { console.warn('saveFormsToData error:', e); }
    try { syncToLive(); } catch(e) { console.warn('syncToLive error:', e); }
    panelEl.classList.remove('active');
    document.body.classList.remove('admin-mode');
    adminFloat.style.display = 'flex';
  };

  window.adminSaveServer = function() {
    try { saveFormsToData(); } catch(e) {}
    var pwd = localStorage.getItem('admin_server_pass');
    if (!pwd) { adminToast('❌ Defina a senha do save.php na aba Config', 'error'); showTab('settings'); return; }
    var content = generateDataJs();
    saveToPhp(content, pwd)
    .then(function(r) { return r.json(); })
    .then(function(res) {
      if (res.ok) { adminToast('✅ ' + (res.message || 'Salvo!'), 'success'); }
      else { adminToast('❌ ' + (res.error || 'Erro'), 'error'); }
    })
    .catch(function(err) { adminToast('❌ ' + err.message, 'error'); });
  };

  window.saveServerPass = function() {
    var pwd = document.getElementById('cfg_serverPass').value.trim();
    localStorage.setItem('admin_server_pass', pwd);
    adminToast('✅ Senha do servidor salva no navegador', 'success');
  };

  function uploadBtn(inputId, folder) {
    return ' <button type="button" class="btn-up" onclick="adminUpload(\'' + inputId + '\',\'' + folder + '\')">📷 Upload</button>';
  }

  // Resolve a pasta final de uploads: imóveis vão para subpasta por tipo (venta/aluguel)
  function resolveFolder(folder) {
    if (folder === 'images/properties') {
      var t = document.getElementById('prop_type');
      return 'images/properties/' + ((t && t.value === 'rent') ? 'alquiler' : 'venta');
    }
    return folder;
  }

  // InfinityFree bloqueia POSTs com corpo de código JS. Codifica em base64 (UTF-8 seguro) para o save.php aceitar.
  function encodeContent(s) {
    var bytes = new TextEncoder().encode(String(s || ''));
    var bin = '';
    for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin);
  }

  function dataURLtoBlob(dataUrl) {
    var parts = String(dataUrl).split(',');
    var mime = (parts[0].match(/:(.*?);/) || [])[1] || 'image/jpeg';
    var bin = atob(parts[1]);
    var arr = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
    return new Blob([arr], { type: mime });
  }

  // Extrai um frame representativo do vídeo (sem depender de ffmpeg no servidor)
  // e entrega como JPEG dataURL. Guard de brilho: não usa frame escuro/claro demais.
  function extractVideoFrame(file, cb) {
    var url = URL.createObjectURL(file);
    var v = document.createElement('video');
    v.muted = true;
    v.playsInline = true;
    v.preload = 'auto';
    var settled = false;
    function finish(dataUrl) {
      if (settled) return;
      settled = true;
      try { v.pause(); v.removeAttribute('src'); v.load(); } catch(e) {}
      URL.revokeObjectURL(url);
      if (cb) cb(dataUrl || null);
    }
    function snap() {
      try {
        var w = v.videoWidth, h = v.videoHeight;
        if (!w || !h) { finish(null); return; }
        var mw = 1280;
        if (w > mw) { h = Math.round(h * mw / w); w = mw; }
        var c = document.createElement('canvas');
        c.width = w; c.height = h;
        var ctx = c.getContext('2d');
        ctx.drawImage(v, 0, 0, w, h);
        var pd = ctx.getImageData(0, 0, w, h).data;
        var ps = 0, pn = w * h;
        for (var i = 0; i < pd.length; i += 4) ps += 0.299*pd[i] + 0.587*pd[i+1] + 0.114*pd[i+2];
        if (ps / pn > 30 && ps / pn < 245) finish(c.toDataURL('image/jpeg', 0.82));
        else finish(null);
      } catch(e) { finish(null); }
    }
    v.addEventListener('loadeddata', function() {
      var d = v.duration || 0;
      var seek = d > 1.5 ? 1.0 : (d > 0.3 ? d * 0.3 : 0);
      if (seek > 0 && seek < d) v.currentTime = seek;
      else snap();
    });
    v.addEventListener('seeked', snap);
    v.addEventListener('error', function() { finish(null); });
    setTimeout(snap, 5000);
    v.src = url;
    v.load();
  }

  // Ao subir um vídeo do Hero ou do Sobre, gera automaticamente o poster
  // (images/hero-poster.jpg ou images/sobre-poster.jpg) extraindo um frame do vídeo enviado.
  function autoPosterFromVideo(file, posterName) {
    adminToast('🖼️ Gerando poster do vídeo...', 'info');
    extractVideoFrame(file, function(dataUrl) {
      if (!dataUrl) { adminToast('⚠️ Não foi possível extrair o frame do vídeo', 'warning'); return; }
      try {
        var f = new File([dataURLtoBlob(dataUrl)], posterName, { type: 'image/jpeg' });
        uploadFile(f, 'images', function() {
          adminToast('✅ Poster atualizado automaticamente', 'success');
        }, function() {
          adminToast('⚠️ O poster não pôde ser salvo no servidor', 'warning');
        }, posterName);
      } catch(e) { adminToast('⚠️ Erro ao gerar o poster: ' + e.message, 'warning'); }
    });
  }

  function saveToPhp(content, pwd) {
    return fetch('save.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: encodeContent(content), encoded: true, password: pwd })
    });
  }

  // Campos de galeria (textarea) que, ao subir imagens, também preenchem a imagem principal automaticamente.
  var MAIN_IMG_BY_GALLERY = {
    'prop_gallery': 'prop_img',
    'emp_gallery': 'emp_img'
  };

  window.adminUpload = function(inputId, folder) {
    folder = resolveFolder(folder);
    var target = document.getElementById(inputId);
    var isMulti = target && target.tagName === 'TEXTAREA';
    var mainImgId = isMulti ? (MAIN_IMG_BY_GALLERY[inputId] || null) : null;
    var el = document.createElement('input');
    el.type = 'file';
    el.multiple = !!isMulti;
    el.accept = folder === 'videos' ? 'video/mp4,video/webm,video/quicktime' : 'image/*';
    el.onchange = function() {
      var files = Array.prototype.slice.call(el.files || []);
      if (!files.length) return;
      var idx = 0;
      var okCount = 0;
      function next() {
        var file = files[idx];
        if (!file) {
          if (okCount > 0) adminToast('✅ ' + okCount + ' URL(s) adicionada(s)!', 'success');
          return;
        }
        adminToast('⏳ Enviando ' + file.name + (files.length > 1 ? ' (' + (idx + 1) + '/' + files.length + ')' : '') + '...', 'info');
        uploadFile(file, folder, function(url) {
          if (target) {
            if (isMulti) {
              target.value = target.value ? target.value.trim() + '\n' + url : url;
            } else {
              target.value = url;
            }
          }
          if (idx === 0 && mainImgId) {
            var mainEl = document.getElementById(mainImgId);
            if (mainEl) mainEl.value = url;
          }
          okCount++;
          idx++;
          next();
          if (folder === 'videos') {
            if (inputId === 'cfg_heroVideo') autoPosterFromVideo(file, 'hero-poster.jpg');
            else if (inputId === 'sobre_video') autoPosterFromVideo(file, 'sobre-poster.jpg');
          }
        }, function() {
          idx++;
          next();
        });
      }
      next();
    };
    el.click();
  };

  function uploadFile(file, folder, cb, errCb, fixedName) {
    // SEMPRE envia direto ao servidor (upload.php) — não depende de token do GitHub nem de senha configurada.
    // Usa a senha salva no navegador (Config). Sem fallback: a senha nunca vai embutida no JS público.
    var pwd = localStorage.getItem('admin_server_pass');
    var fd = new FormData();
    fd.append('file', file);
    fd.append('password', pwd);
    fd.append('folder', folder);
    if (fixedName) fd.append('name', fixedName);
    fetch('upload.php', { method: 'POST', body: fd })
      .then(function(r) { return r.text(); })
      .then(function(text) {
        var res;
        try {
          res = JSON.parse(text);
        } catch(e) {
          if (/<html|aes\.js|slowAES|__test/i.test(text)) {
            adminToast('⚠️ Firewall do InfinityFree ativo. Recarregue a página 1x e tente de novo.', 'warning');
          } else {
            adminToast('❌ Resposta inesperada do servidor.', 'error');
          }
          if (errCb) errCb();
          return;
        }
        if (res.ok && res.url) { cb(res.url); return; }
        adminToast('❌ ' + ((res && res.error) || 'Erro no upload'), 'error');
        if (errCb) errCb();
        // ── Fallback GitHub (comentado de propósito — reativar se for usar GitHub de novo) ──
        // uploadViaGitHub(file, folder, cb);
      })
      .catch(function(err) {
        adminToast('❌ Erro ao conectar em upload.php: ' + err.message, 'error');
        if (errCb) errCb();
        // ── Fallback GitHub (comentado de propósito — reativar se for usar GitHub de novo) ──
        // uploadViaGitHub(file, folder, cb);
      });
  }

  /*
  // ── Upload via GitHub (comentado de propósito — reativar se for usar GitHub de novo) ──
  function uploadViaGitHub(file, folder, cb) {
    var token = ADMIN_TOKEN;
    if (!token) { adminToast('❌ Configure o token do GitHub ou a senha do servidor', 'error'); return; }
    var reader = new FileReader();
    reader.onload = function() {
      var base64 = reader.result.split(',')[1];
      var name = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').toLowerCase();
      name = name.replace(/\.[^.]+$/, function(m) { return m; });
      name = Date.now() + '_' + name;
      var path = folder + '/' + name;
      var apiUrl = 'https://api.github.com/repos/' + GITHUB_REPO + '/contents/' + path;
      fetch(apiUrl + '?ref=' + GITHUB_BRANCH, {
        headers: { 'Authorization': 'token ' + token, 'Accept': 'application/vnd.github.v3+json' }
      })
      .then(function(r) { return r.json(); })
      .then(function(existing) {
        var sha = existing.sha || null;
        var body = {
          message: 'Upload: ' + name,
          content: base64,
          branch: GITHUB_BRANCH
        };
        if (sha) body.sha = sha;
        return fetch(apiUrl, {
          method: 'PUT',
          headers: { 'Authorization': 'token ' + token, 'Accept': 'application/vnd.github.v3+json', 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
      })
      .then(function(r) { return r.json(); })
      .then(function(res) {
        if (res.content) {
          var url = 'https://raw.githubusercontent.com/' + GITHUB_REPO + '/' + GITHUB_BRANCH + '/' + path;
          cb(url);
        } else {
          adminToast('❌ Erro GitHub: ' + (res.message || 'desconhecido'), 'error');
        }
      })
      .catch(function(err) { adminToast('❌ ' + err.message, 'error'); });
    };
    reader.readAsDataURL(file);
  }
  window._uploadViaGitHub = uploadViaGitHub;
  */

  window.adminLogout = function() {
    sessionStorage.removeItem('admin_logged');
    panelEl.classList.remove('active');
    loginEl.classList.remove('hidden');
    document.getElementById('adminUser').value = '';
    document.getElementById('adminPass').value = '';
    document.getElementById('adminLoginError').style.display = 'none';
    document.body.classList.remove('admin-mode');
    adminFloat.style.display = 'none';
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

  // ── Verificar login ──
  // IMPORTANTE: NO usar `return` aquí: si no está logueado, igual deben
  // definirse abajo window.showTab, adminSaveServer, renderers, etc.
  // (si no, el primer login rompe el panel hasta recargar la página).
  if (!ADMIN_LOGGED) {
    loginEl.classList.remove('hidden');
    panelEl.classList.remove('active');
  } else {
    // Defer to next tick so window.showTab & render functions are defined first
    setTimeout(function() {
      loginEl.classList.add('hidden');
      panelEl.classList.add('active');
      document.body.classList.add('admin-mode');
      initAdminPanel();
    }, 0);
  }

  function initAdminPanel() {
    try {
      _data = {
        constants: extractConstants(),
        STATS:        JSON.parse(JSON.stringify(typeof STATS !== 'undefined' ? STATS : [])),
        PROPERTIES:   JSON.parse(JSON.stringify(typeof PROPERTIES !== 'undefined' ? PROPERTIES : [])),
        EMPREENDIMENTOS: JSON.parse(JSON.stringify(typeof EMPREENDIMENTOS !== 'undefined' ? EMPREENDIMENTOS : [])),
        FAQS:         JSON.parse(JSON.stringify(typeof FAQS !== 'undefined' ? FAQS : [])),
        DEPOIMENTOS:  JSON.parse(JSON.stringify(typeof DEPOIMENTOS !== 'undefined' ? DEPOIMENTOS : [])),
        PARCEIROS:    JSON.parse(JSON.stringify(typeof PARCEIROS !== 'undefined' ? PARCEIROS : [])),
        BLOG_POSTS:   JSON.parse(JSON.stringify(typeof BLOG_POSTS !== 'undefined' ? BLOG_POSTS : [])),
        TEAM:         JSON.parse(JSON.stringify(typeof TEAM !== 'undefined' ? TEAM : [])),
        SERVICES:     JSON.parse(JSON.stringify(typeof SERVICES !== 'undefined' ? SERVICES : [])),
        LOCATIONS_INFO: JSON.parse(JSON.stringify(typeof LOCATIONS_INFO !== 'undefined' ? LOCATIONS_INFO : {}))
      };
      var contentEl = document.getElementById('adminContent');
      if (contentEl) contentEl.innerHTML = '<p id="adminLoading" style="color:rgba(255,255,255,0.3);padding:1rem;font-size:0.85rem;">Carregando…</p>';
      buildSidebar();
      var initialTab = window._redirectTab || 'general';
      queueTabShow(initialTab);
    } catch(e) { console.error('Admin init error:', e); }
  }
  function replaceArr(obj, key, arr) {
    obj[key].length = 0;
    arr.forEach(function(i) { obj[key].push(i); });
  }

  function queueTabShow(id, attempt) {
    attempt = attempt || 0;
    if (attempt > 15) {
      var c = document.getElementById('adminContent');
      if (c) c.innerHTML = '<div class="admin-section active" style="display:block;padding:2rem;text-align:center;"><p style="color:#ff6b6b;">⚠️ Erro ao carregar painel. <button onclick="location.reload()" style="background:#d4af37;border:none;color:#0e142e;padding:0.4rem 1rem;border-radius:5px;cursor:pointer;">Recarregar</button></p></div>';
      return;
    }
    if (typeof window.showTab !== 'function') {
      return setTimeout(function() { queueTabShow(id, attempt + 1); }, 50);
    }
    try {
      window.showTab(id);
      var el = document.getElementById('adminSection_' + id);
      if (el && el.childNodes.length > 0) {
        var loadingEl = document.getElementById('adminLoading');
        if (loadingEl) loadingEl.remove();
        return;
      }
    } catch(e) {}
    setTimeout(function() { queueTabShow(id, attempt + 1); }, 100);
  }

  function extractConstants() {
    var map = {};
    if (typeof WHATSAPP_NUMBER !== 'undefined') map.WHATSAPP_NUMBER = WHATSAPP_NUMBER;
    if (typeof WHATSAPP_DISPLAY !== 'undefined') map.WHATSAPP_DISPLAY = WHATSAPP_DISPLAY;
    if (typeof WHATSAPP_MSG !== 'undefined') map.WHATSAPP_MSG = WHATSAPP_MSG;
    if (typeof SITE_NAME !== 'undefined') map.SITE_NAME = SITE_NAME;
    if (typeof SITE_EMAIL !== 'undefined') map.SITE_EMAIL = SITE_EMAIL;
    if (typeof SITE_ADDRESS !== 'undefined') map.SITE_ADDRESS = SITE_ADDRESS;
    if (typeof SITE_LOGO !== 'undefined') map.SITE_LOGO = SITE_LOGO;
    if (typeof LOGO_MAX_HEIGHT !== 'undefined') map.LOGO_MAX_HEIGHT = LOGO_MAX_HEIGHT;
    if (typeof LOGO_MAX_WIDTH !== 'undefined') map.LOGO_MAX_WIDTH = LOGO_MAX_WIDTH;
    if (typeof LOGO_MARGIN !== 'undefined') map.LOGO_MARGIN = LOGO_MARGIN;
    if (typeof SITE_URL !== 'undefined') map.SITE_URL = SITE_URL;
    if (typeof SITE_CITY !== 'undefined') map.SITE_CITY = SITE_CITY;
    if (typeof SITE_REGION !== 'undefined') map.SITE_REGION = SITE_REGION;
    if (typeof SITE_MAPS !== 'undefined') map.SITE_MAPS = SITE_MAPS;
    map.HERO_EYEBROW  = typeof HERO_EYEBROW !== 'undefined' ? HERO_EYEBROW : 'Seu lar começa aqui';
    map.HERO_TITLE    = typeof HERO_TITLE !== 'undefined' ? HERO_TITLE : 'Furpal Assessoria Imobiliária';
    map.HERO_SUBTITLE = typeof HERO_SUBTITLE !== 'undefined' ? HERO_SUBTITLE : '';
    map.HERO_VIDEO    = typeof HERO_VIDEO !== 'undefined' ? HERO_VIDEO : '';
    map.SECTION_SOBRE_EYEBROW   = typeof SECTION_SOBRE_EYEBROW !== 'undefined' ? SECTION_SOBRE_EYEBROW : 'Quem somos';
    map.SECTION_SOBRE_TITLE     = typeof SECTION_SOBRE_TITLE !== 'undefined' ? SECTION_SOBRE_TITLE : '';
    map.SECTION_SOBRE_P1        = typeof SECTION_SOBRE_P1 !== 'undefined' ? SECTION_SOBRE_P1 : '';
    map.SECTION_SOBRE_P2        = typeof SECTION_SOBRE_P2 !== 'undefined' ? SECTION_SOBRE_P2 : '';
    map.SECTION_SOBRE_P3        = typeof SECTION_SOBRE_P3 !== 'undefined' ? SECTION_SOBRE_P3 : '';
    map.SOBRE_VIDEO             = typeof SOBRE_VIDEO !== 'undefined' ? SOBRE_VIDEO : '/video/sobre.mp4';
    map.SECTION_COMPRAR_EYEBROW = typeof SECTION_COMPRAR_EYEBROW !== 'undefined' ? SECTION_COMPRAR_EYEBROW : 'Imóveis à venda';
    map.SECTION_COMPRAR_TITLE   = typeof SECTION_COMPRAR_TITLE !== 'undefined' ? SECTION_COMPRAR_TITLE : '';
    map.SECTION_ALUGAR_EYEBROW  = typeof SECTION_ALUGAR_EYEBROW !== 'undefined' ? SECTION_ALUGAR_EYEBROW : 'Imóveis para alugar';
    map.SECTION_ALUGAR_TITLE    = typeof SECTION_ALUGAR_TITLE !== 'undefined' ? SECTION_ALUGAR_TITLE : '';
    map.SECTION_LANCAMENTOS_EYEBROW = typeof SECTION_LANCAMENTOS_EYEBROW !== 'undefined' ? SECTION_LANCAMENTOS_EYEBROW : 'Lançamentos';
    map.SECTION_LANCAMENTOS_TITLE   = typeof SECTION_LANCAMENTOS_TITLE !== 'undefined' ? SECTION_LANCAMENTOS_TITLE : '';
    map.SECTION_CONTATO_EYEBROW = typeof SECTION_CONTATO_EYEBROW !== 'undefined' ? SECTION_CONTATO_EYEBROW : 'Fale conosco';
    map.SECTION_CONTATO_TITLE   = typeof SECTION_CONTATO_TITLE !== 'undefined' ? SECTION_CONTATO_TITLE : '';
    map.SECTION_PARCEIROS_EYEBROW = typeof SECTION_PARCEIROS_EYEBROW !== 'undefined' ? SECTION_PARCEIROS_EYEBROW : 'Parceiros';
    map.SECTION_PARCEIROS_TITLE   = typeof SECTION_PARCEIROS_TITLE   !== 'undefined' ? SECTION_PARCEIROS_TITLE   : 'Instituições que confiam em nós';
    map.SECTION_SERVICOS_EYEBROW  = typeof SECTION_SERVICOS_EYEBROW  !== 'undefined' ? SECTION_SERVICOS_EYEBROW  : 'Serviços';
    map.SECTION_SERVICOS_TITLE    = typeof SECTION_SERVICOS_TITLE    !== 'undefined' ? SECTION_SERVICOS_TITLE    : 'Tudo que você precisa em um só lugar';
    map.SECTION_DEPOIMENTOS_EYEBROW = typeof SECTION_DEPOIMENTOS_EYEBROW !== 'undefined' ? SECTION_DEPOIMENTOS_EYEBROW : 'Depoimentos';
    map.SECTION_DEPOIMENTOS_TITLE   = typeof SECTION_DEPOIMENTOS_TITLE   !== 'undefined' ? SECTION_DEPOIMENTOS_TITLE   : 'O que nossos clientes dizem';
    map.SECTION_FAQ_EYEBROW  = typeof SECTION_FAQ_EYEBROW  !== 'undefined' ? SECTION_FAQ_EYEBROW  : 'FAQ';
    map.SECTION_FAQ_TITLE    = typeof SECTION_FAQ_TITLE    !== 'undefined' ? SECTION_FAQ_TITLE    : 'Perguntas frequentes';
    map.SECTION_MAPA_EYEBROW = typeof SECTION_MAPA_EYEBROW !== 'undefined' ? SECTION_MAPA_EYEBROW : 'Mapa de Imóveis';
    map.SECTION_MAPA_TITLE   = typeof SECTION_MAPA_TITLE   !== 'undefined' ? SECTION_MAPA_TITLE   : 'Encontre no mapa';
    map.SECTION_BLOG_EYEBROW = typeof SECTION_BLOG_EYEBROW !== 'undefined' ? SECTION_BLOG_EYEBROW : 'Blog';
    map.SECTION_BLOG_TITLE   = typeof SECTION_BLOG_TITLE   !== 'undefined' ? SECTION_BLOG_TITLE   : 'Últimas do blog';
    map.SECTION_FAVORITOS_EYEBROW = typeof SECTION_FAVORITOS_EYEBROW !== 'undefined' ? SECTION_FAVORITOS_EYEBROW : 'Favoritos';
    map.SECTION_FAVORITOS_TITLE   = typeof SECTION_FAVORITOS_TITLE   !== 'undefined' ? SECTION_FAVORITOS_TITLE   : 'Meus imóveis favoritos';
    map.SECTION_FAVORITOS_EMPTY   = typeof SECTION_FAVORITOS_EMPTY   !== 'undefined' ? SECTION_FAVORITOS_EMPTY   : 'Nenhum imóvel favoritado ainda.';
    map.DISABLED_SECTIONS = typeof DISABLED_SECTIONS !== 'undefined' ? DISABLED_SECTIONS.slice() : [];
    map.SOCIAL = typeof SOCIAL !== 'undefined' ? JSON.parse(JSON.stringify(SOCIAL)) : { instagram:'', facebook:'', youtube:'', linkedin:'' };
    map.PAGE_SIZE = typeof PAGE_SIZE !== 'undefined' ? PAGE_SIZE : 6;
    map.FIN_DEFAULT_PRICE = typeof FIN_DEFAULT_PRICE !== 'undefined' ? FIN_DEFAULT_PRICE : 500000;
    map.FIN_DEFAULT_DOWN  = typeof FIN_DEFAULT_DOWN  !== 'undefined' ? FIN_DEFAULT_DOWN  : 100000;
    map.FIN_DEFAULT_RATE  = typeof FIN_DEFAULT_RATE  !== 'undefined' ? FIN_DEFAULT_RATE  : 8.5;
    map.FIN_DEFAULT_TERM  = typeof FIN_DEFAULT_TERM  !== 'undefined' ? FIN_DEFAULT_TERM  : 240;
    map.SECTION_FINANCIAMENTO_EYEBROW = typeof SECTION_FINANCIAMENTO_EYEBROW !== 'undefined' ? SECTION_FINANCIAMENTO_EYEBROW : 'Financiamento';
    map.SECTION_FINANCIAMENTO_TITLE   = typeof SECTION_FINANCIAMENTO_TITLE   !== 'undefined' ? SECTION_FINANCIAMENTO_TITLE   : 'Simule seu financiamento imobiliário';
    map.SECTION_STATS_EYEBROW   = typeof SECTION_STATS_EYEBROW   !== 'undefined' ? SECTION_STATS_EYEBROW   : 'Equipe';
    map.SECTION_STATS_TITLE     = typeof SECTION_STATS_TITLE     !== 'undefined' ? SECTION_STATS_TITLE     : '';
    map.SECTION_PRIVACIDADE_EYEBROW = typeof SECTION_PRIVACIDADE_EYEBROW !== 'undefined' ? SECTION_PRIVACIDADE_EYEBROW : 'LGPD';
    map.SECTION_PRIVACIDADE_TITLE   = typeof SECTION_PRIVACIDADE_TITLE   !== 'undefined' ? SECTION_PRIVACIDADE_TITLE   : 'Política de Privacidade';
    return map;
  }

  var _adminTabs = [];

  function buildSidebar() {
    _adminTabs = [
      { id:'general', label:'⚙️ Geral' },
      { id:'sobre', label:'🏡 Sobre' },
      { id:'servicos', label:'🧰 Serviços' },
      { id:'financiamento', label:'💰 Financiamento' },
      { id:'properties', label:'🏠 Imóveis' },
      { id:'empreendimentos', label:'🏗️ Lançamentos' },
      { id:'blog', label:'📝 Blog' },
      { id:'faq', label:'❓ FAQ' },
      { id:'depoimentos', label:'💬 Depoimentos' },
      { id:'parceiros', label:'🤝 Parceiros' },
      { id:'team', label:'👥 Equipe' },
      { id:'region', label:'📍 Região' },
      { id:'settings', label:'🔑 Config' }
    ];
    var sb = document.getElementById('adminSidebar');
    sb.innerHTML = '';
    // Desktop buttons
    _adminTabs.forEach(function(t) {
      var btn = document.createElement('button');
      btn.className = 'admin-desk-tab';
      btn.textContent = t.label;
      btn.dataset.tab = t.id;
      btn.addEventListener('click', function() { window.showTab(t.id); });
      sb.appendChild(btn);
    });
    // Mobile dropdown
    var sel = document.createElement('select');
    sel.id = 'adminMobileTab';
    sel.className = 'admin-mobile-tab';
    sel.addEventListener('change', function() { window.showTab(this.value); });
    _adminTabs.forEach(function(t) {
      var opt = document.createElement('option');
      opt.value = t.id;
      opt.textContent = t.label.replace(/[^\w\s]/g, '').trim();
      sel.appendChild(opt);
    });
    sb.appendChild(sel);
  }

  window.showTab = function(id) {
    document.querySelectorAll('#adminSidebar button').forEach(function(b) { b.classList.remove('active'); });
    document.querySelectorAll('.admin-section').forEach(function(s) { s.classList.remove('active'); });
    var btn = document.querySelector('#adminSidebar button[data-tab="' + id + '"]');
    if (btn) btn.classList.add('active');
    var mobSel = document.getElementById('adminMobileTab');
    if (mobSel) mobSel.value = id;
    var section = document.getElementById('adminSection_' + id);
    if (!section) {
      try { renderTab(id); } catch(e) {
        console.error('Admin renderTab error:', e);
        var container = document.getElementById('adminContent');
        if (container) {
          var fallback = document.createElement('div');
          fallback.id = 'adminSection_' + id;
          fallback.className = 'admin-section active';
          fallback.innerHTML = '<p style="color:#ff6b6b;">Erro: ' + e.message + '</p><pre style="color:rgba(255,255,255,0.5);font-size:0.75rem;max-width:100%;overflow:auto;">' + esc(e.stack) + '</pre>';
          container.appendChild(fallback);
        }
      }
    }
    var el = document.getElementById('adminSection_' + id);
    if (el) el.classList.add('active');
  };

  function renderTab(id) {
    var container = document.getElementById('adminContent');
    if (!container) return;
    var div = document.createElement('div');
    div.id = 'adminSection_' + id;
    div.className = 'admin-section';
    container.appendChild(div);
    try {
      switch (id) {
        case 'general': renderGeneral(div); break;
        case 'sobre': renderSobre(div); break;
        case 'servicos': renderServicos(div); break;
        case 'financiamento': renderFinanciamento(div); break;
        case 'properties': renderProperties(div); break;
        case 'empreendimentos': renderEmpreendimentos(div); break;
        case 'blog': renderBlog(div); break;
        case 'faq': renderFaq(div); break;
        case 'depoimentos': renderAdminDepoimentos(div); break;
        case 'parceiros': renderAdminParceiros(div); break;
        case 'team': renderAdminTeam(div); break;
        case 'region': renderAdminRegion(div); break;
        case 'settings': renderSettings(div); break;
      }
    } catch(e) {
      console.error('Admin renderTab/' + id + ' error:', e);
      div.innerHTML = '<p style="color:#ff6b6b;">Erro: ' + esc(e.message) + '</p>';
    }
  }

  /* =================================================================
     GENERAL SETTINGS
     ================================================================= */
  function renderGeneral(container) {
    var c = _data.constants;
    container.innerHTML = '<h2>⚙️ Configurações Gerais</h2><p class="desc">Texto do site, redes sociais e seções visíveis.</p>'
      + '<div class="admin-settings">'
      + '<div class="row2"><div><label>Nome do site</label><input id="cfg_siteName" value="' + esc(c.SITE_NAME) + '"></div>'
      + '<div><label>URL do logo (imagem)' + uploadBtn('cfg_logo', 'images') + '</label><input id="cfg_logo" value="' + esc(c.SITE_LOGO||'') + '" placeholder="https://...svg ou png"></div></div>'
      + '<div class="row3"><div><label>Logo — altura máx</label><input id="cfg_logoH" value="' + esc(c.LOGO_MAX_HEIGHT||'') + '" placeholder="2rem"></div>'
      + '<div><label>Logo — largura máx</label><input id="cfg_logoW" value="' + esc(c.LOGO_MAX_WIDTH||'') + '" placeholder="200px"></div>'
      + '<div><label>Logo — margem</label><input id="cfg_logoM" value="' + esc(c.LOGO_MARGIN||'') + '" placeholder="0"></div></div>'
      + '<label>WhatsApp — Número (só dígitos)</label><input id="cfg_whatsNum" value="' + esc(c.WHATSAPP_NUMBER) + '">'
      + '<label>WhatsApp — Display</label><input id="cfg_whatsDisp" value="' + esc(c.WHATSAPP_DISPLAY) + '">'
      + '<label>WhatsApp — Mensagem padrão (use {titulo} e {preco})</label><textarea id="cfg_whatsMsg" rows="2">' + esc(c.WHATSAPP_MSG) + '</textarea>'
      + '<div class="row3"><div><label>Email</label><input id="cfg_email" value="' + esc(c.SITE_EMAIL) + '"></div>'
      + '<div><label>URL do site</label><input id="cfg_siteUrl" value="' + esc(c.SITE_URL||'') + '" placeholder="https://..."></div>'
      + '<div><label>Cidade</label><input id="cfg_city" value="' + esc(c.SITE_CITY||'') + '"></div></div>'
      + '<div class="row2"><div><label>Endereço</label><input id="cfg_address" value="' + esc(c.SITE_ADDRESS) + '"></div>'
      + '<div><label>Estado</label><input id="cfg_region" value="' + esc(c.SITE_REGION||'') + '"></div></div>'
      + '<label>URL do Maps (direção)</label><input id="cfg_maps" value="' + esc(c.SITE_MAPS||'') + '" placeholder="https://maps.app.goo.gl/...">'
      + '<hr style="border-color:rgba(255,255,255,0.06);margin:1rem 0;">'
      + '<label>Hero — Eyebrow</label><input id="cfg_heroEye" value="' + esc(c.HERO_EYEBROW) + '">'
      + '<label>Hero — Título</label><textarea id="cfg_heroTitle" rows="2">' + esc(c.HERO_TITLE) + '</textarea>'
      + '<label>Hero — Subtítulo</label><textarea id="cfg_heroSub" rows="2">' + esc(c.HERO_SUBTITLE) + '</textarea>'
      + '<label>Hero — URL do vídeo MP4 (opcional)' + uploadBtn('cfg_heroVideo', 'videos') + '</label><input id="cfg_heroVideo" value="' + esc(c.HERO_VIDEO) + '" placeholder="https://...mp4">'
      + '<hr style="border-color:rgba(255,255,255,0.06);margin:1rem 0;">'
      + '<div class="row2"><div><label>Instagram (URL)</label><input id="cfg_ig" value="' + esc(c.SOCIAL.instagram || '') + '"></div>'
      + '<div><label>Facebook (URL)</label><input id="cfg_fb" value="' + esc(c.SOCIAL.facebook || '') + '"></div></div>'
      + '<div class="row2"><div><label>YouTube (URL)</label><input id="cfg_yt" value="' + esc(c.SOCIAL.youtube || '') + '"></div>'
      + '<div><label>LinkedIn (URL)</label><input id="cfg_li" value="' + esc(c.SOCIAL.linkedin || '') + '"></div></div>'
      + '<hr style="border-color:rgba(255,255,255,0.06);margin:1rem 0;">'
      + '<h3 style="color:#d4af37;font-size:0.9rem;margin:0 0 1rem;">📝 Textos das Seções</h3>'
      + '<div class="row2">'
      + '<div><label>Sobre — Eyebrow</label><input id="cfg_sobreEye" value="' + esc(c.SECTION_SOBRE_EYEBROW||'') + '"><label>Sobre — Título</label><input id="cfg_sobreTitle" value="' + esc(c.SECTION_SOBRE_TITLE||'') + '"></div>'
      + '<div><label>Serviços — Eyebrow</label><input id="cfg_servEye" value="' + esc(c.SECTION_SERVICOS_EYEBROW||'') + '"><label>Serviços — Título</label><input id="cfg_servTitle" value="' + esc(c.SECTION_SERVICOS_TITLE||'') + '"></div>'
      + '</div>'
      + '<div class="row2">'
      + '<div><label>Comprar — Eyebrow</label><input id="cfg_comprarEye" value="' + esc(c.SECTION_COMPRAR_EYEBROW||'') + '"><label>Comprar — Título</label><input id="cfg_comprarTitle" value="' + esc(c.SECTION_COMPRAR_TITLE||'') + '"></div>'
      + '<div><label>Alugar — Eyebrow</label><input id="cfg_alugarEye" value="' + esc(c.SECTION_ALUGAR_EYEBROW||'') + '"><label>Alugar — Título</label><input id="cfg_alugarTitle" value="' + esc(c.SECTION_ALUGAR_TITLE||'') + '"></div>'
      + '</div>'
      + '<div class="row2">'
      + '<div><label>Lançamentos — Eyebrow</label><input id="cfg_lancEye" value="' + esc(c.SECTION_LANCAMENTOS_EYEBROW||'') + '"><label>Lançamentos — Título</label><input id="cfg_lancTitle" value="' + esc(c.SECTION_LANCAMENTOS_TITLE||'') + '"></div>'
      + '<div><label>Financiamento — Eyebrow</label><input id="cfg_finEye" value="' + esc(c.SECTION_FINANCIAMENTO_EYEBROW||'') + '"><label>Financiamento — Título</label><input id="cfg_finTitle" value="' + esc(c.SECTION_FINANCIAMENTO_TITLE||'') + '"></div>'
      + '</div>'
      + '<div class="row2">'
      + '<div><label>Contato — Eyebrow</label><input id="cfg_contEye" value="' + esc(c.SECTION_CONTATO_EYEBROW||'') + '"><label>Contato — Título</label><input id="cfg_contTitle" value="' + esc(c.SECTION_CONTATO_TITLE||'') + '"></div>'
      + '<div><label>Parceiros — Eyebrow</label><input id="cfg_parcEye" value="' + esc(c.SECTION_PARCEIROS_EYEBROW||'') + '"><label>Parceiros — Título</label><input id="cfg_parcTitle" value="' + esc(c.SECTION_PARCEIROS_TITLE||'') + '"></div>'
      + '</div>'
      + '<div class="row2">'
      + '<div><label>Depoimentos — Eyebrow</label><input id="cfg_depEye" value="' + esc(c.SECTION_DEPOIMENTOS_EYEBROW||'') + '"><label>Depoimentos — Título</label><input id="cfg_depTitle" value="' + esc(c.SECTION_DEPOIMENTOS_TITLE||'') + '"></div>'
      + '<div><label>FAQ — Eyebrow</label><input id="cfg_faqEye" value="' + esc(c.SECTION_FAQ_EYEBROW||'') + '"><label>FAQ — Título</label><input id="cfg_faqTitle" value="' + esc(c.SECTION_FAQ_TITLE||'') + '"></div>'
      + '</div>'
      + '<div class="row2">'
      + '<div><label>Mapa — Eyebrow</label><input id="cfg_mapEye" value="' + esc(c.SECTION_MAPA_EYEBROW||'') + '"><label>Mapa — Título</label><input id="cfg_mapTitle" value="' + esc(c.SECTION_MAPA_TITLE||'') + '"></div>'
      + '<div><label>Blog — Eyebrow</label><input id="cfg_blogEye" value="' + esc(c.SECTION_BLOG_EYEBROW||'') + '"><label>Blog — Título</label><input id="cfg_blogTitle" value="' + esc(c.SECTION_BLOG_TITLE||'') + '"></div>'
      + '</div>'
      + '<div class="row2">'
      + '<div><label>Favoritos — Eyebrow</label><input id="cfg_favEye" value="' + esc(c.SECTION_FAVORITOS_EYEBROW||'') + '"><label>Favoritos — Título</label><input id="cfg_favTitle" value="' + esc(c.SECTION_FAVORITOS_TITLE||'') + '"></div>'
      + '<div><label>Favoritos — Texto vazio</label><input id="cfg_favEmpty" value="' + esc(c.SECTION_FAVORITOS_EMPTY||'') + '"></div>'
      + '</div>'
      + '<div class="row2">'
      + '<div><label>Equipe (stats) — Eyebrow</label><input id="cfg_statsEye" value="' + esc(c.SECTION_STATS_EYEBROW||'') + '"><label>Equipe (stats) — Título</label><input id="cfg_statsTitle" value="' + esc(c.SECTION_STATS_TITLE||'') + '"></div>'
      + '<div><label>Privacidade — Eyebrow</label><input id="cfg_privEye" value="' + esc(c.SECTION_PRIVACIDADE_EYEBROW||'') + '"><label>Privacidade — Título</label><input id="cfg_privTitle" value="' + esc(c.SECTION_PRIVACIDADE_TITLE||'') + '"></div>'
      + '</div>'
      + '<hr style="border-color:rgba(255,255,255,0.06);margin:1rem 0;">'
      + '<label>Seções desabilitadas (IDs separados por vírgula)</label><input id="cfg_disabled" value="' + esc((c.DISABLED_SECTIONS||[]).join(', ')) + '">'
      + '<div class="note">Disponíveis: sobre, stats, servicos, depoimentos, parceiros, faq, financiamento, alugar, favoritos</div>'
      + '<label>Imóveis por página</label><input id="cfg_pageSize" value="' + (c.PAGE_SIZE || 6) + '" style="max-width:100px;">'
      + '<hr style="border-color:rgba(255,255,255,0.06);margin:1rem 0;">'
      + '<button class="btn-save" onclick="saveGeneral()">💾 Salvar alterações</button>'
      + '</div>';
  }

  window.saveGeneral = function() {
    try { saveFormsToData(); } catch(e) {}
    syncToLive();
    adminSaveServer();
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
      description: '', maps: '', lat: -26.99, lng: -48.63,
      front: 0, back: 0, zone: '', topography: ''
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
      + '<div><label>Categoria</label><select id="prop_cat"><option value="Apartamento"' + (p.category==='Apartamento'?' selected':'') + '>Apartamento</option><option value="Casa"' + (p.category==='Casa'?' selected':'') + '>Casa</option><option value="Cobertura"' + (p.category==='Cobertura'?' selected':'') + '>Cobertura</option><option value="Kitnet/Studio"' + (p.category==='Kitnet/Studio'?' selected':'') + '>Kitnet/Studio</option><option value="Comercial"' + (p.category==='Comercial'?' selected':'') + '>Comercial</option><option value="Terreno/Lote"' + (p.category==='Terreno/Lote'?' selected':'') + '>Terreno/Lote</option></select></div>'
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
      + '<div class="row4"><div><label>Metros frente (terreno)</label><input id="prop_front" type="number" step="any" value="' + (p.front||'') + '"></div>'
      + '<div><label>Metros fundo (terreno)</label><input id="prop_back" type="number" step="any" value="' + (p.back||'') + '"></div>'
      + '<div><label>Zona (terreno)</label><select id="prop_zone"><option value="" ' + (!p.zone?'selected':'') + '></option><option value="Urbana"' + (p.zone==='Urbana'?' selected':'') + '>Urbana</option><option value="Rural"' + (p.zone==='Rural'?' selected':'') + '>Rural</option></select></div>'
      + '<div><label>Topografia (terreno)</label><select id="prop_topography"><option value="" ' + (!p.topography?'selected':'') + '></option><option value="Plana"' + (p.topography==='Plana'?' selected':'') + '>Plana</option><option value="Aclive"' + (p.topography==='Aclive'?' selected':'') + '>Aclive</option><option value="Declive"' + (p.topography==='Declive'?' selected':'') + '>Declive</option></select></div></div>'
      + '<label>URL do Maps</label><input id="prop_maps" value="' + esc(p.maps||'') + '">'
      + '<label>Descrição curta (card)</label><textarea id="prop_desc" rows="2">' + esc(p.desc||'') + '</textarea>'
      + '<label>Descrição longa (detalhes)</label><textarea id="prop_description" rows="4">' + esc(p.description||'') + '</textarea>'
      + '<label>URL da imagem principal' + uploadBtn('prop_img', 'images/properties') + '</label><input id="prop_img" value="' + esc(p.img) + '">'
      + '<label>URL do vídeo' + uploadBtn('prop_video', 'videos') + '</label><input id="prop_video" value="' + esc(p.video||'') + '">'
      + '<label>Galeria (URLs, uma por linha)' + uploadBtn('prop_gallery', 'images/properties') + '</label><textarea id="prop_gallery" rows="3">' + ((p.gallery||[]).join('\n')) + '</textarea>'
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
        p.front = parseFloat(gv('prop_front')) || undefined;
        p.back = parseFloat(gv('prop_back')) || undefined;
        p.zone = gv('prop_zone') || undefined;
        p.topography = gv('prop_topography') || undefined;
        p.desc = gv('prop_desc');
        p.description = gv('prop_description');
        p.img = gv('prop_img');
        p.video = gv('prop_video');
        p.gallery = gv('prop_gallery').split('\n').map(function(s){ return s.trim(); }).filter(Boolean);
        p.features = gv('prop_features').split('\n').map(function(s){ return s.trim(); }).filter(Boolean);
        syncToLive();
        adminToast('✅ Imóvel salvo', 'success');
        renderProperties(document.getElementById('adminSection_properties'));
      }
    );
  };

  window.delProperty = function(idx) {
    if (!confirm('Excluir ' + jq(_data.PROPERTIES[idx].title) + '?')) return;
    _data.PROPERTIES.splice(idx, 1);
    syncToLive();
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

  var EMP_ROW_STYLE = 'border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:0.75rem;margin-bottom:0.75rem;background:rgba(255,255,255,0.02);';
  var EMP_DEL_BTN = 'padding:0.3rem 0.65rem;border-radius:5px;border:1px solid rgba(255,80,80,0.2);background:rgba(255,255,255,0.03);color:#ff6b6b;font-size:0.75rem;cursor:pointer;';
  var EMP_ADD_BTN = 'margin:0;padding:0.35rem 0.9rem;';

  function empRowHtml(type, item) {
    item = item || {};
    if (type === 'timeline') {
      return '<div class="emp-row" style="' + EMP_ROW_STYLE + '">'
        + '<div style="display:flex;justify-content:flex-end;margin-bottom:0.25rem;"><button class="btn-del" type="button" style="' + EMP_DEL_BTN + '" onclick="delEmpRow(\'timeline\', this)">🗑️ Excluir</button></div>'
        + '<div class="row2"><div><label>Data</label><input class="f-date" value="' + esc(item.date || '') + '" placeholder="ex: Jan 2025"></div>'
        + '<div><label>Título da etapa</label><input class="f-title" value="' + esc(item.title || '') + '" placeholder="ex: Início das obras"></div></div>'
        + '<label>Descrição</label><textarea class="f-desc" rows="2" placeholder="Detalhe o que acontece nesta etapa">' + esc(item.desc || '') + '</textarea>'
        + '</div>';
    }
    if (type === 'prices') {
      return '<div class="emp-row" style="' + EMP_ROW_STYLE + '">'
        + '<div style="display:flex;justify-content:flex-end;margin-bottom:0.25rem;"><button class="btn-del" type="button" style="' + EMP_DEL_BTN + '" onclick="delEmpRow(\'prices\', this)">🗑️ Excluir</button></div>'
        + '<div class="row3"><div><label>Unidade / Tipo</label><input class="f-unit" value="' + esc(item.unit || '') + '" placeholder="ex: 3 quartos (suíte)"></div>'
        + '<div><label>Área</label><input class="f-area" value="' + esc(item.area || '') + '" placeholder="ex: 145 m²"></div>'
        + '<div><label>Valor</label><input class="f-value" value="' + esc(item.value || '') + '" placeholder="ex: R$ 1.380.000"></div></div>'
        + '<label style="display:flex;align-items:center;gap:0.4rem;margin-top:0.6rem;text-transform:none;letter-spacing:0;cursor:pointer;"><input type="checkbox" class="f-highlight" style="width:auto;height:auto;flex:none;" ' + (item.highlight ? 'checked' : '') + '> <span style="font-size:0.82rem;color:rgba(255,255,255,0.6);">Destacar esta linha na tabela</span></label>'
        + '</div>';
    }
    return '<div class="emp-row" style="' + EMP_ROW_STYLE + '">'
      + '<div style="display:flex;justify-content:flex-end;margin-bottom:0.25rem;"><button class="btn-del" type="button" style="' + EMP_DEL_BTN + '" onclick="delEmpRow(\'payment\', this)">🗑️ Excluir</button></div>'
      + '<div class="row2"><div><label>Etiqueta</label><input class="f-label" value="' + esc(item.label || '') + '" placeholder="ex: Entrada"></div>'
      + '<div><label>Valor / Condição</label><input class="f-pvalue" value="' + esc(item.value || '') + '" placeholder="ex: 30%"></div></div>'
      + '</div>';
  }

  function empRowsHtml(type, items) {
    if (!items || items.length === 0) return '<p class="emp-empty" style="color:rgba(255,255,255,0.35);font-size:0.8rem;margin:0;">Nenhum item ainda — clique em "+ Agregar" abaixo.</p>';
    return items.map(function(it) { return empRowHtml(type, it); }).join('');
  }

  function collectEmpRows(type) {
    var out = [];
    var rows = document.querySelectorAll('#emp_rows_' + type + ' .emp-row');
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      if (type === 'timeline') {
        var d = row.querySelector('.f-date').value.trim();
        var t = row.querySelector('.f-title').value.trim();
        var desc = row.querySelector('.f-desc').value.trim();
        if (t || d) out.push({ date: d, title: t, desc: desc });
      } else if (type === 'prices') {
        var unit = row.querySelector('.f-unit').value.trim();
        var area = row.querySelector('.f-area').value.trim();
        var value = row.querySelector('.f-value').value.trim();
        if (unit || value) {
          var o = { unit: unit, area: area, value: value };
          if (row.querySelector('.f-highlight').checked) o.highlight = true;
          out.push(o);
        }
      } else {
        var label = row.querySelector('.f-label').value.trim();
        var pv = row.querySelector('.f-pvalue').value.trim();
        if (label || pv) out.push({ label: label, value: pv });
      }
    }
    return out;
  }

  window.addEmpRow = function(type) {
    var cont = document.getElementById('emp_rows_' + type);
    if (!cont) return;
    if (!cont.querySelector('.emp-row')) cont.innerHTML = '';
    cont.insertAdjacentHTML('beforeend', empRowHtml(type));
  };

  window.delEmpRow = function(type, btn) {
    var row = btn.closest('.emp-row');
    if (!row) return;
    var cont = row.parentNode;
    row.remove();
    if (!cont.querySelector('.emp-row')) {
      cont.innerHTML = '<p class="emp-empty" style="color:rgba(255,255,255,0.35);font-size:0.8rem;margin:0;">Nenhum item ainda — clique em "+ Agregar" abaixo.</p>';
    }
  };

  window.addEmp = function() {
    _data.EMPREENDIMENTOS.push({
      id: 'emp-' + Date.now(),
      title: 'Novo Lançamento', location: 'Balneário Camboriú — SC',
      price: 'A partir de R$ 0', priceNum: 0, status: 'lancamento',
      description: '', img: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80'],
      video: '', tags: ['LANÇAMENTO'], progress: 0, progressLabel: '0%',
      delivery: '', plants: [], timeline: [], amenities: [], prices: [], payment: [],
      lat: -26.99, lng: -48.63, address: '', beachDistance: '', maps: ''
    });
    editEmp(_data.EMPREENDIMENTOS.length - 1);
  };

  window.editEmp = function(idx) {
    var e = _data.EMPREENDIMENTOS[idx];
    if (!e) return;
    openModal('✏️ Editar Lançamento',
      '<div class="row2"><div><label>Título</label><input id="emp_title" value="' + esc(e.title) + '"></div>'
      + '<div><label>ID</label><input id="emp_id" value="' + esc(e.id) + '"></div></div>'
      + '<div class="row3"><div><label>Preço (texto)</label><input id="emp_price" value="' + esc(e.price) + '"></div>'
      + '<div><label>Preço (número)</label><input id="emp_priceNum" type="number" value="' + (e.priceNum||0) + '"></div>'
      + '<div><label>Progresso %</label><input id="emp_prog" type="number" value="' + (e.progress||0) + '"></div></div>'
      + '<div class="row3"><div><label>Progresso (rótulo)</label><input id="emp_progLabel" value="' + esc(e.progressLabel||'') + '" placeholder="ex: 72% vendidos">'
      + '</div><div><label>Previsão entrega</label><input id="emp_delivery" value="' + esc(e.delivery||'') + '" placeholder="ex: jun/2027">'
      + '</div><div><label>Tags (separadas por vírgula)</label><input id="emp_tags" value="' + esc((e.tags||[]).join(', ')) + '" placeholder="LANÇAMENTO, VISTA PARA O MAR"></div></div>'
      + '<label>Localização</label><input id="emp_loc" value="' + esc(e.location) + '">'
      + '<label>Endereço</label><input id="emp_address" value="' + esc(e.address||'') + '" placeholder="Av. Atlântica, 1500 — Centro, Balneário Camboriú — SC">'
      + '<div class="row2"><div><label>Distância da praia</label><input id="emp_beach" value="' + esc(e.beachDistance||'') + '" placeholder="200 m"></div>'
      + '<div><label>URL do Maps</label><input id="emp_maps" value="' + esc(e.maps||'') + '" placeholder="https://www.google.com/maps?q=..."></div></div>'
      + '<div class="row2"><div><label>Latitude</label><input id="emp_lat" type="number" step="any" value="' + (e.lat||'') + '"></div>'
      + '<div><label>Longitude</label><input id="emp_lng" type="number" step="any" value="' + (e.lng||'') + '"></div></div>'
      + '<label>Descrição</label><textarea id="emp_desc" rows="4">' + esc(e.description || '') + '</textarea>'
      + '<label>URL da imagem principal' + uploadBtn('emp_img', 'images/properties/lanzamentos') + '</label><input id="emp_img" value="' + esc(e.img) + '">'
      + '<label>URL do vídeo' + uploadBtn('emp_video', 'videos') + '</label><input id="emp_video" value="' + esc(e.video||'') + '">'
      + '<label>Galeria (URLs, uma por linha)' + uploadBtn('emp_gallery', 'images/properties/lanzamentos') + '</label><textarea id="emp_gallery" rows="3">' + ((e.gallery||[]).join('\n')) + '</textarea>'
      + '<label>Plantas (URLs, uma por linha)' + uploadBtn('emp_plants', 'images/properties/lanzamentos') + '</label><textarea id="emp_plants" rows="3">' + ((e.plants||[]).join('\n')) + '</textarea>'
      + '<label>Comodidades (uma por linha)</label><textarea id="emp_amenities" rows="4">' + ((e.amenities||[]).join('\n')) + '</textarea>'
      + '<div style="margin-top:1rem;border-top:1px solid rgba(255,255,255,0.06);padding-top:0.5rem;">'
      + '<div style="display:flex;justify-content:space-between;align-items:center;margin:0.75rem 0 0.25rem;"><h4 style="margin:0;color:#d4af37;font-size:0.9rem;font-weight:600;">🗓️ Cronograma de obras</h4><button class="btn-add" type="button" style="' + EMP_ADD_BTN + '" onclick="addEmpRow(\'timeline\')">+ Agregar etapa</button></div>'
      + '<p style="color:rgba(255,255,255,0.35);font-size:0.75rem;margin:0 0 0.5rem;">Cada linha é uma etapa do cronograma exibida no site.</p>'
      + '<div id="emp_rows_timeline">' + empRowsHtml('timeline', e.timeline) + '</div>'
      + '<div style="display:flex;justify-content:space-between;align-items:center;margin:1rem 0 0.25rem;"><h4 style="margin:0;color:#d4af37;font-size:0.9rem;font-weight:600;">💲 Tabela de preços</h4><button class="btn-add" type="button" style="' + EMP_ADD_BTN + '" onclick="addEmpRow(\'prices\')">+ Agregar linha</button></div>'
      + '<p style="color:rgba(255,255,255,0.35);font-size:0.75rem;margin:0 0 0.5rem;">Cada linha é um tipo de unidade com seu valor.</p>'
      + '<div id="emp_rows_prices">' + empRowsHtml('prices', e.prices) + '</div>'
      + '<div style="display:flex;justify-content:space-between;align-items:center;margin:1rem 0 0.25rem;"><h4 style="margin:0;color:#d4af37;font-size:0.9rem;font-weight:600;">📄 Condições de pagamento</h4><button class="btn-add" type="button" style="' + EMP_ADD_BTN + '" onclick="addEmpRow(\'payment\')">+ Agregar condição</button></div>'
      + '<p style="color:rgba(255,255,255,0.35);font-size:0.75rem;margin:0 0 0.5rem;">Ex: Entrada 30% / Durante a obra 48 parcelas / Chaves 70% financiamento.</p>'
      + '<div id="emp_rows_payment">' + empRowsHtml('payment', e.payment) + '</div>'
      + '</div>',
      function() {
        e.title = gv('emp_title');
        e.id = gv('emp_id');
        e.price = gv('emp_price');
        e.priceNum = parseFloat(gv('emp_priceNum')) || 0;
        e.location = gv('emp_loc');
        e.address = gv('emp_address');
        e.beachDistance = gv('emp_beach');
        e.maps = gv('emp_maps');
        e.lat = parseFloat(gv('emp_lat')) || -26.99;
        e.lng = parseFloat(gv('emp_lng')) || -48.63;
        e.description = gv('emp_desc');
        e.img = gv('emp_img');
        e.video = gv('emp_video');
        e.progress = parseInt(gv('emp_prog')) || 0;
        e.progressLabel = gv('emp_progLabel');
        e.delivery = gv('emp_delivery');
        e.tags = gv('emp_tags').split(',').map(function(s){ return s.trim(); }).filter(Boolean);
        e.gallery = gv('emp_gallery').split('\n').map(function(s){ return s.trim(); }).filter(Boolean);
        e.plants = gv('emp_plants').split('\n').map(function(s){ return s.trim(); }).filter(Boolean);
        e.amenities = gv('emp_amenities').split('\n').map(function(s){ return s.trim(); }).filter(Boolean);
        e.timeline = collectEmpRows('timeline');
        e.prices = collectEmpRows('prices');
        e.payment = collectEmpRows('payment');
        syncToLive();
        adminToast('✅ Lançamento salvo', 'success');
        renderEmpreendimentos(document.getElementById('adminSection_empreendimentos'));
      }
    );
  };

  window.delEmp = function(idx) {
    if (!confirm('Excluir ' + jq(_data.EMPREENDIMENTOS[idx].title) + '?')) return;
    _data.EMPREENDIMENTOS.splice(idx, 1);
    syncToLive();
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
      category: 'Dicas', author: 'Furpal Assessoria Imobiliária',
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
      + '<label>URL da imagem' + uploadBtn('post_img', 'images/blog') + '</label><input id="post_img" value="' + esc(b.image) + '">'
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
        syncToLive();
        adminToast('✅ Post salvo', 'success');
        renderBlog(document.getElementById('adminSection_blog'));
      }
    );
  };

  window.delPost = function(idx) {
    if (!confirm('Excluir ' + jq(_data.BLOG_POSTS[idx].title) + '?')) return;
    _data.BLOG_POSTS.splice(idx, 1);
    syncToLive();
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
        syncToLive();
        adminToast('✅ FAQ salva', 'success');
        renderFaq(document.getElementById('adminSection_faq'));
      }
    );
  };

  window.delFaq = function(idx) {
    if (!confirm('Excluir esta pergunta?')) return;
    _data.FAQS.splice(idx, 1);
    syncToLive();
    renderFaq(document.getElementById('adminSection_faq'));
    adminToast('🗑️ FAQ removida', 'info');
  };

  /* =================================================================
     DEPOIMENTOS
     ================================================================= */
  function renderAdminDepoimentos(container) {
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
    _data.DEPOIMENTOS.push({ text: '', name: 'Novo Cliente', role: '', photo: '', rating: 5 });
    editDep(_data.DEPOIMENTOS.length - 1);
  };

  window.editDep = function(idx) {
    var d = _data.DEPOIMENTOS[idx];
    var starsOpts = '';
    for (var s = 1; s <= 5; s++) {
      starsOpts += '<option value="' + s + '"' + ((parseInt(d.rating, 10) || 5) === s ? ' selected' : '') + '>' + s + ' estrela' + (s > 1 ? 's' : '') + '</option>';
    }
    openModal('✏️ Editar Depoimento',
      '<label>Nome</label><input id="dep_name" value="' + esc(d.name) + '">'
      + '<label>Descrição (ex: Compradora • Apartamento • BC)</label><input id="dep_role" value="' + esc(d.role||'') + '">'
      + '<label>Foto de perfil (URL)' + uploadBtn('dep_photo', 'images/depoimentos') + '</label><input id="dep_photo" value="' + esc(d.photo||'') + '">'
      + '<label>Estrelas (1 a 5)</label><select id="dep_rating">' + starsOpts + '</select>'
      + '<label>Texto</label><textarea id="dep_text" rows="4">' + esc(d.text) + '</textarea>',
      function() {
        d.name = gv('dep_name');
        d.role = gv('dep_role');
        d.photo = gv('dep_photo');
        d.rating = parseInt(gv('dep_rating'), 10) || 5;
        d.text = gv('dep_text');
        syncToLive();
        adminToast('✅ Depoimento salvo', 'success');
        renderAdminDepoimentos(document.getElementById('adminSection_depoimentos'));
      }
    );
  };

  window.delDep = function(idx) {
    if (!confirm('Excluir depoimento de ' + jq(_data.DEPOIMENTOS[idx].name) + '?')) return;
    _data.DEPOIMENTOS.splice(idx, 1);
    syncToLive();
    renderAdminDepoimentos(document.getElementById('adminSection_depoimentos'));
    adminToast('🗑️ Depoimento removido', 'info');
  };

  /* =================================================================
     PARCEIROS
     ================================================================= */
  function renderAdminParceiros(container) {
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
      + '<label>URL do logo' + uploadBtn('par_img', 'images/parceiros') + '</label><input id="par_img" value="' + esc(p.img||'') + '">'
      + '<label>Site</label><input id="par_url" value="' + esc(p.url||'') + '">',
      function() {
        p.name = gv('par_name');
        p.img = gv('par_img');
        p.url = gv('par_url');
        syncToLive();
        adminToast('✅ Parceiro salvo', 'success');
        renderAdminParceiros(document.getElementById('adminSection_parceiros'));
      }
    );
  };

  window.delParceiro = function(idx) {
    if (!confirm('Excluir ' + jq(_data.PARCEIROS[idx].name) + '?')) return;
    _data.PARCEIROS.splice(idx, 1);
    syncToLive();
    renderAdminParceiros(document.getElementById('adminSection_parceiros'));
    adminToast('🗑️ Parceiro removido', 'info');
  };

  /* =================================================================
     TEAM — Equipe
     ================================================================= */
  function renderAdminTeam(container) {
    var html = '<h2>👥 Equipe (' + _data.TEAM.length + ')</h2><p class="desc">Membros da equipe Furpal.</p>';
    html += '<button class="btn-add" onclick="addTeamMember()">+ Novo Membro</button>';
    html += '<table class="admin-table"><thead><tr><th>Nome</th><th>Cargo</th><th class="actions">Ações</th></tr></thead><tbody>';
    _data.TEAM.forEach(function(m, i) {
      html += '<tr><td>' + esc(m.name) + '</td><td>' + esc(m.role) + '</td>'
        + '<td class="actions"><button onclick="editTeamMember(' + i + ')">✏️</button><button class="btn-del" onclick="delTeamMember(' + i + ')">🗑️</button></td></tr>';
    });
    html += '</tbody></table>';
    container.innerHTML = html;
  }

  window.addTeamMember = function() {
    _data.TEAM.push({ name: 'Novo Membro', role: '', photo: '', desc: '', social: { instagram: '', whatsapp: '', linkedin: '', facebook: '', youtube: '', site: '' } });
    editTeamMember(_data.TEAM.length - 1);
  };

  window.editTeamMember = function(idx) {
    var m = _data.TEAM[idx];
    var social = m.social || {};
    openModal('✏️ Editar Membro',
      '<label>Nome</label><input id="tm_name" value="' + esc(m.name) + '">'
      + '<label>Cargo</label><input id="tm_role" value="' + esc(m.role || '') + '">'
      + '<label>Foto (URL)' + uploadBtn('tm_photo', 'images/equipe') + '</label><input id="tm_photo" value="' + esc(m.photo || '') + '">'
      + '<label>Descrição</label><textarea id="tm_desc" rows="3">' + esc(m.desc || '') + '</textarea>'
      + '<hr><h4 style="margin:1rem 0 0.5rem;color:var(--gold);">Redes Sociais</h4>'
      + '<label>Instagram</label><input id="tm_instagram" value="' + esc(social.instagram || '') + '">'
      + '<label>WhatsApp</label><input id="tm_whatsapp" value="' + esc(social.whatsapp || '') + '">'
      + '<label>LinkedIn</label><input id="tm_linkedin" value="' + esc(social.linkedin || '') + '">'
      + '<label>Facebook</label><input id="tm_facebook" value="' + esc(social.facebook || '') + '">'
      + '<label>YouTube</label><input id="tm_youtube" value="' + esc(social.youtube || '') + '">'
      + '<label>Site</label><input id="tm_site" value="' + esc(social.site || '') + '">',
      function() {
        m.name = gv('tm_name');
        m.role = gv('tm_role');
        m.photo = gv('tm_photo');
        m.desc = gv('tm_desc');
        m.social = {
          instagram: gv('tm_instagram'),
          whatsapp: gv('tm_whatsapp'),
          linkedin: gv('tm_linkedin'),
          facebook: gv('tm_facebook'),
          youtube: gv('tm_youtube'),
          site: gv('tm_site')
        };
        syncToLive();
        adminToast('✅ Membro salvo', 'success');
        renderAdminTeam(document.getElementById('adminSection_team'));
      }
    );
  };

  window.delTeamMember = function(idx) {
    if (!confirm('Excluir ' + jq(_data.TEAM[idx].name) + '?')) return;
    _data.TEAM.splice(idx, 1);
    syncToLive();
    renderAdminTeam(document.getElementById('adminSection_team'));
    adminToast('🗑️ Membro removido', 'info');
  };

  /* =================================================================
     USERS — gerenciamento de usuários (só no modo BD)
     ================================================================= */
  /* ─── Região (LOCATIONS_INFO) ─── */

  window.renderAdminRegion = function(container) {
    var keys = Object.keys(_data.LOCATIONS_INFO);
    var html = '<h2>📍 Conhecer a Região (' + keys.length + ')</h2><p class="desc">Informações sobre cada cidade/região.</p>';
    html += '<button class="btn-add" onclick="addRegionLocation()">+ Nova Região</button>';
    html += '<table class="admin-table"><thead><tr><th>Nome</th><th>Praias</th><th class="actions">Ações</th></tr></thead><tbody>';
    keys.forEach(function(k) {
      var loc = _data.LOCATIONS_INFO[k];
      html += '<tr><td>' + esc(k) + '</td><td>' + (loc.beaches ? loc.beaches.length : 0) + ' praias</td>'
        + '<td class="actions"><button onclick="editRegionLocation(' + escAttr(JSON.stringify(k)) + ')">✏️</button><button class="btn-del" onclick="delRegionLocation(' + escAttr(JSON.stringify(k)) + ')">🗑️</button></td></tr>';
    });
    html += '</tbody></table>';
    container.innerHTML = html;
  };

  window.addRegionLocation = function() {
    var name = prompt('Nome da cidade/região:');
    if (!name || _data.LOCATIONS_INFO[name]) return;
    _data.LOCATIONS_INFO[name] = {
      tagline: '',
      images: [],
      beaches: [],
      intro: '',
      history: '',
      safety: '',
      highlights: []
    };
    editRegionLocation(name);
  };

  function regRowHtml(type, item) {
    item = item || {};
    if (type === 'images') {
      return '<div class="reg-row" style="' + EMP_ROW_STYLE + '">'
        + '<div style="display:flex;justify-content:flex-end;margin-bottom:0.25rem;"><button class="btn-del" type="button" style="' + EMP_DEL_BTN + '" onclick="delRegRow(\'images\', this)">🗑️ Excluir</button></div>'
        + '<label>URL da imagem</label><input class="r-img" value="' + esc(item) + '" placeholder="ex: images/foto-da-regiao.jpg">'
        + '</div>';
    }
    if (type === 'beaches') {
      return '<div class="reg-row" style="' + EMP_ROW_STYLE + '">'
        + '<div style="display:flex;justify-content:flex-end;margin-bottom:0.25rem;"><button class="btn-del" type="button" style="' + EMP_DEL_BTN + '" onclick="delRegRow(\'beaches\', this)">🗑️ Excluir</button></div>'
        + '<div class="row2"><div><label>Nome da praia</label><input class="r-bname" value="' + esc(item.name || '') + '" placeholder="ex: Praia do Forte"></div>'
        + '<div><label>Descrição</label><input class="r-bdesc" value="' + esc(item.desc || '') + '" placeholder="ex: Mar calmo e piscinas naturais"></div></div>'
        + '</div>';
    }
    return '<div class="reg-row" style="' + EMP_ROW_STYLE + '">'
      + '<div style="display:flex;justify-content:flex-end;margin-bottom:0.25rem;"><button class="btn-del" type="button" style="' + EMP_DEL_BTN + '" onclick="delRegRow(\'highlights\', this)">🗑️ Excluir</button></div>'
      + '<label>Destaque</label><input class="r-high" value="' + esc(item) + '" placeholder="ex: Melhor custo-benefício do litoral">'
      + '</div>';
  }

  function regRowsHtml(type, items) {
    if (!items || items.length === 0) return '<p class="reg-empty" style="color:rgba(255,255,255,0.35);font-size:0.8rem;margin:0;">Nenhum item ainda — clique em "+ Agregar" abaixo.</p>';
    return items.map(function(it) { return regRowHtml(type, it); }).join('');
  }

  function collectRegRows(type) {
    var out = [];
    var rows = document.querySelectorAll('#reg_rows_' + type + ' .reg-row');
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      if (type === 'images') {
        var u = row.querySelector('.r-img').value.trim();
        if (u) out.push(u);
      } else if (type === 'beaches') {
        var name = row.querySelector('.r-bname').value.trim();
        var desc = row.querySelector('.r-bdesc').value.trim();
        if (name) out.push({ name: name, desc: desc });
      } else {
        var h = row.querySelector('.r-high').value.trim();
        if (h) out.push(h);
      }
    }
    return out;
  }

  window.addRegRow = function(type) {
    var cont = document.getElementById('reg_rows_' + type);
    if (!cont) return;
    if (!cont.querySelector('.reg-row')) cont.innerHTML = '';
    cont.insertAdjacentHTML('beforeend', regRowHtml(type));
  };

  window.delRegRow = function(type, btn) {
    var row = btn.closest('.reg-row');
    if (!row) return;
    row.remove();
  };

  window.editRegionLocation = function(key) {
    var loc = _data.LOCATIONS_INFO[key];
    if (!loc) return;
    openModal('📍 Editar: ' + esc(key),
      '<label>Nome da região</label><input id="rl_key" value="' + esc(key) + '">'
      + '<label>Tagline</label><input id="rl_tagline" value="' + esc(loc.tagline || '') + '">'
      + '<div style="display:flex;justify-content:space-between;align-items:center;margin:0.75rem 0 0.25rem;font-weight:600;">🖼️ Imagens da região<button class="btn-add" type="button" style="' + EMP_ADD_BTN + '" onclick="addRegRow(\'images\')">+ Agregar imagem</button></div>'
      + '<div id="reg_rows_images">' + regRowsHtml('images', loc.images) + '</div>'
      + '<label>Introdução</label><textarea id="rl_intro" rows="3">' + esc(loc.intro || '') + '</textarea>'
      + '<label>História</label><textarea id="rl_history" rows="3">' + esc(loc.history || '') + '</textarea>'
      + '<label>Segurança</label><textarea id="rl_safety" rows="3">' + esc(loc.safety || '') + '</textarea>'
      + '<div style="display:flex;justify-content:space-between;align-items:center;margin:0.75rem 0 0.25rem;font-weight:600;">🏖️ Praias<button class="btn-add" type="button" style="' + EMP_ADD_BTN + '" onclick="addRegRow(\'beaches\')">+ Agregar praia</button></div>'
      + '<div id="reg_rows_beaches">' + regRowsHtml('beaches', loc.beaches) + '</div>'
      + '<div style="display:flex;justify-content:space-between;align-items:center;margin:0.75rem 0 0.25rem;font-weight:600;">⭐ Destaques<button class="btn-add" type="button" style="' + EMP_ADD_BTN + '" onclick="addRegRow(\'highlights\')">+ Agregar destaque</button></div>'
      + '<div id="reg_rows_highlights">' + regRowsHtml('highlights', loc.highlights) + '</div>',
      function() {
        var newKey = gv('rl_key').trim();
        if (!newKey) return;
        if (newKey !== key) {
          _data.LOCATIONS_INFO[newKey] = _data.LOCATIONS_INFO[key];
          delete _data.LOCATIONS_INFO[key];
        }
        var l = _data.LOCATIONS_INFO[newKey];
        l.tagline = gv('rl_tagline');
        l.images = collectRegRows('images');
        l.intro = gv('rl_intro');
        l.history = gv('rl_history');
        l.safety = gv('rl_safety');
        l.beaches = collectRegRows('beaches');
        l.highlights = collectRegRows('highlights');
        syncToLive();
        adminToast('✅ Região salva', 'success');
        renderAdminRegion(document.getElementById('adminSection_region'));
      }
    );
  };

  window.delRegionLocation = function(key) {
    if (!confirm('Excluir região ' + jq(key) + '?')) return;
    delete _data.LOCATIONS_INFO[key];
    syncToLive();
    renderAdminRegion(document.getElementById('adminSection_region'));
    adminToast('🗑️ Região removida', 'info');
  };

  /* =================================================================
     SETTINGS (Servidor / Backup)
     ================================================================= */
  function renderSettings(container) {
    container.innerHTML = '<h2>🔑 Configurações Avançadas</h2><p class="desc">Salvamento no servidor e backup.</p>'
      + '<div class="admin-settings">'
      + '<h3 style="color:#d4af37;font-size:0.95rem;margin:0 0 0.5rem;">💾 Salvar no servidor (PHP)</h3>'
      + '<p style="color:rgba(255,255,255,0.5);font-size:0.82rem;margin:0 0 0.75rem;">Se o site está rodando em um host com PHP (ex: Hostinger), usa isso pra salvar as alterações direto no <code style="background:rgba(255,255,255,0.06);padding:0.1rem 0.3rem;border-radius:3px;">js/data.js</code> do servidor.</p>'
      + '<label>Senha do save.php</label>'
      + '<input id="cfg_serverPass" type="password" value="' + esc(localStorage.getItem('admin_server_pass') || '') + '" placeholder="Senha definida no save.php">'
      + '<button class="btn-save" onclick="saveServerPass()">💾 Salvar senha</button>'
      + '<button class="btn-save" onclick="saveToServer()" style="margin-left:0.5rem;">💾 Salvar no servidor</button>'
      + '<hr style="border-color:rgba(255,255,255,0.06);margin:1.5rem 0;">'
      + '<h3 style="color:#d4af37;font-size:0.95rem;margin:0 0 0.5rem;">📥 Export / Import Dados</h3>'
      + '<p style="color:rgba(255,255,255,0.5);font-size:0.82rem;margin:0 0 0.75rem;">Exporte todos os dados como JSON para backup, ou importe um backup anterior.</p>'
      + '<button class="btn-save" onclick="exportData()">📤 Exportar dados (JSON)</button>'
      + '<button class="btn-save" onclick="document.getElementById(\'importFileInput\').click()" style="margin-left:0.5rem;">📥 Importar dados (JSON)</button>'
      + '<input type="file" id="importFileInput" accept=".json" style="display:none" onchange="importData(this)">'
      + '<hr style="border-color:rgba(255,255,255,0.06);margin:1.5rem 0;">'
      + '<h3 style="color:#d4af37;font-size:0.95rem;margin:0 0 0.5rem;">🔒 Desabilitar Painel</h3>'
      + '<p style="color:rgba(255,255,255,0.5);font-size:0.82rem;margin:0;">Para desligar o painel, mude <code style="background:rgba(255,255,255,0.06);padding:0.1rem 0.3rem;border-radius:3px;">ADMIN_ENABLED = false</code> no arquivo <code style="background:rgba(255,255,255,0.06);padding:0.1rem 0.3rem;border-radius:3px;">js/admin.js</code> (linha 3) e publique.</p>'
      + '</div>';
  }

  window.saveToServer = function() {
    var pass = document.getElementById('cfg_serverPass').value.trim();
    if (!pass) { adminToast('❌ Defina a senha do save.php na aba Config', 'error'); return; }
    localStorage.setItem('admin_server_pass', pass);
    adminSaveServer();
  };

  /* ---- Export / Import ---- */
  window.exportData = function() {
    try { saveFormsToData(); } catch(e) {}
    var data = {
      constants: _data.constants,
      stats: _data.STATS,
      properties: _data.PROPERTIES,
      empreendimentos: _data.EMPREENDIMENTOS,
      faq: _data.FAQS,
      depoimentos: _data.DEPOIMENTOS,
      parceiros: _data.PARCEIROS,
      team: _data.TEAM,
      servicos: _data.SERVICES,
      locations_info: _data.LOCATIONS_INFO,
      blog: _data.BLOG_POSTS
    };
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'furpal-backup-' + new Date().toISOString().slice(0,10) + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    adminToast('✅ Dados exportados!', 'success');
  };

  window.importData = function(input) {
    var file = input.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(e) {
      try {
        var data = JSON.parse(e.target.result);
        if (data.constants) Object.assign(_data.constants, data.constants);
        if (data.stats) replaceArr(_data, 'STATS', data.stats);
        if (data.properties) replaceArr(_data, 'PROPERTIES', data.properties);
        if (data.empreendimentos) replaceArr(_data, 'EMPREENDIMENTOS', data.empreendimentos);
        if (data.faq) replaceArr(_data, 'FAQS', data.faq);
        if (data.depoimentos) replaceArr(_data, 'DEPOIMENTOS', data.depoimentos);
        if (data.parceiros) replaceArr(_data, 'PARCEIROS', data.parceiros);
        if (data.blog) replaceArr(_data, 'BLOG_POSTS', data.blog);
        if (data.team) replaceArr(_data, 'TEAM', data.team);
        if (data.servicos) replaceArr(_data, 'SERVICES', data.servicos);
        if (data.locations_info) _data.LOCATIONS_INFO = data.locations_info;
        syncToLive();
        adminToast('✅ Dados importados com sucesso! Re-renderizando...', 'success');
        reRenderAllTabs();
      } catch(err) {
        adminToast('❌ Erro ao importar: ' + err.message, 'error');
      }
    };
    reader.readAsText(file);
    input.value = '';
  };

  function reRenderAllTabs() {
    var tabs = ['general','sobre','servicos','financiamento','properties','empreendimentos','blog','faq','depoimentos','parceiros','team','region'];
    tabs.forEach(function(id) {
      var div = document.querySelector('.admin-section[data-tab="' + id + '"]');
      if (div) window['render' + id.charAt(0).toUpperCase() + id.slice(1)](div);
    });
  }

  /* =================================================================
     SOBRE
     ================================================================= */
  function renderSobre(container) {
    var c = _data.constants;
    var statsHtml = '';
    var stArr = (_data.STATS && _data.STATS.length ? _data.STATS : [{value:'+?',label:'Imóveis comercializados'},{value:'+7',label:'Anos de experiência'},{value:'+?',label:'Clientes satisfeitos'}]);
    for (var si2 = 0; si2 < stArr.length; si2++) {
      statsHtml += '<div class="row3" style="align-items:end;">'
        + '<div><label>Número / Valor</label><input class="sobre-stat-val" value="' + esc(stArr[si2].value||'') + '" placeholder="+7"></div>'
        + '<div style="grid-column:span 2;"><label>Texto</label><input class="sobre-stat-label" value="' + esc(stArr[si2].label||'') + '" placeholder="Anos de experiência"></div>'
        + '</div>';
    }
    container.innerHTML = '<h2>🏡 Seção Sobre</h2><p class="desc">Texto, vídeo e números exibidos na seção "Sobre".</p>'
      + '<div class="admin-settings">'
      + '<label>Sobre — Eyebrow</label><input id="sobre_eye" value="' + esc(c.SECTION_SOBRE_EYEBROW||'') + '">'
      + '<label>Sobre — Título</label><textarea id="sobre_title" rows="2">' + esc(c.SECTION_SOBRE_TITLE||'') + '</textarea>'
      + '<hr style="border-color:rgba(255,255,255,0.06);margin:1rem 0;">'
      + '<label>Vídeo do Sobre (MP4)' + uploadBtn('sobre_video', 'videos') + '</label><input id="sobre_video" value="' + esc(c.SOBRE_VIDEO||'/video/sobre.mp4') + '" placeholder="https://...mp4 ou /video/...mp4">'
      + '<div class="note">Ao enviar o vídeo, o poster (imagem de capa) é gerado automaticamente.</div>'
      + '<hr style="border-color:rgba(255,255,255,0.06);margin:1rem 0;">'
      + '<h3 style="color:#d4af37;font-size:0.9rem;margin:0 0 1rem;">📄 Textos (parágrafos)</h3>'
      + '<label>Parágrafo 1</label><textarea id="sobre_p1" rows="3">' + esc(c.SECTION_SOBRE_P1||'') + '</textarea>'
      + '<label>Parágrafo 2</label><textarea id="sobre_p2" rows="3">' + esc(c.SECTION_SOBRE_P2||'') + '</textarea>'
      + '<label>Parágrafo 3</label><textarea id="sobre_p3" rows="3">' + esc(c.SECTION_SOBRE_P3||'') + '</textarea>'
      + '<hr style="border-color:rgba(255,255,255,0.06);margin:1rem 0;">'
      + '<h3 style="color:#d4af37;font-size:0.9rem;margin:0 0 1rem;">🔢 Números (estatísticas)</h3>'
      + statsHtml
      + '<button class="btn-save" onclick="saveSobre()">💾 Salvar alterações</button>'
      + '</div>';
  }

  window.saveSobre = function() {
    try { saveFormsToData(); } catch(e) {}
    syncToLive();
    adminSaveServer();
  };

  /* =================================================================
     SERVIÇOS
     ================================================================= */
  function renderServicos(container) {
    var sv = (_data.SERVICES && _data.SERVICES.length ? _data.SERVICES : []);
    var html = '<h2>🧰 Serviços (' + sv.length + ')</h2><p class="desc">Tarjetas da seção "Serviços": título e descrição de cada card.</p>'
      + '<div class="admin-settings" id="servicosList">';
    for (var si4 = 0; si4 < sv.length; si4++) {
      html += '<div style="border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:1rem;margin-bottom:1rem;">'
        + '<label>Card ' + (si4 + 1) + ' — Título</label><input class="serv-card-title" value="' + esc(sv[si4].title || '') + '">'
        + '<label>Card ' + (si4 + 1) + ' — Descrição</label><textarea class="serv-card-text" rows="4">' + esc(sv[si4].text || '') + '</textarea>'
        + '<div style="display:flex;align-items:center;gap:0.5rem;margin-top:0.5rem;">'
        + '<button class="btn-arrow" onclick="moveService(' + si4 + ', -1)" title="Mover para cima"' + (si4 === 0 ? ' disabled' : '') + '>↑</button>'
        + '<button class="btn-arrow" onclick="moveService(' + si4 + ', 1)" title="Mover para baixo"' + (si4 === sv.length - 1 ? ' disabled' : '') + '>↓</button>'
        + '<button class="btn-del" style="margin-left:auto;" onclick="delService(' + si4 + ')">🗑️ Remover</button>'
        + '</div></div>';
    }
    html += '</div>'
      + '<button class="btn-add" onclick="addService()">+ Novo Serviço</button>'
      + '<div style="margin-top:1rem;"><button class="btn-save" onclick="saveServicos()">💾 Salvar alterações</button></div>';
    container.innerHTML = html;
  }

  window.addService = function() {
    try { saveFormsToData(); } catch(e) {}
    _data.SERVICES.push({ title: 'Novo serviço', text: 'Descrição do serviço.' });
    renderServicos(document.getElementById('adminSection_servicos'));
  };

  window.delService = function(i) {
    try { saveFormsToData(); } catch(e) {}
    _data.SERVICES.splice(i, 1);
    renderServicos(document.getElementById('adminSection_servicos'));
  };

  window.moveService = function(i, dir) {
    try { saveFormsToData(); } catch(e) {}
    var j = i + dir;
    if (j < 0 || j >= _data.SERVICES.length) return;
    var t = _data.SERVICES[i];
    _data.SERVICES[i] = _data.SERVICES[j];
    _data.SERVICES[j] = t;
    renderServicos(document.getElementById('adminSection_servicos'));
  };

  window.saveServicos = function() {
    try { saveFormsToData(); } catch(e) {}
    syncToLive();
    adminSaveServer();
  };

  /* =================================================================
     FINANCIAMENTO
     ================================================================= */
  function renderFinanciamento(container) {
    var c = _data.constants;
    container.innerHTML = '<h2>💰 Financiamento</h2><p class="desc">Texto e valores padrão do simulador.</p>'
      + '<div class="admin-settings">'
      + '<label>Título (eyebrow)</label><input id="fin_eye" value="' + esc(c.SECTION_FINANCIAMENTO_EYEBROW) + '">'
      + '<label>Título principal</label><textarea id="fin_title" rows="2">' + esc(c.SECTION_FINANCIAMENTO_TITLE) + '</textarea>'
      + '<hr style="border-color:rgba(255,255,255,0.06);margin:1rem 0;">'
      + '<label>Valor padrão do imóvel (R$)</label><input id="fin_defPrice" type="number" value="' + (c.FIN_DEFAULT_PRICE||500000) + '">'
      + '<label>Entrada padrão (R$)</label><input id="fin_defDown" type="number" value="' + (c.FIN_DEFAULT_DOWN||100000) + '">'
      + '<label>Taxa de juros padrão (% a.a.)</label><input id="fin_defRate" type="number" step="0.1" value="' + (c.FIN_DEFAULT_RATE||8.5) + '">'
      + '<label>Prazo padrão (meses)</label><select id="fin_defTerm"><option value="180"' + ((c.FIN_DEFAULT_TERM||240)==180?' selected':'') + '>15 anos (180 meses)</option><option value="240"' + ((c.FIN_DEFAULT_TERM||240)==240?' selected':'') + '>20 anos (240 meses)</option><option value="300"' + ((c.FIN_DEFAULT_TERM||240)==300?' selected':'') + '>25 anos (300 meses)</option><option value="360"' + ((c.FIN_DEFAULT_TERM||240)==360?' selected':'') + '>30 anos (360 meses)</option></select>'
      + '<hr style="border-color:rgba(255,255,255,0.06);margin:1rem 0;">'
      + '<button class="btn-save" onclick="saveFinanciamento()">💾 Salvar alterações</button>'
      + '</div>';
  }

  window.saveFinanciamento = function() {
    var c = _data.constants;
    c.SECTION_FINANCIAMENTO_EYEBROW = gv('fin_eye');
    c.SECTION_FINANCIAMENTO_TITLE   = gv('fin_title');
    c.FIN_DEFAULT_PRICE = parseInt(gv('fin_defPrice')) || 500000;
    c.FIN_DEFAULT_DOWN  = parseInt(gv('fin_defDown'))  || 100000;
    c.FIN_DEFAULT_RATE  = parseFloat(gv('fin_defRate')) || 8.5;
    c.FIN_DEFAULT_TERM  = parseInt(gv('fin_defTerm'))   || 240;
    // Apply live to DOM
    var priceEl = document.getElementById('fin-price');
    var downEl  = document.getElementById('fin-down');
    var rateEl  = document.getElementById('fin-rate');
    var termEl  = document.getElementById('fin-term');
    if (priceEl) priceEl.value = c.FIN_DEFAULT_PRICE;
    if (downEl)  downEl.value  = c.FIN_DEFAULT_DOWN;
    if (rateEl)  rateEl.value  = c.FIN_DEFAULT_RATE;
    if (termEl)  termEl.value  = c.FIN_DEFAULT_TERM;
    // Update eyebrow and title
    var eyeEl = document.querySelector('#financiamento .eyebrow');
    var titEl = document.querySelector('#financiamento h2');
    if (eyeEl) eyeEl.textContent = c.SECTION_FINANCIAMENTO_EYEBROW;
    if (titEl) titEl.textContent = c.SECTION_FINANCIAMENTO_TITLE;
    // Recalculate
    if (typeof calcFinancing === 'function') calcFinancing();
    adminSaveServer();
  };

  /* =================================================================
     SAVE (no servidor via save.php)
     ================================================================= */
  window.adminPublish = function() {
    adminSaveServer();
  };

   function generateDataJs() {
    var c = _data.constants;
    function indent(n) { return '  '.repeat(n); }
    function jsVal(v, depth) {
      if (v === null || v === undefined) return 'null';
      if (typeof v === 'string') return JSON.stringify(v);
      if (typeof v === 'number' || typeof v === 'boolean') return String(v);
      if (Array.isArray(v)) {
        if (v.length === 0) return '[]';
        var items = v.map(function(item) { return indent(depth + 1) + jsVal(item, depth + 1); });
        return '[\n' + items.join(',\n') + '\n' + indent(depth) + ']';
      }
      if (typeof v === 'object') {
        var keys = Object.keys(v);
        if (keys.length === 0) return '{}';
        var pairs = keys.map(function(k) {
          var val = jsVal(v[k], depth + 1);
          return indent(depth + 1) + JSON.stringify(String(k)) + ': ' + val;
        });
        return '{\n' + pairs.join(',\n') + '\n' + indent(depth) + '}';
      }
      return String(v);
    }

    function arrToJs(name, arr, depth) {
      depth = depth || 0;
      var sp = indent(depth);
      return '\n' + sp + 'const ' + name + ' = ' + jsVal(arr, depth + 1) + ';\n';
    }

    function strConst(name, val) {
      return 'let ' + name + ' = ' + JSON.stringify(val) + ';\n';
    }

    function strExpr(name, expr) {
      return 'let ' + name + ' = ' + expr + ';\n';
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
    out += strConst('SITE_LOGO', c.SITE_LOGO || '');
    out += strConst('LOGO_MAX_HEIGHT', c.LOGO_MAX_HEIGHT || '2rem');
    out += strConst('LOGO_MAX_WIDTH', c.LOGO_MAX_WIDTH || '200px');
    out += strConst('LOGO_MARGIN', c.LOGO_MARGIN || '0');
    out += strConst('SITE_EMAIL', c.SITE_EMAIL || '');
    out += strConst('SITE_URL', c.SITE_URL || 'https://suimobiliaria.com.br');
    out += strConst('SITE_ADDRESS', c.SITE_ADDRESS || '');
    out += strConst('SITE_MAPS', c.SITE_MAPS || '');
    out += strConst('SITE_CITY', c.SITE_CITY || 'Balneário Camboriú');
    out += strConst('SITE_REGION', c.SITE_REGION || 'SC');
    out += '\n';
    out += strConst('SECTION_PARCEIROS_EYEBROW', c.SECTION_PARCEIROS_EYEBROW || 'Parceiros');
    out += strConst('SECTION_PARCEIROS_TITLE', c.SECTION_PARCEIROS_TITLE || 'Instituições que confiam em nós');
    out += '\n';
    out += strConst('HERO_EYEBROW', c.HERO_EYEBROW || '');
    out += strConst('HERO_TITLE', c.HERO_TITLE || '');
    out += strConst('HERO_SUBTITLE', c.HERO_SUBTITLE || '');
    out += '\n';
    out += strConst('SECTION_SOBRE_EYEBROW', c.SECTION_SOBRE_EYEBROW || 'Quem somos');
    out += strConst('SECTION_SOBRE_TITLE', c.SECTION_SOBRE_TITLE || '');
    out += strConst('SECTION_SOBRE_P1', c.SECTION_SOBRE_P1 || '');
    out += strConst('SECTION_SOBRE_P2', c.SECTION_SOBRE_P2 || '');
    out += strConst('SECTION_SOBRE_P3', c.SECTION_SOBRE_P3 || '');
    out += strConst('SOBRE_VIDEO', c.SOBRE_VIDEO || '/video/sobre.mp4');
    out += strConst('SECTION_COMPRAR_EYEBROW', c.SECTION_COMPRAR_EYEBROW || 'Imóveis à venda');
    out += strConst('SECTION_COMPRAR_TITLE', c.SECTION_COMPRAR_TITLE || '');
    out += strConst('SECTION_ALUGAR_EYEBROW', c.SECTION_ALUGAR_EYEBROW || 'Imóveis para alugar');
    out += strConst('SECTION_ALUGAR_TITLE', c.SECTION_ALUGAR_TITLE || '');
    out += strConst('SECTION_LANCAMENTOS_EYEBROW', c.SECTION_LANCAMENTOS_EYEBROW || 'Lançamentos');
    out += strConst('SECTION_LANCAMENTOS_TITLE', c.SECTION_LANCAMENTOS_TITLE || '');
    out += strConst('SECTION_SERVICOS_EYEBROW', c.SECTION_SERVICOS_EYEBROW || 'Serviços');
    out += strConst('SECTION_SERVICOS_TITLE', c.SECTION_SERVICOS_TITLE || 'Tudo que você precisa em um só lugar');
    out += strConst('SECTION_DEPOIMENTOS_EYEBROW', c.SECTION_DEPOIMENTOS_EYEBROW || 'Depoimentos');
    out += strConst('SECTION_DEPOIMENTOS_TITLE', c.SECTION_DEPOIMENTOS_TITLE || 'O que nossos clientes dizem');
    out += strConst('SECTION_FAQ_EYEBROW', c.SECTION_FAQ_EYEBROW || 'FAQ');
    out += strConst('SECTION_FAQ_TITLE', c.SECTION_FAQ_TITLE || 'Perguntas frequentes');
    out += strConst('SECTION_FINANCIAMENTO_EYEBROW', c.SECTION_FINANCIAMENTO_EYEBROW || 'Financiamento');
    out += strConst('SECTION_FINANCIAMENTO_TITLE', c.SECTION_FINANCIAMENTO_TITLE || 'Simule seu financiamento imobiliário');
    out += '\n';
    out += 'const FIN_DEFAULT_PRICE = ' + (c.FIN_DEFAULT_PRICE || 500000) + ';\n';
    out += 'const FIN_DEFAULT_DOWN  = ' + (c.FIN_DEFAULT_DOWN  || 100000) + ';\n';
    out += 'const FIN_DEFAULT_RATE  = ' + (c.FIN_DEFAULT_RATE  || 8.5) + ';\n';
    out += 'const FIN_DEFAULT_TERM  = ' + (c.FIN_DEFAULT_TERM  || 240) + ';\n';
    out += strConst('SECTION_CONTATO_EYEBROW', c.SECTION_CONTATO_EYEBROW || 'Fale conosco');
    out += strConst('SECTION_CONTATO_TITLE', c.SECTION_CONTATO_TITLE || '');
    out += strConst('SECTION_MAPA_EYEBROW', c.SECTION_MAPA_EYEBROW || 'Mapa de Imóveis');
    out += strConst('SECTION_MAPA_TITLE', c.SECTION_MAPA_TITLE || 'Encontre no mapa');
    out += strConst('SECTION_BLOG_EYEBROW', c.SECTION_BLOG_EYEBROW || 'Blog');
    out += strConst('SECTION_BLOG_TITLE', c.SECTION_BLOG_TITLE || 'Últimas do blog');
    out += strConst('SECTION_FAVORITOS_EYEBROW', c.SECTION_FAVORITOS_EYEBROW || 'Favoritos');
    out += strConst('SECTION_FAVORITOS_TITLE', c.SECTION_FAVORITOS_TITLE || 'Meus imóveis favoritos');
    out += strConst('SECTION_FAVORITOS_EMPTY', c.SECTION_FAVORITOS_EMPTY || 'Nenhum imóvel favoritado ainda.');
    out += strConst('SECTION_STATS_EYEBROW', c.SECTION_STATS_EYEBROW || 'Equipe');
    out += strConst('SECTION_STATS_TITLE', c.SECTION_STATS_TITLE || '');
    out += strConst('SECTION_PRIVACIDADE_EYEBROW', c.SECTION_PRIVACIDADE_EYEBROW || 'LGPD');
    out += strConst('SECTION_PRIVACIDADE_TITLE', c.SECTION_PRIVACIDADE_TITLE || 'Política de Privacidade');

    out += '\n/* ===== STATS ===== */\n';
    out += arrToJs('STATS', _data.STATS);
    out += '\n/* ===== TEAM ===== */\n';
    out += arrToJs('TEAM', _data.TEAM);
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
    out += '\n/* ===== SERVICES ===== */\n';
    out += arrToJs('SERVICES', _data.SERVICES);
    out += '\n/* ===== BLOG_POSTS ===== */\n';
    out += arrToJs('BLOG_POSTS', _data.BLOG_POSTS);
    out += '\n/* ===== LOCATIONS_INFO ===== */\n';
    out += 'const LOCATIONS_INFO = ' + jsVal(_data.LOCATIONS_INFO, 1) + ';\n';

    return out;
  }

  /* =================================================================
     SYNC _data → LIVE PAGE (preview sem publicar)
     ================================================================= */
  function syncToLive() {
    var c = _data.constants;
    // Hero
    try {
    var heroEye = document.querySelector('#inicio .eyebrow');
    var heroTit = document.querySelector('#inicio h1');
    var heroSub = document.querySelector('#inicio .hero-content p:not(.eyebrow)');
    if (heroEye) heroEye.textContent = c.HERO_EYEBROW || '';
    if (heroTit) heroTit.textContent = c.HERO_TITLE || '';
    if (heroSub) heroSub.textContent = c.HERO_SUBTITLE || '';
    } catch(e) { console.warn('syncToLive hero:', e); }
    // Site name & logo
    try {
    var cName = c.SITE_NAME || '';
    document.querySelectorAll('.site-logo').forEach(function(el) {
      if (c.SITE_LOGO) {
        el.innerHTML = '<img src="' + esc(c.SITE_LOGO) + '" alt="' + cName.replace(/"/g, '&quot;') + '" loading="lazy" />';
      } else if (cName) {
        var words = cName.split(' ');
        el.innerHTML = words.length > 1 ? words[0] + ' <span>' + words.slice(1).join(' ') + '</span>' : cName;
      }
    });
    // Logo CSS vars
    if (c.LOGO_MAX_HEIGHT) document.documentElement.style.setProperty('--logo-max-height', c.LOGO_MAX_HEIGHT);
    if (c.LOGO_MAX_WIDTH)  document.documentElement.style.setProperty('--logo-max-width', c.LOGO_MAX_WIDTH);
    if (c.LOGO_MARGIN)     document.documentElement.style.setProperty('--logo-margin', c.LOGO_MARGIN);
    // Footer copyright
    var footerCopy = document.querySelector('.footer-bottom span, .footer-col:last-child span');
    if (footerCopy && cName) {
      footerCopy.textContent = '\u00A9 ' + new Date().getFullYear() + ' ' + cName + '. Todos os direitos reservados.';
    }
    // Title tag
    if (cName) {
      var titleTag = document.querySelector('title');
      if (titleTag) titleTag.textContent = titleTag.textContent.replace(/\|.*$/, '| ' + cName);
    }
    } catch(e) { console.warn('syncToLive siteName:', e); }
    // Email, address, city
    try {
    if (c.SITE_EMAIL) {
      document.querySelectorAll('a[href*="mailto:"]').forEach(function(a) {
        a.href = 'mailto:' + c.SITE_EMAIL;
        if (a.textContent.indexOf('@') > -1) a.textContent = c.SITE_EMAIL;
      });
    }
    if (c.SITE_ADDRESS) {
      document.querySelectorAll('.footer-col li').forEach(function(li) {
        if (li.textContent.indexOf('Av.') > -1) {
          if (c.SITE_MAPS) {
            li.innerHTML = '<a href="' + esc(c.SITE_MAPS) + '" target="_blank" style="text-decoration:underline;">' + esc(c.SITE_ADDRESS) + '</a>';
          } else {
            li.textContent = c.SITE_ADDRESS;
          }
        }
        if (li.textContent.indexOf('—') > -1 || li.textContent.indexOf('SC') > -1) {
          li.textContent = c.SITE_CITY + ' \u2014 ' + c.SITE_REGION;
        }
      });
    }
    } catch(e) { console.warn('syncToLive contactInfo:', e); }
    // Social links
    try {
    if (c.SOCIAL) {
      var ig = document.querySelector('.social-instagram');
      var fb = document.querySelector('.social-facebook');
      var yt = document.querySelector('.social-youtube');
      if (ig && c.SOCIAL.instagram) ig.href = c.SOCIAL.instagram;
      if (fb && c.SOCIAL.facebook) fb.href = c.SOCIAL.facebook;
      if (yt && c.SOCIAL.youtube) yt.href = c.SOCIAL.youtube;
    }
    } catch(e) { console.warn('syncToLive social:', e); }
    // STATS
    try {
    if (typeof STATS !== 'undefined') {
      STATS.length = 0;
      _data.STATS.forEach(function(s) { STATS.push(s); });
      var _as = document.getElementById('aboutStats');
      if (_as) {
        _as.innerHTML = '';
        for (var _ai = 0; _ai < Math.min(3, STATS.length); _ai++) {
          var _ad = document.createElement('div');
          _ad.innerHTML = '<p class="stat-num">' + STATS[_ai].value + '</p><p class="stat-label">' + STATS[_ai].label + '</p>';
          _as.appendChild(_ad);
        }
      }
    }
    } catch(e) { console.warn('syncToLive stats:', e); }
    // Set dynamic WhatsApp overrides BEFORE rendering (app.js checks window._waURL / _waMsg)
    window._waURL = 'https://wa.me/' + (c.WHATSAPP_NUMBER || '').replace(/\D/g, '');
    window._waMsg = c.WHATSAPP_MSG || 'Olá, tenho interesse no {titulo} ({preco})';
    // PROPERTIES — mutate live array and re-render cards
    try {
    if (typeof PROPERTIES !== 'undefined') {
      PROPERTIES.length = 0;
      _data.PROPERTIES.forEach(function(p) { PROPERTIES.push(p); });
      if (typeof renderPropertyCards === 'function') {
        renderPropertyCards('#comprar .grid-3', 'sale');
        renderPropertyCards('#alugar .grid-2', 'rent');
      }
    }
    } catch(e) { console.warn('syncToLive properties:', e); }
    // EMPREENDIMENTOS
    try {
    if (typeof EMPREENDIMENTOS !== 'undefined') {
      EMPREENDIMENTOS.length = 0;
      _data.EMPREENDIMENTOS.forEach(function(e) { EMPREENDIMENTOS.push(e); });
      if (typeof renderEmpreendimentoCards === 'function') renderEmpreendimentoCards();
    }
    } catch(e) { console.warn('syncToLive empreendimentos:', e); }
    // FAQS
    try {
    if (typeof FAQS !== 'undefined') {
      FAQS.length = 0;
      _data.FAQS.forEach(function(f) { FAQS.push(f); });
      if (typeof renderFAQs === 'function') renderFAQs();
    }
    } catch(e) { console.warn('syncToLive faq:', e); }
    // DEPOIMENTOS
    try {
    if (typeof DEPOIMENTOS !== 'undefined') {
      DEPOIMENTOS.length = 0;
      _data.DEPOIMENTOS.forEach(function(d) { DEPOIMENTOS.push(d); });
      if (typeof renderDepoimentos === 'function') renderDepoimentos();
    }
    } catch(e) { console.warn('syncToLive depoimentos:', e); }
    // PARCEIROS
    try {
    if (typeof PARCEIROS !== 'undefined') {
      PARCEIROS.length = 0;
      _data.PARCEIROS.forEach(function(p) { PARCEIROS.push(p); });
      if (typeof renderParceiros === 'function') renderParceiros();
    }
    } catch(e) { console.warn('syncToLive parceiros:', e); }
    // TEAM
    try {
    if (typeof TEAM !== 'undefined') {
      TEAM.length = 0;
      _data.TEAM.forEach(function(m) { TEAM.push(m); });
      if (typeof renderTeam === 'function') renderTeam();
    }
    } catch(e) { console.warn('syncToLive team:', e); }
    // BLOG_POSTS
    try {
    if (typeof BLOG_POSTS !== 'undefined') {
      BLOG_POSTS.length = 0;
      _data.BLOG_POSTS.forEach(function(b) { BLOG_POSTS.push(b); });
      if (typeof renderBlogCards === 'function') renderBlogCards();
    }
    } catch(e) { console.warn('syncToLive blog:', e); }
    // DISABLED_SECTIONS — mutar o array global + ocultar/mostrar nav links
    try {
    var disabled = c.DISABLED_SECTIONS || [];
    // Mutar o array global que app.js usa para bloquear navegação
    if (typeof DISABLED_SECTIONS !== 'undefined') {
      DISABLED_SECTIONS.length = 0;
      disabled.forEach(function(s) { DISABLED_SECTIONS.push(s); });
    }
    // Atualizar visibilidade dos nav links
    var allSections = ['sobre', 'servicos', 'stats', 'comprar', 'alugar', 'lancamentos', 'depoimentos', 'parceiros', 'faq', 'financiamento', 'mapa', 'blog', 'favoritos', 'contato'];
    allSections.forEach(function(sid) {
      var show = disabled.indexOf(sid) === -1;
      // Desktop nav
      var navLi = document.querySelector('.nav-list a[href="/' + sid + '/"]');
      if (navLi && navLi.parentElement) navLi.parentElement.style.display = show ? '' : 'none';
      // Mobile nav
      var mobA = document.querySelector('#mobileNav a[href="/' + sid + '/"]');
      if (mobA) mobA.style.display = show ? '' : 'none';
      // Footer
      var footA = document.querySelector('.site-footer a[href="/' + sid + '/"]');
      if (footA && footA.parentElement) footA.parentElement.style.display = show ? '' : 'none';
    });
    } catch(e) { console.warn('syncToLive disabledSections:', e); }
    // Section eyebrow/title texts
    try {
    var sectionTextMap = [
      { sec:'sobre',       eye:'SECTION_SOBRE_EYEBROW',       tit:'SECTION_SOBRE_TITLE' },
      { sec:'servicos',    eye:'SECTION_SERVICOS_EYEBROW',    tit:'SECTION_SERVICOS_TITLE' },
      { sec:'comprar',     eye:'SECTION_COMPRAR_EYEBROW',     tit:'SECTION_COMPRAR_TITLE' },
      { sec:'alugar',      eye:'SECTION_ALUGAR_EYEBROW',      tit:'SECTION_ALUGAR_TITLE' },
      { sec:'lancamentos', eye:'SECTION_LANCAMENTOS_EYEBROW', tit:'SECTION_LANCAMENTOS_TITLE' },
      { sec:'financiamento',eye:'SECTION_FINANCIAMENTO_EYEBROW',tit:'SECTION_FINANCIAMENTO_TITLE' },
      { sec:'contato',     eye:'SECTION_CONTATO_EYEBROW',     tit:'SECTION_CONTATO_TITLE' },
      { sec:'depoimentos', eye:'SECTION_DEPOIMENTOS_EYEBROW', tit:'SECTION_DEPOIMENTOS_TITLE' },
      { sec:'faq',         eye:'SECTION_FAQ_EYEBROW',         tit:'SECTION_FAQ_TITLE' },
      { sec:'parceiros',   eye:'SECTION_PARCEIROS_EYEBROW',   tit:'SECTION_PARCEIROS_TITLE' },
      { sec:'mapa',        eye:'SECTION_MAPA_EYEBROW',        tit:'SECTION_MAPA_TITLE' },
      { sec:'blog',        eye:'SECTION_BLOG_EYEBROW',        tit:'SECTION_BLOG_TITLE' },
      { sec:'favoritos',   eye:'SECTION_FAVORITOS_EYEBROW',   tit:'SECTION_FAVORITOS_TITLE' }
    ];
    sectionTextMap.forEach(function(item) {
      if (c[item.eye]) {
        var eyeEl = document.querySelector('#' + item.sec + ' .eyebrow');
        if (eyeEl) eyeEl.textContent = c[item.eye];
      }
      if (c[item.tit]) {
        var titEl = document.querySelector('#' + item.sec + ' h2');
        if (titEl) titEl.textContent = c[item.tit];
      }
    });
    // Sobre paragraphs + video
    var _p1 = document.getElementById('sobreP1');
    if (_p1 && c.SECTION_SOBRE_P1) _p1.textContent = c.SECTION_SOBRE_P1;
    var _p2 = document.getElementById('sobreP2');
    if (_p2 && c.SECTION_SOBRE_P2) _p2.textContent = c.SECTION_SOBRE_P2;
    var _p3 = document.getElementById('sobreP3');
    if (_p3 && c.SECTION_SOBRE_P3) _p3.textContent = c.SECTION_SOBRE_P3;
    var _av = document.querySelector('.about-video');
    if (_av && c.SOBRE_VIDEO) {
      var _avSrc = _av.querySelector('source');
      if (_avSrc && _avSrc.src.indexOf(c.SOBRE_VIDEO) === -1) {
        _avSrc.src = c.SOBRE_VIDEO;
        _av.load();
      }
    }
    // Services cards
    if (typeof window.renderServices === 'function') renderServices();
    } catch(e) { console.warn('syncToLive sectionText:', e); }
    // Financiamento defaults
    try {
    if (c.FIN_DEFAULT_PRICE || c.FIN_DEFAULT_DOWN || c.FIN_DEFAULT_RATE || c.FIN_DEFAULT_TERM) {
      var priceEl = document.getElementById('fin-price');
      var downEl  = document.getElementById('fin-down');
      var rateEl  = document.getElementById('fin-rate');
      var termEl  = document.getElementById('fin-term');
      if (priceEl) priceEl.value = c.FIN_DEFAULT_PRICE;
      if (downEl)  downEl.value  = c.FIN_DEFAULT_DOWN;
      if (rateEl)  rateEl.value  = c.FIN_DEFAULT_RATE;
      if (termEl)  termEl.value  = c.FIN_DEFAULT_TERM;
      if (typeof calcFinancing === 'function') calcFinancing();
    }
    } catch(e) { console.warn('syncToLive financiamento:', e); }
    // WhatsApp — update all links with new number (always runs)
    updateLiveWhatsApp(c.WHATSAPP_NUMBER, c.WHATSAPP_DISPLAY);
    // LOCATIONS_INFO — sync region data back to live
    try {
      if (typeof LOCATIONS_INFO !== 'undefined') {
        var li = _data.LOCATIONS_INFO;
        Object.keys(li).forEach(function(k) { LOCATIONS_INFO[k] = li[k]; });
        Object.keys(LOCATIONS_INFO).forEach(function(k) { if (!li[k]) delete LOCATIONS_INFO[k]; });
      }
    } catch(e) { console.warn('syncToLive locations:', e); }
  }

  function updateLiveWhatsApp(number, display) {
    try {
    var num = (number || '').replace(/\D/g, '');
    if (!num) return;
    var waUrl = 'https://wa.me/' + num;
    // Iterate ALL links, replace any wa.me/ pattern in href (skip .team-card — each member has their own number)
    document.querySelectorAll('a').forEach(function(a) {
      try {
        if (a.closest('.team-card')) return;
        var href = a.getAttribute('href');
        if (!href) return;
        if (href.indexOf('wa.me/') > -1) {
          a.setAttribute('href', href.replace(/wa\.me\/\d+/g, 'wa.me/' + num));
        }
      } catch(e) {}
    });
    // .card-whatsapp — property card WhatsApp links (re-rendered by app.js with old WHATSAPP_URL)
    document.querySelectorAll('.card-whatsapp').forEach(function(a) {
      try {
        var href = a.getAttribute('href');
        if (!href) return;
        a.setAttribute('href', href.replace(/wa\.me\/\d+/g, 'wa.me/' + num));
      } catch(e) {}
    });
    // .nav-whatsapp-cta may have been set by page init; override completely
    document.querySelectorAll('.nav-whatsapp-cta').forEach(function(a) {
      try {
        var msg = a.getAttribute('data-whatsapp-msg') || 'Olá, gostaria de falar com a Furpal.';
        a.setAttribute('href', waUrl + '?text=' + encodeURIComponent(msg));
        a.setAttribute('target', '_blank');
      } catch(e) {}
    });
    // Footer display text
    if (display) {
      document.querySelectorAll('.footer-col li a[href*="wa.me/"]').forEach(function(a) {
        try { a.textContent = 'WhatsApp: ' + display; } catch(e) {}
      });
    }
    // Structured data telephone
    var telMeta = document.querySelector('[itemprop="telephone"]');
    if (telMeta) try { telMeta.content = '+' + num; } catch(e) {}
    } catch(e) { console.warn('updateLiveWhatsApp error:', e); }
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

  // Escapa uma string para uso dentro de um atributo onclick="..." sem quebrar o HTML nem o JS.
  function escAttr(s) {
    return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  // Gera um literal de string JS (com aspas simples) seguro para embutir em código JS.
  function jq(s) {
    return "'" + String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r?\n/g, '\\n') + "'";
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
