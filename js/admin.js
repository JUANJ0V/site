/* ===================================================================
   ADMIN PANEL — Configuração
   =================================================================== */

const ADMIN_ENABLED = true; // ← Mude para true para ativar o painel
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
      #adminPanel { display:none; position:fixed; z-index:2147483647; inset:0; background:rgba(0,0,0,0.85); font-family:system-ui,sans-serif; color:#fff; overflow:auto; -webkit-overflow-scrolling:touch; }
      #adminPanel.active { display:flex; flex-direction:column; }
      #adminPanel * { box-sizing:border-box; }

      /* ── Login ── */
      #adminLogin { position:fixed; z-index:2147483647; inset:0; background:#0e142e; display:flex; align-items:center; justify-content:center; font-family:system-ui,sans-serif; }
      #adminLogin.hidden { display:none; }
      #adminLogin .box { background:#1a1f3a; padding:2.5rem; border-radius:12px; border:1px solid rgba(255,255,255,0.08); width:360px; max-width:90vw; }
      #adminLogin h2 { margin:0 0 0.25rem; color:#d4af37; font-size:1.25rem; }
      #adminLogin p { margin:0 0 1.5rem; color:rgba(255,255,255,0.5); font-size:0.85rem; }
      #adminLogin input { display:block; width:100%; padding:0.7rem 0.9rem; margin-bottom:0.75rem; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); border-radius:6px; color:#fff; font-size:0.9rem; outline:none; }
      #adminLogin input:focus { border-color:#d4af37; }
      #adminLogin button { width:100%; padding:0.7rem; background:#d4af37; border:none; border-radius:6px; color:#0e142e; font-weight:700; font-size:0.9rem; cursor:pointer; }
      #adminLogin .error { color:#ff6b6b; font-size:0.8rem; margin-top:0.5rem; display:none; }
      #adminFloatBtn { display:none; position:fixed; z-index:2147483647; bottom:1.2rem; left:1.2rem; background:#d4af37; color:#0e142e; padding:0.5rem 1rem; border-radius:8px; font-size:0.85rem; font-weight:700; cursor:pointer; box-shadow:0 2px 12px rgba(0,0,0,0.3); align-items:center; gap:0.4rem; }

      /* ── Header ── */
      .admin-header { display:flex; align-items:center; justify-content:space-between; padding:0.75rem 1.5rem; background:#0e142e; border-bottom:1px solid rgba(255,255,255,0.06); }
      .admin-header h1 { margin:0; font-size:1rem; color:#d4af37; }
      .admin-header .admin-actions { display:flex; gap:0.5rem; align-items:center; }
      .admin-header .admin-actions button, .admin-header .admin-actions a { padding:0.4rem 0.9rem; border-radius:5px; border:1px solid rgba(255,255,255,0.1); background:transparent; color:#fff; font-size:0.8rem; cursor:pointer; text-decoration:none; transition:all 0.15s; touch-action:manipulation; }
      .admin-header .admin-actions .btn-publish { background:#d4af37; color:#0e142e; border:none; font-weight:700; }
      .admin-header .admin-actions .btn-publish:hover { background:#c5a030; }

      /* ── Body ── */
      .admin-body { display:flex; flex:1; overflow:hidden; }
      .admin-sidebar { width:200px; min-width:200px; background:#0a0f24; border-right:1px solid rgba(255,255,255,0.05); padding:0.75rem 0; overflow-y:auto; }
      .admin-sidebar button { display:block; width:100%; text-align:left; padding:0.6rem 1.2rem; background:none; border:none; color:rgba(255,255,255,0.5); font-size:0.85rem; cursor:pointer; transition:all 0.15s; touch-action:manipulation; }
      .admin-mobile-tab { display:none; width:100%; padding:0.6rem 0.8rem; background:#0a0f24; border:none; border-bottom:1px solid rgba(255,255,255,0.05); color:#fff; font-size:0.85rem; outline:none; cursor:pointer; }
      .admin-mobile-tab option { background:#0a0f24; color:#fff; }
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
      .admin-modal { display:none; position:fixed; z-index:2147483647; inset:0; background:rgba(0,0,0,0.7); align-items:center; justify-content:center; }
      .admin-modal.active { display:flex; }
      .admin-modal .modal-box { background:#1a1f3a; border-radius:12px; border:1px solid rgba(255,255,255,0.08); width:700px; max-width:95vw; max-height:85vh; overflow-y:auto; padding:1.5rem; }
      .admin-modal .modal-box h3 { margin:0 0 1rem; color:#d4af37; font-size:1rem; }
      .admin-modal .modal-box label { display:block; margin:0.5rem 0 0.2rem; color:rgba(255,255,255,0.6); font-size:0.78rem; text-transform:uppercase; letter-spacing:0.05em; }
      .admin-modal .modal-box input, .admin-modal .modal-box textarea, .admin-modal .modal-box select { width:100%; padding:0.5rem 0.7rem; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); border-radius:5px; color:#fff; font-size:0.85rem; outline:none; }
      .admin-modal .modal-box select option { background:#1a1f3a; color:#fff; }
      .admin-modal .modal-box input:focus, .admin-modal .modal-box textarea:focus { border-color:#d4af37; }
      .admin-modal .modal-box textarea { min-height:80px; resize:vertical; font-family:system-ui,sans-serif; }
      .admin-modal .modal-box .row2 { display:grid; grid-template-columns:1fr 1fr; gap:0 1rem; }
      .admin-modal .modal-box .row3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:0 1rem; }
      .admin-modal .modal-box .row4 { display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:0 1rem; }
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
      #adminToast { position:fixed; z-index:2147483647; bottom:1.5rem; right:1.5rem; padding:0.7rem 1.2rem; border-radius:8px; font-size:0.85rem; opacity:0; transition:opacity 0.3s; pointer-events:none; }
      #adminToast.show { opacity:1; }
      #adminToast.success { background:#1b5e20; color:#a5d6a7; }
      #adminToast.error { background:#b71c1c; color:#ef9a9a; }
      #adminToast.info { background:#1a237e; color:#9fa8da; }

      /* ── Preview badge ── */
      .admin-preview-badge { position:fixed; top:0; left:0; right:0; z-index:2147483647; background:#d4af37; color:#0e142e; text-align:center; padding:0.25rem; font-size:0.75rem; font-weight:700; letter-spacing:0.05em; }
      body.admin-mode { padding-top:1.5rem; }

      /* ── Mobile responsive ── */
      @media (max-width: 768px) {
        .admin-body { display:block; overflow:visible; }
        .admin-sidebar { width:100%; min-width:unset; padding:0; border-right:none; border-bottom:1px solid rgba(255,255,255,0.05); }
        .admin-desk-tab { display:none !important; }
        .admin-mobile-tab { display:block; width:100%; padding:0.75rem 1rem; font-size:0.9rem; }
        .admin-content { padding:1rem; overflow:visible; min-height:60vh; }
        .admin-header { flex-wrap:wrap; gap:0.5rem; }
        .admin-header h1 { font-size:0.85rem; }
        .admin-header .admin-actions button,
        .admin-header .admin-actions a { font-size:0.7rem; padding:0.3rem 0.6rem; }
        .admin-settings input,
        .admin-settings textarea { max-width:100%; }
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
  loginEl.innerHTML = '<div class="box"><h2>🔐 Painel Admin</h2><p>Entre para gerenciar o site</p><input type="text" id="adminUser" placeholder="Usuário" autocomplete="off"><input type="password" id="adminPass" placeholder="Senha"><button onclick="adminLogin()">Entrar</button><div class="error" id="adminLoginError">Usuário ou senha incorretos</div></div>';
  document.body.appendChild(loginEl);

  var panelEl = document.createElement('div');
  panelEl.id = 'adminPanel';
  panelEl.innerHTML = '<div class="admin-header"><h1>⚙️ Su Imobiliária — Admin</h1><div class="admin-actions"><button onclick="adminToggleSite()" style="color:rgba(255,255,255,0.6);font-size:0.8rem;border:1px solid rgba(255,255,255,0.1);">👁 Ver site</button><button onclick="adminSaveServer()" style="color:rgba(255,255,255,0.6);font-size:0.8rem;border:1px solid rgba(255,255,255,0.1);">💾 Salvar</button><button onclick="adminPublish()" class="btn-publish" id="adminPublishBtn">📦 Publicar no GitHub</button><button onclick="adminLogout()">Sair</button></div></div><div class="admin-body"><div class="admin-sidebar" id="adminSidebar"></div><div class="admin-content" id="adminContent"></div></div>';
  document.body.appendChild(panelEl);

  var toastEl = document.createElement('div');
  toastEl.id = 'adminToast';
  document.body.appendChild(toastEl);

  // ── Enter key support on login ──
  setTimeout(function() {
    var passInput = document.getElementById('adminPass');
    if (passInput) {
      passInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') adminLogin();
      });
    }
    var userInput = document.getElementById('adminUser');
    if (userInput) {
      userInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') adminLogin();
      });
    }
  }, 50);

  window.adminLogin = function() {
    var u = document.getElementById('adminUser').value;
    var p = document.getElementById('adminPass').value;
    if (u === ADMIN_USER && p === ADMIN_PASS) {
      sessionStorage.setItem('admin_logged', '1');
      loginEl.classList.add('hidden');
      panelEl.classList.add('active');
      document.body.classList.add('admin-mode');
      adminFloat.style.display = 'none';
      initAdminPanel();
    } else {
      document.getElementById('adminLoginError').style.display = 'block';
    }
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
      c.WHATSAPP_NUMBER = gv('cfg_whatsNum');
      c.WHATSAPP_DISPLAY = gv('cfg_whatsDisp');
      c.WHATSAPP_MSG = gv('cfg_whatsMsg');
      c.SITE_EMAIL = gv('cfg_email');
      c.SITE_ADDRESS = gv('cfg_address');
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
    }
    // Financiamento tab
    if (document.getElementById('fin_eye')) {
      c.SECTION_FINANCIAMENTO_EYEBROW = gv('fin_eye');
      c.SECTION_FINANCIAMENTO_TITLE   = gv('fin_title');
      c.FIN_DEFAULT_PRICE = parseInt(gv('fin_defPrice')) || 500000;
      c.FIN_DEFAULT_DOWN  = parseInt(gv('fin_defDown'))  || 100000;
      c.FIN_DEFAULT_RATE  = parseFloat(gv('fin_defRate')) || 8.5;
      c.FIN_DEFAULT_TERM  = parseInt(gv('fin_defTerm'))   || 240;
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
    fetch('save.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: content, password: pwd })
    })
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

  window.saveToServer = function() {
    try { saveFormsToData(); } catch(e) {}
    var pwd = localStorage.getItem('admin_server_pass');
    if (!pwd) { adminToast('❌ Defina a senha do save.php na aba Config', 'error'); return; }
    var content = generateDataJs();
    fetch('save.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: content, password: pwd })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
      if (res.ok) { adminToast('✅ ' + (res.message || 'Salvo!'), 'success'); }
      else { adminToast('❌ ' + (res.error || 'Erro'), 'error'); }
    })
    .catch(function(err) { adminToast('❌ Erro de conexão: ' + err.message, 'error'); });
  };

  function uploadBtn(inputId, folder) {
    return ' <button type="button" onclick="adminUpload(\'' + inputId + '\',\'' + folder + '\')" style="font-size:0.7rem;padding:0.2rem 0.5rem;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:3px;color:#fff;cursor:pointer;vertical-align:middle;">📷 Upload</button>';
  }

  window.adminUpload = function(inputId, folder) {
    var el = document.createElement('input');
    el.type = 'file';
    el.accept = folder === 'videos' ? 'video/mp4,video/webm,video/quicktime' : 'image/*';
    el.onchange = function() {
      var file = el.files[0];
      if (!file) return;
      adminToast('⏳ Enviando ' + file.name + '...', 'info');
      uploadFile(file, folder, function(url) {
        var target = document.getElementById(inputId);
        if (!target) return;
        if (target.tagName === 'TEXTAREA') {
          target.value = target.value ? target.value.trim() + '\n' + url : url;
        } else {
          target.value = url;
        }
        adminToast('✅ URL copiada!', 'success');
      });
    };
    el.click();
  };

  function uploadFile(file, folder, cb) {
    var pwd = localStorage.getItem('admin_server_pass');
    if (pwd) {
      var fd = new FormData();
      fd.append('file', file);
      fd.append('password', pwd);
      fd.append('folder', folder);
      fetch('upload.php', { method: 'POST', body: fd })
        .then(function(r) { return r.json(); })
        .then(function(res) {
          if (res.ok && res.url) { cb(res.url); return; }
          uploadViaGitHub(file, folder, cb);
        })
        .catch(function() { uploadViaGitHub(file, folder, cb); });
    } else {
      uploadViaGitHub(file, folder, cb);
    }
  }

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
  if (!ADMIN_LOGGED) {
    loginEl.classList.remove('hidden');
    panelEl.classList.remove('active');
    return;
  }
  loginEl.classList.add('hidden');
  panelEl.classList.add('active');
  document.body.classList.add('admin-mode');
  initAdminPanel();

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
        BLOG_POSTS:   JSON.parse(JSON.stringify(typeof BLOG_POSTS !== 'undefined' ? BLOG_POSTS : []))
      };
      var contentEl = document.getElementById('adminContent');
      if (contentEl) contentEl.innerHTML = '<p style="color:rgba(255,255,255,0.3);padding:1rem;font-size:0.85rem;">Carregando…</p>';
      buildSidebar();
      var initialTab = window._redirectTab || 'general';
      queueTabShow(initialTab);
    } catch(e) { console.error('Admin init error:', e); }
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
      if (el && el.childNodes.length > 0) return;
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
    map.HERO_EYEBROW  = typeof HERO_EYEBROW !== 'undefined' ? HERO_EYEBROW : 'Seu lar começa aqui';
    map.HERO_TITLE    = typeof HERO_TITLE !== 'undefined' ? HERO_TITLE : 'Su Imobiliária';
    map.HERO_SUBTITLE = typeof HERO_SUBTITLE !== 'undefined' ? HERO_SUBTITLE : '';
    map.HERO_VIDEO    = typeof HERO_VIDEO !== 'undefined' ? HERO_VIDEO : '';
    map.SECTION_SOBRE_EYEBROW   = typeof SECTION_SOBRE_EYEBROW !== 'undefined' ? SECTION_SOBRE_EYEBROW : 'Quem somos';
    map.SECTION_SOBRE_TITLE     = typeof SECTION_SOBRE_TITLE !== 'undefined' ? SECTION_SOBRE_TITLE : '';
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
    return map;
  }

  var _adminTabs = [];

  function buildSidebar() {
    _adminTabs = [
      { id:'general', label:'⚙️ Geral' },
      { id:'financiamento', label:'💰 Financiamento' },
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
        case 'financiamento': renderFinanciamento(div); break;
        case 'properties': renderProperties(div); break;
        case 'empreendimentos': renderEmpreendimentos(div); break;
        case 'blog': renderBlog(div); break;
        case 'faq': renderFaq(div); break;
        case 'depoimentos': renderDepoimentos(div); break;
        case 'parceiros': renderParceiros(div); break;
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
      + '<div><label>URL do logo (imagem)</label><input id="cfg_logo" value="' + esc(c.SITE_LOGO||'') + '" placeholder="https://...svg ou png"></div></div>'
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
    c.SITE_LOGO = gv('cfg_logo');
    c.LOGO_MAX_HEIGHT = gv('cfg_logoH');
    c.LOGO_MAX_WIDTH = gv('cfg_logoW');
    c.LOGO_MARGIN = gv('cfg_logoM');
    c.WHATSAPP_NUMBER = gv('cfg_whatsNum');
    c.WHATSAPP_DISPLAY = gv('cfg_whatsDisp');
    c.WHATSAPP_MSG = gv('cfg_whatsMsg');
    c.SITE_EMAIL = gv('cfg_email');
    c.SITE_URL = gv('cfg_siteUrl');
    c.SITE_CITY = gv('cfg_city');
    c.SITE_ADDRESS = gv('cfg_address');
    c.SITE_REGION = gv('cfg_region');
    c.SITE_MAPS = gv('cfg_maps');
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
    c.SECTION_SOBRE_EYEBROW           = gv('cfg_sobreEye');
    c.SECTION_SOBRE_TITLE             = gv('cfg_sobreTitle');
    c.SECTION_SERVICOS_EYEBROW        = gv('cfg_servEye');
    c.SECTION_SERVICOS_TITLE          = gv('cfg_servTitle');
    c.SECTION_COMPRAR_EYEBROW         = gv('cfg_comprarEye');
    c.SECTION_COMPRAR_TITLE           = gv('cfg_comprarTitle');
    c.SECTION_ALUGAR_EYEBROW          = gv('cfg_alugarEye');
    c.SECTION_ALUGAR_TITLE            = gv('cfg_alugarTitle');
    c.SECTION_LANCAMENTOS_EYEBROW     = gv('cfg_lancEye');
    c.SECTION_LANCAMENTOS_TITLE       = gv('cfg_lancTitle');
    c.SECTION_FINANCIAMENTO_EYEBROW   = gv('cfg_finEye');
    c.SECTION_FINANCIAMENTO_TITLE     = gv('cfg_finTitle');
    c.SECTION_CONTATO_EYEBROW         = gv('cfg_contEye');
    c.SECTION_CONTATO_TITLE           = gv('cfg_contTitle');
    c.SECTION_PARCEIROS_EYEBROW       = gv('cfg_parcEye');
    c.SECTION_PARCEIROS_TITLE         = gv('cfg_parcTitle');
    c.SECTION_DEPOIMENTOS_EYEBROW     = gv('cfg_depEye');
    c.SECTION_DEPOIMENTOS_TITLE       = gv('cfg_depTitle');
    c.SECTION_FAQ_EYEBROW             = gv('cfg_faqEye');
    c.SECTION_FAQ_TITLE               = gv('cfg_faqTitle');
    c.SECTION_MAPA_EYEBROW            = gv('cfg_mapEye');
    c.SECTION_MAPA_TITLE              = gv('cfg_mapTitle');
    c.SECTION_BLOG_EYEBROW            = gv('cfg_blogEye');
    c.SECTION_BLOG_TITLE              = gv('cfg_blogTitle');
    c.SECTION_FAVORITOS_EYEBROW       = gv('cfg_favEye');
    c.SECTION_FAVORITOS_TITLE         = gv('cfg_favTitle');
    c.SECTION_FAVORITOS_EMPTY         = gv('cfg_favEmpty');
    syncToLive();
    adminToast('✅ Configurações salvas!', 'success');
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
      + '<div class="row4"><div><label>Metros frente (terreno)</label><input id="prop_front" type="number" step="any" value="' + (p.front||'') + '"></div>'
      + '<div><label>Metros fundo (terreno)</label><input id="prop_back" type="number" step="any" value="' + (p.back||'') + '"></div>'
      + '<div><label>Zona (terreno)</label><select id="prop_zone"><option value="" ' + (!p.zone?'selected':'') + '></option><option value="Urbana"' + (p.zone==='Urbana'?' selected':'') + '>Urbana</option><option value="Rural"' + (p.zone==='Rural'?' selected':'') + '>Rural</option></select></div>'
      + '<div><label>Topografia (terreno)</label><select id="prop_topography"><option value="" ' + (!p.topography?'selected':'') + '></option><option value="Plana"' + (p.topography==='Plana'?' selected':'') + '>Plana</option><option value="Aclive"' + (p.topography==='Aclive'?' selected':'') + '>Aclive</option><option value="Declive"' + (p.topography==='Declive'?' selected':'') + '>Declive</option></select></div></div>'
      + '<label>URL do Maps</label><input id="prop_maps" value="' + esc(p.maps||'') + '">'
      + '<label>Descrição curta (card)</label><textarea id="prop_desc" rows="2">' + esc(p.desc||'') + '</textarea>'
      + '<label>Descrição longa (detalhes)</label><textarea id="prop_description" rows="4">' + esc(p.description||'') + '</textarea>'
      + '<label>URL da imagem principal' + uploadBtn('prop_img', 'images') + '</label><input id="prop_img" value="' + esc(p.img) + '">'
      + '<label>URL do vídeo' + uploadBtn('prop_video', 'videos') + '</label><input id="prop_video" value="' + esc(p.video||'') + '">'
      + '<label>Galeria (URLs, uma por linha)' + uploadBtn('prop_gallery', 'images') + '</label><textarea id="prop_gallery" rows="3">' + ((p.gallery||[]).join('\n')) + '</textarea>'
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
    if (!confirm('Excluir "' + _data.PROPERTIES[idx].title + '"?')) return;
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
      + '<div class="row3"><div><label>Preço (texto)</label><input id="emp_price" value="' + esc(e.price) + '"></div>'
      + '<div><label>Preço (número)</label><input id="emp_priceNum" type="number" value="' + (e.priceNum||0) + '"></div>'
      + '<div><label>Progresso %</label><input id="emp_prog" type="number" value="' + (e.progress||0) + '"></div></div>'
      + '<div class="row3"><div><label>Progresso (rótulo)</label><input id="emp_progLabel" value="' + esc(e.progressLabel||'') + '" placeholder="ex: 72% vendidos">'
      + '</div><div><label>Previsão entrega</label><input id="emp_delivery" value="' + esc(e.delivery||'') + '" placeholder="ex: jun/2027">'
      + '</div><div><label>Tags (separadas por vírgula)</label><input id="emp_tags" value="' + esc((e.tags||[]).join(', ')) + '" placeholder="LANÇAMENTO, VISTA PARA O MAR"></div></div>'
      + '<label>Localização</label><input id="emp_loc" value="' + esc(e.location) + '">'
      + '<div class="row2"><div><label>Latitude</label><input id="emp_lat" type="number" step="any" value="' + (e.lat||'') + '"></div>'
      + '<div><label>Longitude</label><input id="emp_lng" type="number" step="any" value="' + (e.lng||'') + '"></div></div>'
      + '<label>Descrição</label><textarea id="emp_desc" rows="4">' + esc(e.description || '') + '</textarea>'
      + '<label>URL da imagem principal' + uploadBtn('emp_img', 'images') + '</label><input id="emp_img" value="' + esc(e.img) + '">'
      + '<label>URL do vídeo' + uploadBtn('emp_video', 'videos') + '</label><input id="emp_video" value="' + esc(e.video||'') + '">'
      + '<label>Galeria (URLs, uma por linha)' + uploadBtn('emp_gallery', 'images') + '</label><textarea id="emp_gallery" rows="3">' + ((e.gallery||[]).join('\n')) + '</textarea>'
      + '<label>Plantas (URLs, uma por linha)' + uploadBtn('emp_plants', 'images') + '</label><textarea id="emp_plants" rows="3">' + ((e.plants||[]).join('\n')) + '</textarea>'
      + '<label>Comodidades (uma por linha)</label><textarea id="emp_amenities" rows="4">' + ((e.amenities||[]).join('\n')) + '</textarea>',
      function() {
        e.title = gv('emp_title');
        e.id = gv('emp_id');
        e.price = gv('emp_price');
        e.priceNum = parseFloat(gv('emp_priceNum')) || 0;
        e.location = gv('emp_loc');
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
        syncToLive();
        adminToast('✅ Lançamento salvo', 'success');
        renderEmpreendimentos(document.getElementById('adminSection_empreendimentos'));
      }
    );
  };

  window.delEmp = function(idx) {
    if (!confirm('Excluir "' + _data.EMPREENDIMENTOS[idx].title + '"?')) return;
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
      + '<label>URL da imagem' + uploadBtn('post_img', 'images') + '</label><input id="post_img" value="' + esc(b.image) + '">'
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
    if (!confirm('Excluir "' + _data.BLOG_POSTS[idx].title + '"?')) return;
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
        syncToLive();
        adminToast('✅ Depoimento salvo', 'success');
        renderDepoimentos(document.getElementById('adminSection_depoimentos'));
      }
    );
  };

  window.delDep = function(idx) {
    if (!confirm('Excluir depoimento de "' + _data.DEPOIMENTOS[idx].name + '"?')) return;
    _data.DEPOIMENTOS.splice(idx, 1);
    syncToLive();
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
      + '<label>URL do logo' + uploadBtn('par_img', 'images') + '</label><input id="par_img" value="' + esc(p.img||'') + '">'
      + '<label>Site</label><input id="par_url" value="' + esc(p.url||'') + '">',
      function() {
        p.name = gv('par_name');
        p.img = gv('par_img');
        p.url = gv('par_url');
        syncToLive();
        adminToast('✅ Parceiro salvo', 'success');
        renderParceiros(document.getElementById('adminSection_parceiros'));
      }
    );
  };

  window.delParceiro = function(idx) {
    if (!confirm('Excluir "' + _data.PARCEIROS[idx].name + '"?')) return;
    _data.PARCEIROS.splice(idx, 1);
    syncToLive();
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
      + '<h3 style="color:#d4af37;font-size:0.95rem;margin:0 0 0.5rem;">💾 Salvar no servidor (PHP)</h3>'
      + '<p style="color:rgba(255,255,255,0.5);font-size:0.82rem;margin:0 0 0.75rem;">Se o site está rodando em um host com PHP (ex: Hostinger), usa isso pra salvar as alterações direto no <code style="background:rgba(255,255,255,0.06);padding:0.1rem 0.3rem;border-radius:3px;">js/data.js</code> do servidor.</p>'
      + '<label>Senha do save.php</label>'
      + '<input id="cfg_serverPass" type="password" value="' + esc(localStorage.getItem('admin_server_pass') || '') + '" placeholder="Senha definida no save.php">'
      + '<button class="btn-save" onclick="saveServerPass()">💾 Salvar senha</button>'
      + '<button class="btn-save" onclick="saveToServer()" style="margin-left:0.5rem;">💾 Salvar no servidor</button>'
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

  window.saveToServer = function() {
    var pass = document.getElementById('cfg_serverPass').value.trim() || 'fp2026';
    try { saveFormsToData(); } catch(e) {}
    var content = generateDataJs();
    fetch('save.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: content, password: pass })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
      if (res.ok) {
        adminToast('✅ ' + (res.message || 'Salvo no servidor!'), 'success');
      } else {
        adminToast('❌ ' + (res.error || 'Erro ao salvar'), 'error');
      }
    })
    .catch(function(err) {
      adminToast('❌ Erro de conexão: ' + err.message, 'error');
    });
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
    adminToast('✅ Financiamento salvo', 'success');
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
    out += strConst('SECTION_PARCEIROS_EYEBROW', c.SECTION_PARCEIROS_EYEBROW || 'Parceiros');
    out += strConst('SECTION_PARCEIROS_TITLE', c.SECTION_PARCEIROS_TITLE || 'Instituições que confiam em nós');
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
      if (typeof renderStatsWithLang === 'function') renderStatsWithLang();
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
    // BLOG_POSTS
    try {
    if (typeof BLOG_POSTS !== 'undefined') {
      BLOG_POSTS.length = 0;
      _data.BLOG_POSTS.forEach(function(b) { BLOG_POSTS.push(b); });
      if (typeof renderBlogCards === 'function') renderBlogCards();
    }
    } catch(e) { console.warn('syncToLive blog:', e); }
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
  }

  function updateLiveWhatsApp(number, display) {
    try {
    var num = (number || '').replace(/\D/g, '');
    if (!num) return;
    var waUrl = 'https://wa.me/' + num;
    // Iterate ALL links, replace any wa.me/ pattern in href
    document.querySelectorAll('a').forEach(function(a) {
      try {
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
        var msg = a.getAttribute('data-whatsapp-msg') || 'Olá, gostaria de falar com a Su Imobiliária.';
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
