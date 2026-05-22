// Sitemap generator for Windows — double-click to run.
// Uses Windows Script Host (cscript), no Node.js required.
// Regenerate when PROPERTIES, EMPREENDIMENTOS, or sections change.

/* global WScript, ActiveXObject */

(function () {
  "use strict";

  var fso = new ActiveXObject("Scripting.FileSystemObject");
  var dir = fso.GetParentFolderName(WScript.ScriptFullName);
  var dataPath = fso.BuildPath(dir, "js\\data.js");
  var outPath  = fso.BuildPath(dir, "sitemap.xml");

  var dataJs = fso.OpenTextFile(dataPath, 1).ReadAll();

  // Strip ES6+ features JScript can't parse:
  //   const/let → var
  dataJs = dataJs.replace(/\bconst\s+/g, "var ");
  dataJs = dataJs.replace(/\blet\s+/g, "var ");

  // Evaluate in global scope
  var PROPERTIES, EMPREENDIMENTOS, DISABLED_SECTIONS, SITE_URL;
  eval(dataJs);

  var DOMAIN = SITE_URL || "https://SEU_DOMINIO";
  var now = new Date();
  var y = String(now.getFullYear());
  var m = String(now.getMonth() + 1);
  var d = String(now.getDate());
  if (m.length < 2) m = "0" + m;
  if (d.length < 2) d = "0" + d;
  var today = y + "-" + m + "-" + d;

  function addUrl(loc, priority, changefreq) {
    return "  <url>\n"
      + "    <loc>" + loc + "</loc>\n"
      + "    <lastmod>" + today + "</lastmod>\n"
      + "    <changefreq>" + (changefreq || "monthly") + "</changefreq>\n"
      + "    <priority>" + priority + "</priority>\n"
      + "  </url>\n";
  }

  var xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Home
  xml += addUrl(DOMAIN + "/#inicio", "1.0", "weekly");

  // Sections (skip disabled)
  var sections = [
    "comprar", "alugar", "lancamentos",
    "sobre", "servicos", "depoimentos",
    "parceiros", "faq", "contato"
  ];
  for (var i = 0; i < sections.length; i++) {
    var disabled = false;
    if (DISABLED_SECTIONS) {
      for (var d = 0; d < DISABLED_SECTIONS.length; d++) {
        if (DISABLED_SECTIONS[d] === sections[i]) { disabled = true; break; }
      }
    }
    if (disabled) continue;
    xml += addUrl(DOMAIN + "/#" + sections[i], "0.8");
  }

  // Properties
  for (var pi = 0; pi < PROPERTIES.length; pi++) {
    xml += addUrl(DOMAIN + "/#" + PROPERTIES[pi].id, "0.6");
  }

  // Empreendimentos
  for (var ei = 0; ei < EMPREENDIMENTOS.length; ei++) {
    xml += addUrl(DOMAIN + "/#" + EMPREENDIMENTOS[ei].id, "0.7");
  }

  xml += "</urlset>\n";

  var outFile = fso.CreateTextFile(outPath, true);
  outFile.Write(xml);
  outFile.Close();

  WScript.Echo("OK — sitemap.xml generated");
  WScript.Echo("  " + PROPERTIES.length + " properties");
  WScript.Echo("  " + EMPREENDIMENTOS.length + " empreendimentos");
  WScript.Echo("  " + (sections.length - (DISABLED_SECTIONS ? DISABLED_SECTIONS.length : 0)) + " sections");
})();
