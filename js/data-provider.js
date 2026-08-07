/* ===================================================================
   DataProvider — modo frontend (único)
   O site lê e escreve direto nas constantes globais de js/data.js.
   O antigo "modo BD" (API + arquivos json) foi removido de propósito.
   =================================================================== */

(function() {
  'use strict';

  var MAP = {
    properties:     'PROPERTIES',
    empreendimentos:'EMPREENDIMENTOS',
    blog:           'BLOG_POSTS',
    faq:            'FAQS',
    depoimentos:    'DEPOIMENTOS',
    parceiros:      'PARCEIROS',
    stats:          'STATS',
    team:           'TEAM'
  };

  function globalVal(name) {
    // As coleções são declaradas com `let` em data.js (não são props de window),
    // então lemos via eval indireto no escopo global.
    try { return (0, eval)(name); } catch(e) { return undefined; }
  }

  var DataProvider = {
    mode: 'frontend',
    apiBase: '/api',
    isApi: function() { return false; },

    get: function(name) {
      return globalVal(MAP[name]) || [];
    },

    getAll: function() {
      return {
        properties:      globalVal('PROPERTIES') || [],
        empreendimentos: globalVal('EMPREENDIMENTOS') || [],
        blog:            globalVal('BLOG_POSTS') || [],
        faq:             globalVal('FAQS') || [],
        depoimentos:     globalVal('DEPOIMENTOS') || [],
        parceiros:       globalVal('PARCEIROS') || [],
        stats:           globalVal('STATS') || [],
        team:            globalVal('TEAM') || []
      };
    },

    saveAll: function(data, opts) {
      opts = opts || {};
      if (typeof opts.onFrontend === 'function') {
        opts.onFrontend(data);
      }
      return Promise.resolve({ ok: true, frontend: true });
    },

    setMode: function() {},

    ping: function() {
      return Promise.resolve(false);
    }
  };

  window.DataProvider = DataProvider;
})();
