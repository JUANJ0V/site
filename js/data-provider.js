/* ===================================================================
   DataProvider — abstracción de datos
   Modo frontend (default): usa las constantes globales de data.js
   Modo API: fetch a /api/... (para cuando haya backend con BD)
   ===================================================================
   CÓMO ACTIVAR MODO BD:
   1. Abrir el admin > Config > "Modo Banco de Dados"
   2. Marcar "Ativar modo BD" e informar a URL base da API
   3. Crear los endpoints de API que devuelvan/reciban el JSON
      en el mismo formato que data.js
   =================================================================== */

(function() {
  'use strict';

  var MODE = 'frontend';
  var API_BASE = '/api';

  try {
    var stored = localStorage.getItem('data_mode');
    if (stored === 'api') {
      MODE = 'api';
      API_BASE = localStorage.getItem('data_api_base') || '/api';
    }
  } catch(e) {}

  var DataProvider = {

    get mode() { return MODE; },
    get apiBase() { return API_BASE; },
    isApi: function() { return MODE === 'api'; },

    /* Lee una colección completa.
       En frontend: devuelve el array global (sincrónico)
       En API: fetch asíncrono (Promise) */
    get: function(name) {
      var map = {
        properties:     'PROPERTIES',
        empreendimentos:'EMPREENDIMENTOS',
        blog:           'BLOG_POSTS',
        faq:            'FAQS',
        depoimentos:    'DEPOIMENTOS',
        parceiros:      'PARCEIROS',
        stats:          'STATS',
        team:           'TEAM'
      };
      if (MODE === 'api') {
        return fetch(API_BASE + '?action=' + name).then(function(r) {
          if (!r.ok) throw new Error('Erro ao carregar ' + name);
          return r.json();
        });
      }
      var g = map[name];
      return window[g] || [];
    },

    /* Lee todas las colecciones en un solo objeto { properties, empreendimentos, ... }
       En frontend: devuelve objeto sincrónico
       En API: devuelve Promise */
    getAll: function() {
      if (MODE === 'api') {
        return fetch(API_BASE + '?action=all').then(function(r) {
          if (!r.ok) throw new Error('Erro ao carregar dados');
          return r.json();
        });
      }
      return {
        properties:      window.PROPERTIES || [],
        empreendimentos: window.EMPREENDIMENTOS || [],
        blog:            window.BLOG_POSTS || [],
        faq:             window.FAQS || [],
        depoimentos:     window.DEPOIMENTOS || [],
        parceiros:       window.PARCEIROS || [],
        stats:           window.STATS || [],
        team:            window.TEAM || []
      };
    },

    /* Salva todas las colecciones.
       En frontend: llama al callback de publish existente
       En API: POST /api.php con todo el JSON */
    saveAll: function(data, opts) {
      opts = opts || {};
      if (MODE === 'api') {
        data.password = localStorage.getItem('admin_server_pass') || '';
        return fetch(API_BASE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }).then(function(r) { return r.json(); });
      }
      // En frontend, admin.js ya maneja el guardado
      if (typeof opts.onFrontend === 'function') {
        opts.onFrontend(data);
      }
      return Promise.resolve({ ok: true, frontend: true });
    },

    /* Alterna entre modos y persiste en localStorage */
    setMode: function(mode, apiBase) {
      MODE = mode;
      if (apiBase) API_BASE = apiBase;
      try {
        localStorage.setItem('data_mode', mode);
        localStorage.setItem('data_api_base', apiBase || '/api');
      } catch(e) {}
    },

    /* Intenta detectar si hay API disponible */
    ping: function() {
      if (MODE === 'api') {
        return fetch(API_BASE + '?action=ping', { method: 'HEAD', cache: 'no-store' })
          .then(function(r) { return r.ok; })
          .catch(function() { return false; });
      }
      return Promise.resolve(false);
    }
  };

  window.DataProvider = DataProvider;

  // Auto-detect API si está configurado en localStorage
  // NOTA: não desativamos o modo BD se o ping falhar,
  // pois alguns servidores não respondem HEAD corretamente.
  if (MODE === 'api') {
    DataProvider.ping().then(function(online) {
      if (!online) {
        console.warn('[DataProvider] Modo BD ativo mas ping não respondeu (HEAD pode não ser suportado). Mantendo modo BD.');
      }
    });
  }

})();
