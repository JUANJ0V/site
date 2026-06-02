/* ===================================================================
   CONFIGURAÇÃO DO SITE
   Altere apenas os valores abaixo.
   =================================================================== */

const WHATSAPP_NUMBER   = "554788079254";
const WHATSAPP_DISPLAY  = "+55 47 8807-9254";
const WHATSAPP_URL      = "https://wa.me/" + WHATSAPP_NUMBER;
const WHATSAPP_MSG      = "Olá, tenho interesse no {titulo} ({preco})";

const SITE_NAME     = "Su Imobiliária";
const SITE_LOGO     = ""; // URL do logo (SVG ou PNG) — se vazio, mostra o texto
/* ── Ajustes do logo (imagem) ──────────────────────────────
   LOGO_MAX_HEIGHT : altura máxima (ex: "2rem", "1.5rem", "40px")
   LOGO_MAX_WIDTH  : largura máxima (ex: "200px", "180px", "auto")
   LOGO_MARGIN     : margem ao redor (ex: "0" centraliza,
                     "0 auto" centraliza horizontalmente,
                     "0 0 0 0.5rem" empurra p/ direita)
   ──────────────────────────────────────────────────────── */
const LOGO_MAX_HEIGHT = "2rem";
const LOGO_MAX_WIDTH  = "200px";
const LOGO_MARGIN     = "0";
const SITE_EMAIL    = "contato@suimobiliaria.com.br";
const SITE_URL      = "https://suimobiliaria.com.br";
const SITE_ADDRESS  = "Av. Atlântica, 1500 — Centro";
const SITE_MAPS     = ""; // URL do Google Maps para a direção — se vazio, mostra só texto
const SITE_CITY     = "Balneário Camboriú";
const SITE_REGION   = "SC";

const SECTION_PARCEIROS_EYEBROW = "Parceiros";
const SECTION_PARCEIROS_TITLE   = "Instituições que confiam em nós";

/* Hero — texto do banner principal */
const HERO_EYEBROW  = "Seu lar começa aqui";
const HERO_TITLE    = "Encontre o imóvel perfeito para você.";
const HERO_SUBTITLE = "Mais de 500 imóveis à venda e aluguel. Acompanhamos você em cada passo para encontrar o lar que sempre sonhou.";

/* Títulos e subtítulos de cada seção */
const SECTION_SOBRE_EYEBROW       = "Quem somos";
const SECTION_SOBRE_TITLE         = "Mais de 15 anos assessorando famílias e empresas.";
const SECTION_COMPRAR_EYEBROW     = "Imóveis à venda";
const SECTION_COMPRAR_TITLE       = "Encontre o imóvel ideal para comprar";
const SECTION_ALUGAR_EYEBROW      = "Imóveis para alugar";
const SECTION_ALUGAR_TITLE        = "As melhores opções de aluguel";
const SECTION_LANCAMENTOS_EYEBROW = "Lançamentos";
const SECTION_LANCAMENTOS_TITLE   = "Empreendimentos exclusivos";
const SECTION_SERVICOS_EYEBROW    = "Serviços";
const SECTION_SERVICOS_TITLE      = "Tudo que você precisa em um só lugar";
const SECTION_DEPOIMENTOS_EYEBROW = "Depoimentos";
const SECTION_DEPOIMENTOS_TITLE   = "O que nossos clientes dizem";
const SECTION_FAQ_EYEBROW         = "FAQ";
const SECTION_FAQ_TITLE           = "Perguntas frequentes";
const SECTION_FINANCIAMENTO_EYEBROW = "Financiamento";
const SECTION_FINANCIAMENTO_TITLE   = "Simule seu financiamento imobili\u00E1rio";
const SECTION_CONTATO_EYEBROW     = "Envie sua mensagem";
const SECTION_CONTATO_TITLE       = "Fale conosco";
const SECTION_MAPA_EYEBROW        = "Mapa de Imóveis";
const SECTION_MAPA_TITLE          = "Encontre no mapa";
const SECTION_BLOG_EYEBROW        = "Blog";
const SECTION_BLOG_TITLE          = "Últimas do blog";
const SECTION_FAVORITOS_EYEBROW   = "Favoritos";
const SECTION_FAVORITOS_TITLE     = "Meus imóveis favoritos";
const SECTION_FAVORITOS_EMPTY     = "Nenhum imóvel favoritado ainda.";

/* ===================================================================
   TRADUÇÕES (PT / EN / ES)
   ===================================================================
   COMO ADICIONAR TEXTO TRADUTÍVEL:
   1. No HTML, coloque data-i18n="secao.chave" no elemento
   2. Aqui no TRANSLATIONS, adicione "chave: texto" dentro de
      TRANSLATIONS.secao.{pt, en, es}
   Pronto — o applyLang() traduz automaticamente.
   Exemplo: <h2 data-i18n="sections.sobreTitle">Título</h2>
            sections.pt.sobreTitle = "..." / en.sobreTitle = "..." / es.sobreTitle = "..."
   =================================================================== */
const LANG_DEFAULT = "pt";
const LANG_NAMES = { pt: "PT", en: "EN", es: "ES" };

const TRANSLATIONS = {

  nav: {
    pt: { inicio: "Início", comprar: "Comprar", alugar: "Alugar", lancamentos: "Lançamentos", financiamento: "Financiamento", mapa: "Mapa", blog: "Blog", favoritos: "Favoritos", servicos: "Serviços", faq: "FAQ", contato: "Contato", falemos: "Fale conosco" },
    en: { inicio: "Home", comprar: "Buy", alugar: "Rent", lancamentos: "Developments", financiamento: "Financing", mapa: "Map", blog: "Blog", favoritos: "Favorites", servicos: "Services", faq: "FAQ", contato: "Contact", falemos: "Contact us" },
    es: { inicio: "Inicio", comprar: "Comprar", alugar: "Alquilar", lancamentos: "Lanzamientos", financiamento: "Financiamiento", mapa: "Mapa", blog: "Blog", favoritos: "Favoritos", servicos: "Servicios", faq: "FAQ", contato: "Contacto", falemos: "Contáctenos" }
  },

  hero: {
    pt: { eyebrow: HERO_EYEBROW, title: HERO_TITLE, subtitle: HERO_SUBTITLE, searchBtn: "Buscar", seeProps: "Ver imóveis", consult: "Pedir consultoria" },
    en: { eyebrow: "Your home starts here", title: "Find the perfect property for you.", subtitle: "Over 500 properties for sale and rent. We accompany you every step of the way to find the home you've always dreamed of.", searchBtn: "Search", seeProps: "See properties", consult: "Request consultation" },
    es: { eyebrow: "Su hogar comienza aquí", title: "Encuentre la propiedad perfecta para usted.", subtitle: "Más de 500 propiedades en venta y alquiler. Le acompañamos en cada paso para encontrar el hogar que siempre soñó.", searchBtn: "Buscar", seeProps: "Ver propiedades", consult: "Solicitar consultoría" }
  },

  sections: {
    pt: {
      sobre: "Quem somos", sobreTitle: "Mais de 15 anos assessorando famílias e empresas.",
      comprar: SECTION_COMPRAR_EYEBROW, comprarTitle: SECTION_COMPRAR_TITLE,
      alugar: SECTION_ALUGAR_EYEBROW, alugarTitle: SECTION_ALUGAR_TITLE,
      lancamentos: SECTION_LANCAMENTOS_EYEBROW, lancamentosTitle: SECTION_LANCAMENTOS_TITLE,
      servicos: SECTION_SERVICOS_EYEBROW, servicosTitle: SECTION_SERVICOS_TITLE,
      depoimentos: SECTION_DEPOIMENTOS_EYEBROW, depoimentosTitle: SECTION_DEPOIMENTOS_TITLE,
      faq: SECTION_FAQ_EYEBROW, faqTitle: SECTION_FAQ_TITLE,
      financiamento: SECTION_FINANCIAMENTO_EYEBROW, financiamentoTitle: SECTION_FINANCIAMENTO_TITLE,
      contato: SECTION_CONTATO_EYEBROW, contatoTitle: SECTION_CONTATO_TITLE,
      mapa: SECTION_MAPA_EYEBROW, mapaTitle: SECTION_MAPA_TITLE,
      blog: SECTION_BLOG_EYEBROW, blogTitle: SECTION_BLOG_TITLE,
      favoritos: SECTION_FAVORITOS_EYEBROW, favoritosTitle: SECTION_FAVORITOS_TITLE,
      parceiros: SECTION_PARCEIROS_EYEBROW, parceirosTitle: SECTION_PARCEIROS_TITLE,
      filter: "Filtrar", clear: "Limpar", priceMax: "Preço máx.", type: "Tipo", location: "Localização", purpose: "Finalidade", allProps: "Todos os imóveis",
      noResultsSale: "Nenhum imóvel à venda encontrado", noResultsRent: "Nenhum imóvel para alugar encontrado", noResultsLanc: "Nenhum lançamento encontrado nesta região",
      readMore: "Ler mais", share: "Compartilhar", visit: "Agendar visita", viewMap: "Ver no mapa", otherProps: "Outros imóveis", back: "Voltar",
      favEmpty: SECTION_FAVORITOS_EMPTY, favAdd: "Adicionar aos favoritos", favRemove: "Remover dos favoritos",
      sobreP1: "A Su Imobiliária nasceu em Balneário Camboriú com uma missão clara: transformar a experiência de comprar, vender ou alugar um imóvel em algo transparente, seguro e humano.",
      sobreP2: "Ao longo de mais de 15 anos, construímos uma sólida trajetória assessorando famílias, investidores e empresas em todo o litoral catarinense. Cada operação é tratada com a dedicação e o profissionalismo que nos caracterizam.",
      sobreP3: "Nossa equipe combina conhecimento profundo do mercado imobiliário local com uma rede consolidada de parceiros — bancos, cartórios, avaliadores e construtoras — para garantir resultados consistentes em qualquer tipo de operação.",
      sobreLink: "Agende uma visita →",
      contatoCtaTitle: "Pronto para encontrar seu imóvel dos sonhos?",
      contatoCtaP: "Solicite uma consultoria gratuita e descubra as melhores opções para você e sua família.",
      contatoCtaWhats: "Fale pelo WhatsApp",
      contatoCtaMsg: "Enviar mensagem",
      contatoFormLabelName: "Nome completo",
      contatoFormLabelEmail: "E-mail",
      contatoFormLabelPhone: "Telefone / WhatsApp",
      contatoFormLabelMsg: "Mensagem",
      contatoPlaceholderName: "Seu nome",
      contatoPlaceholderEmail: "seu@email.com",
      contatoPlaceholderPhone: "(47) 99999-9999",
      contatoPlaceholderMsg: "Escreva sua mensagem...",
      contatoLgpd: "Autorizo o tratamento dos meus dados pessoais conforme a Lei Geral de Proteção de Dados (LGPD) para fins de contato e resposta à minha solicitação. Para mais informações, consulte nossa",
      contatoLgpdLink: "Política de Privacidade",
      contatoBtn: "Enviar mensagem",
      contatoSuccessTitle: "Mensagem enviada! ✓",
      contatoSuccessP: "Obrigado pelo contato. Responderemos em breve.",
      finLabelPrice: "Valor do imóvel (R$)",
      finLabelDown: "Entrada (R$)",
      finLabelRate: "Taxa de juros (% a.a.)",
      finLabelTerm: "Prazo (meses)",
      finBtn: "Calcular",
      finResultFinanced: "Valor financiado",
      finResultMonthly: "Prestação mensal",
      finResultTotal: "Total do financiamento",
      finResultInterest: "Total de juros",
      finOpt15: "15 anos (180 meses)",
      finOpt20: "20 anos (240 meses)",
      finOpt25: "25 anos (300 meses)",
      finOpt30: "30 anos (360 meses)",
      faqCta: "Ainda tem dúvidas?",
      faqCtaLink: "Fale com a nossa equipe →",
      footerDesc: "Referência em consultoria imobiliária no litoral catarinense. Mais de 15 anos transformando sonhos em endereços.",
      footerNavTitle: "Navegação",
      footerContactTitle: "Contato",
      footerCredit: "Feito com dedicação para nossos clientes.",
      whatsappFab: "Fale conosco pelo WhatsApp",
      backToTop: "Voltar ao topo",
      navAriaLabel: "Navegação principal",
      mobileNavAriaLabel: "Menu de navegação",
      searchPurposeAll: "Todos os imóveis"
    },
    en: {
      sobre: "About us", sobreTitle: "Over 15 years advising families and businesses.",
      comprar: "Properties for sale", comprarTitle: "Find the ideal property to buy",
      alugar: "Properties for rent", alugarTitle: "Best rental options",
      lancamentos: "Developments", lancamentosTitle: "Exclusive developments",
      servicos: "Services", servicosTitle: "Everything you need in one place",
      depoimentos: "Testimonials", depoimentosTitle: "What our clients say",
      faq: "FAQ", faqTitle: "Frequently asked questions",
      financiamento: "Financing", financiamentoTitle: "Simulate your financing",
      contato: "Send us a message", contatoTitle: "Contact us",
      mapa: "Property Map", mapaTitle: "Find on the map",
      blog: "Blog", blogTitle: "Latest from our blog",
      favoritos: "Favorites", favoritosTitle: "My favorite properties",
      parceiros: "Partners", parceirosTitle: "Institutions that trust us",
      filter: "Filter", clear: "Clear", priceMax: "Max. price", type: "Type", location: "Location", purpose: "Purpose", allProps: "All properties",
      noResultsSale: "No properties for sale found", noResultsRent: "No properties for rent found", noResultsLanc: "No developments found in this region",
      readMore: "Read more", share: "Share", visit: "Schedule visit", viewMap: "View on map", otherProps: "Other properties", back: "Back",
      favEmpty: "No favorite properties yet.", favAdd: "Add to favorites", favRemove: "Remove from favorites",
      sobreP1: "Su Imobiliária was born in Balneário Camboriú with a clear mission: to transform the experience of buying, selling or renting a property into something transparent, safe and human.",
      sobreP2: "Over more than 15 years, we have built a solid track record advising families, investors and companies throughout the coast of Santa Catarina. Each operation is handled with the dedication and professionalism that defines us.",
      sobreP3: "Our team combines deep knowledge of the local real estate market with a consolidated network of partners — banks, notary offices, appraisers and construction companies — to deliver consistent results in any type of transaction.",
      sobreLink: "Schedule a visit →",
      contatoCtaTitle: "Ready to find your dream home?",
      contatoCtaP: "Request a free consultation and discover the best options for you and your family.",
      contatoCtaWhats: "Chat via WhatsApp",
      contatoCtaMsg: "Send message",
      contatoFormLabelName: "Full name",
      contatoFormLabelEmail: "Email",
      contatoFormLabelPhone: "Phone / WhatsApp",
      contatoFormLabelMsg: "Message",
      contatoPlaceholderName: "Your name",
      contatoPlaceholderEmail: "your@email.com",
      contatoPlaceholderPhone: "(47) 99999-9999",
      contatoPlaceholderMsg: "Write your message...",
      contatoLgpd: "I authorize the processing of my personal data in accordance with the General Data Protection Law (LGPD) for contact purposes and response to my request. For more information, please see our",
      contatoLgpdLink: "Privacy Policy",
      contatoBtn: "Send message",
      contatoSuccessTitle: "Message sent! ✓",
      contatoSuccessP: "Thank you for reaching out. We'll reply shortly.",
      finLabelPrice: "Property value (R$)",
      finLabelDown: "Down payment (R$)",
      finLabelRate: "Interest rate (% p.a.)",
      finLabelTerm: "Term (months)",
      finBtn: "Calculate",
      finResultFinanced: "Financed amount",
      finResultMonthly: "Monthly payment",
      finResultTotal: "Total financing",
      finResultInterest: "Total interest",
      finOpt15: "15 years (180 months)",
      finOpt20: "20 years (240 months)",
      finOpt25: "25 years (300 months)",
      finOpt30: "30 years (360 months)",
      faqCta: "Still have questions?",
      faqCtaLink: "Talk to our team →",
      footerDesc: "A benchmark in real estate consulting on the Santa Catarina coast. Over 15 years turning dreams into addresses.",
      footerNavTitle: "Navigation",
      footerContactTitle: "Contact",
      footerCredit: "Made with dedication for our clients.",
      whatsappFab: "Contact us via WhatsApp",
      backToTop: "Back to top",
      navAriaLabel: "Main navigation",
      mobileNavAriaLabel: "Navigation menu",
      searchPurposeAll: "All properties"
    },
    es: {
      sobre: "Quiénes somos", sobreTitle: "Más de 15 años asesorando familias y empresas.",
      comprar: "Propiedades en venta", comprarTitle: "Encuentre la propiedad ideal para comprar",
      alugar: "Propiedades en alquiler", alugarTitle: "Mejores opciones de alquiler",
      lancamentos: "Lanzamientos", lancamentosTitle: "Emprendimientos exclusivos",
      servicos: "Servicios", servicosTitle: "Todo lo que necesita en un solo lugar",
      depoimentos: "Testimonios", depoimentosTitle: "Lo que dicen nuestros clientes",
      faq: "FAQ", faqTitle: "Preguntas frecuentes",
      financiamento: "Financiamiento", financiamentoTitle: "Simule su financiamiento",
      contato: "Envíe su mensaje", contatoTitle: "Contáctenos",
      mapa: "Mapa de Propiedades", mapaTitle: "Encuentre en el mapa",
      blog: "Blog", blogTitle: "Últimas del blog",
      favoritos: "Favoritos", favoritosTitle: "Mis propiedades favoritas",
      parceiros: "Socios", parceirosTitle: "Instituciones que confían en nosotros",
      filter: "Filtrar", clear: "Limpiar", priceMax: "Precio máx.", type: "Tipo", location: "Ubicación", purpose: "Finalidad", allProps: "Todas las propiedades",
      noResultsSale: "No se encontraron propiedades en venta", noResultsRent: "No se encontraron propiedades en alquiler", noResultsLanc: "No se encontraron lanzamientos en esta región",
      readMore: "Leer más", share: "Compartir", visit: "Agendar visita", viewMap: "Ver en mapa", otherProps: "Otras propiedades", back: "Volver",
      favEmpty: "Aún no hay propiedades favoritas.", favAdd: "Agregar a favoritos", favRemove: "Quitar de favoritos",
      sobreP1: "Su Imobiliária nació en Balneário Camboriú con una misión clara: transformar la experiencia de comprar, vender o alquilar un inmueble en algo transparente, seguro y humano.",
      sobreP2: "Durante más de 15 años, hemos construido una sólida trayectoria asesorando a familias, inversores y empresas en todo el litoral catarinense. Cada operación se trata con la dedicación y el profesionalismo que nos caracterizan.",
      sobreP3: "Nuestro equipo combina un profundo conocimiento del mercado inmobiliario local con una red consolidada de socios — bancos, notarías, evaluadores y constructoras — para garantizar resultados consistentes en cualquier tipo de operación.",
      sobreLink: "Agende una visita →",
      contatoCtaTitle: "¿Listo para encontrar la propiedad de sus sueños?",
      contatoCtaP: "Solicite una consultoría gratuita y descubra las mejores opciones para usted y su familia.",
      contatoCtaWhats: "Hable por WhatsApp",
      contatoCtaMsg: "Enviar mensaje",
      contatoFormLabelName: "Nombre completo",
      contatoFormLabelEmail: "Correo electrónico",
      contatoFormLabelPhone: "Teléfono / WhatsApp",
      contatoFormLabelMsg: "Mensaje",
      contatoPlaceholderName: "Su nombre",
      contatoPlaceholderEmail: "su@email.com",
      contatoPlaceholderPhone: "(47) 99999-9999",
      contatoPlaceholderMsg: "Escriba su mensaje...",
      contatoLgpd: "Autorizo el tratamiento de mis datos personales de acuerdo con la Ley General de Protección de Datos (LGPD) para fines de contacto y respuesta a mi solicitud. Para más información, consulte nuestra",
      contatoLgpdLink: "Política de Privacidad",
      contatoBtn: "Enviar mensaje",
      contatoSuccessTitle: "¡Mensaje enviado! ✓",
      contatoSuccessP: "Gracias por contactarnos. Le responderemos pronto.",
      finLabelPrice: "Valor del inmueble (R$)",
      finLabelDown: "Entrada (R$)",
      finLabelRate: "Tasa de interés (% a.a.)",
      finLabelTerm: "Plazo (meses)",
      finBtn: "Calcular",
      finResultFinanced: "Valor financiado",
      finResultMonthly: "Cuota mensual",
      finResultTotal: "Total del financiamiento",
      finResultInterest: "Total de intereses",
      finOpt15: "15 años (180 meses)",
      finOpt20: "20 años (240 meses)",
      finOpt25: "25 años (300 meses)",
      finOpt30: "30 años (360 meses)",
      faqCta: "¿Aún tiene dudas?",
      faqCtaLink: "Hable con nuestro equipo →",
      footerDesc: "Referencia en consultoría inmobiliaria en el litoral catarinense. Más de 15 años transformando sueños en direcciones.",
      footerNavTitle: "Navegación",
      footerContactTitle: "Contacto",
      footerCredit: "Hecho con dedicación para nuestros clientes.",
      whatsappFab: "Contáctenos por WhatsApp",
      backToTop: "Volver al inicio",
      navAriaLabel: "Navegación principal",
      mobileNavAriaLabel: "Menú de navegación",
      searchPurposeAll: "Todas las propiedades"
    }
  },

  cards: {
    pt: {
      sale: "Venda", rent: "Aluguel", launch: "Lançamento",
      bedroom: "quarto", bedrooms: "quartos",
      bathroom: "banheiro", bathrooms: "banheiros",
      parking: "vaga", parkings: "vagas",
      zone: "Zona", topography: "Topografia", sqm: "m²", perMonth: "/mês",
      front: "Frente", backs: "Fundos",
      favorite: "Favoritar", viewDetails: "Ver detalhes", wantToKnow: "Quero saber mais",
      virtualTour: "Tour Virtual", learnMore: "Conheça o empreendimento",
      aboutProperty: "Sobre este imóvel", features: "Características",
      scheduleVisit: "Agendar visita", viewOnMap: "Ver no mapa",
      share: "Compartilhar", otherProperties: "Outros imóveis",
      loadMore: "Carregar mais", remaining: "restantes",
      aboutDevelopment: "Sobre o empreendimento", floorPlans: "Plantas",
      constructionTimeline: "Cronograma de obras",
      amenities: "Lazer e amenities", priceTable: "Tabela de preços",
      unit: "Unidade", area: "Área", value: "Valor",
      paymentTerms: "Condições de pagamento",
      readMore: "Ler mais", by: "Por",
      backToBlog: "Voltar para o blog", sala: "Sala",
      viewAll: "Ver todos", noneAvailable: "Nenhum disponível",
      galleryClose: "Fechar galeria", galleryPrev: "Anterior", galleryNext: "Próximo", galleryDetails: "Ver detalhes completos", galleryAria: "Galeria de fotos",
      finError: "A entrada não pode ser maior ou igual ao valor do imóvel.", finObs: "* Simulação com taxa fixa de juros. Valores aproximados sujeitos a aprovação de crédito.",
      linkCopied: "Link copiado!",
      copyright: "Todos os direitos reservados.",
      heroSearch: "Buscar",
      sold: "Vendido", rented: "Locado", available: "Disponível"
    },
    en: {
      sale: "Sale", rent: "Rent", launch: "Launch",
      bedroom: "bedroom", bedrooms: "bedrooms",
      bathroom: "bathroom", bathrooms: "bathrooms",
      parking: "parking", parkings: "parkings",
      zone: "Zone", topography: "Topography", sqm: "sq ft", perMonth: "/month",
      front: "Front", backs: "Back",
      favorite: "Favorite", viewDetails: "View details", wantToKnow: "I want to know more",
      virtualTour: "Virtual Tour", learnMore: "Learn about the development",
      aboutProperty: "About this property", features: "Features",
      scheduleVisit: "Schedule visit", viewOnMap: "View on map",
      share: "Share", otherProperties: "Other properties",
      loadMore: "Load more", remaining: "remaining",
      aboutDevelopment: "About the development", floorPlans: "Floor plans",
      constructionTimeline: "Construction timeline",
      amenities: "Amenities", priceTable: "Price table",
      unit: "Unit", area: "Area", value: "Value",
      paymentTerms: "Payment terms",
      readMore: "Read more", by: "By",
      backToBlog: "Back to blog", sala: "Office",
      viewAll: "View all", noneAvailable: "None available",
      galleryClose: "Close gallery", galleryPrev: "Previous", galleryNext: "Next", galleryDetails: "View full details", galleryAria: "Photo gallery",
      finError: "The down payment cannot be greater than or equal to the property value.", finObs: "* Simulation with fixed interest rate. Approximate values subject to credit approval.",
      linkCopied: "Link copied!",
      copyright: "All rights reserved.",
      heroSearch: "Search",
      sold: "Sold", rented: "Rented", available: "Available"
    },
    es: {
      sale: "Venta", rent: "Alquiler", launch: "Lanzamiento",
      bedroom: "dormitorio", bedrooms: "dormitorios",
      bathroom: "baño", bathrooms: "baños",
      parking: "estacionamiento", parkings: "estacionamientos",
      zone: "Zona", topography: "Topografía", sqm: "m²", perMonth: "/mes",
      front: "Frente", backs: "Fondo",
      favorite: "Favorito", viewDetails: "Ver detalles", wantToKnow: "Quiero saber más",
      virtualTour: "Tour Virtual", learnMore: "Conozca el emprendimiento",
      aboutProperty: "Sobre esta propiedad", features: "Características",
      scheduleVisit: "Agendar visita", viewOnMap: "Ver en mapa",
      share: "Compartir", otherProperties: "Otras propiedades",
      loadMore: "Cargar más", remaining: "restantes",
      aboutDevelopment: "Sobre el emprendimiento", floorPlans: "Planos",
      constructionTimeline: "Cronograma de obras",
      amenities: "Amenidades", priceTable: "Tabla de precios",
      unit: "Unidad", area: "Área", value: "Valor",
      paymentTerms: "Condiciones de pago",
      readMore: "Leer más", by: "Por",
      backToBlog: "Volver al blog", sala: "Oficina",
      viewAll: "Ver todo", noneAvailable: "Ninguno disponible",
      galleryClose: "Cerrar galería", galleryPrev: "Anterior", galleryNext: "Siguiente", galleryDetails: "Ver detalles completos", galleryAria: "Galería de fotos",
      finError: "La entrada no puede ser mayor o igual al valor del inmueble.", finObs: "* Simulación con tasa fija de intereses. Valores aproximados sujetos a aprobación de crédito.",
      linkCopied: "¡Link copiado!",
      copyright: "Todos los derechos reservados.",
      heroSearch: "Buscar",
      sold: "Vendido", rented: "Alquilado", available: "Disponible"
    }
  },

  servicos: {
    pt: [
      { title: "Comprar", desc: "Assessoria completa para compra de imóveis residenciais e comerciais. Análise de documentação, negociação e financiamento." },
      { title: "Alugar", desc: "Gestão de locação com segurança jurídica. Seleção de inquilinos, contratos e acompanhamento durante todo o período." },
      { title: "Vender", desc: "Estratégias de marketing e precificação para vender seu imóvel mais rápido e pelo melhor valor de mercado." },
      { title: "Avaliação", desc: "Laudo de avaliação imobiliária com metodologia reconhecida pelo mercado. Ideal para financiamento, inventário ou venda." }
    ],
    en: [
      { title: "Buy", desc: "Complete advisory for purchasing residential and commercial properties. Document analysis, negotiation and financing." },
      { title: "Rent", desc: "Lease management with legal security. Tenant selection, contracts and support throughout the entire period." },
      { title: "Sell", desc: "Marketing and pricing strategies to sell your property faster and at the best market value." },
      { title: "Appraisal", desc: "Real estate appraisal report with market-recognized methodology. Ideal for financing, inventory or sale." }
    ],
    es: [
      { title: "Comprar", desc: "Asesoría completa para la compra de inmuebles residenciales y comerciales. Análisis de documentación, negociación y financiamiento." },
      { title: "Alquilar", desc: "Gestión de alquiler con seguridad jurídica. Selección de inquilinos, contratos y acompañamiento durante todo el período." },
      { title: "Vender", desc: "Estrategias de marketing y fijación de precios para vender su inmueble más rápido y al mejor valor de mercado." },
      { title: "Evaluación", desc: "Informe de avalúo inmobiliario con metodología reconocida por el mercado. Ideal para financiamiento, inventario o venta." }
    ]
  },

  faq: {
    pt: [
      { q: "Como funciona o processo de compra de um imóvel?", a: "O processo inicia com a visita ao imóvel e análise da documentação. Após a aprovação, realizamos uma proposta formal e, uma vez aceita, encaminhamos para a análise de crédito e financiamento bancário. Acompanhamos cada etapa até a assinatura da escritura e registro em cartório." },
      { q: "Quais documentos preciso para financiar um imóvel?", a: "Para pessoa física, são necessários: RG, CPF, comprovante de residência, comprovante de renda (holerites, declaração de IR, extratos bancários), certidão de casamento (se aplicável) e certidão de ônus reais. Para autônomos, adicionamos declaração de pró-labore e DAS." },
      { q: "Qual a diferença entre aluguel residencial e comercial?", a: "O aluguel comercial possui regras específicas da Lei do Inquilinato, com prazos geralmente mais longos (mínimo de 36 meses), garantias diferenciadas (fiança, seguro, caução ou carta de fiança) e possibilidade de fundo de comércio. Já o residencial tem prazos mais flexíveis (a partir de 12 meses) e garantias como fiador ou seguro fiança." },
      { q: "Como é feita a avaliação de um imóvel?", a: "Nossa avaliação considera: localização, metragem, estado de conservação, padrão construtivo, valor de mercado da região, ofertas similares na área e potencial de valorização. Para imóveis comerciais, também analisamos fluxo de pessoas, visibilidade e infraestrutura do entorno." },
      { q: "Quanto tempo leva para vender um imóvel?", a: "O tempo médio varia conforme o tipo de imóvel, localização e preço. Em Balneário Camboriú, a média é de 3 a 6 meses para imóveis bem precificados. Com nossa estratégia de marketing e network de parceiros, conseguimos reduzir esse tempo para 2 a 4 meses em média." },
      { q: "Vocês atendem em quais regiões?", a: "Atendemos todo o litoral catarinense, com escritórios físicos em Balneário Camboriú, Florianópolis, Itapema, Bombinhas e Joinville. Também realizamos atendimento remoto para clientes de outras regiões interessados em investir em Santa Catarina." }
    ],
    en: [
      { q: "How does the property purchase process work?", a: "The process begins with a property visit and document analysis. After approval, we submit a formal offer and, once accepted, forward it for credit analysis and bank financing. We follow each step until the deed signing and notary registration." },
      { q: "What documents do I need to finance a property?", a: "For individuals: ID, CPF, proof of residence, proof of income (pay stubs, tax returns, bank statements), marriage certificate (if applicable) and real estate lien certificate. For self-employed, we also require professional income declaration and DAS." },
      { q: "What is the difference between residential and commercial rental?", a: "Commercial rental has specific rules under the Tenancy Law, with generally longer terms (minimum 36 months), different guarantees (surety, insurance, deposit or letter of guarantee) and possibility of goodwill. Residential rental has more flexible terms (from 12 months) and guarantees such as a guarantor or rental insurance." },
      { q: "How is a property appraisal done?", a: "Our appraisal considers: location, square footage, state of conservation, construction standard, regional market value, similar listings in the area and appreciation potential. For commercial properties, we also analyze pedestrian flow, visibility and surrounding infrastructure." },
      { q: "How long does it take to sell a property?", a: "The average time varies according to property type, location and price. In Balneário Camboriú, the average is 3 to 6 months for well-priced properties. With our marketing strategy and partner network, we can reduce this time to 2 to 4 months on average." },
      { q: "Which regions do you serve?", a: "We serve the entire coast of Santa Catarina, with physical offices in Balneário Camboriú, Florianópolis, Itapema, Bombinhas and Joinville. We also provide remote service for clients from other regions interested in investing in Santa Catarina." }
    ],
    es: [
      { q: "¿Cómo funciona el proceso de compra de un inmueble?", a: "El proceso comienza con la visita al inmueble y el análisis de documentación. Tras la aprobación, realizamos una oferta formal y, una vez aceptada, la enviamos para análisis de crédito y financiamiento bancario. Acompañamos cada etapa hasta la firma de la escritura y registro notarial." },
      { q: "¿Qué documentos necesito para financiar un inmueble?", a: "Para persona física: RG, CPF, comprobante de residencia, comprobante de ingresos (recibos de sueldo, declaración de IR, extractos bancarios), certificado de matrimonio (si aplica) y certificado de gravámenes reales. Para autónomos, agregamos declaración de pró-labore y DAS." },
      { q: "¿Cuál es la diferencia entre alquiler residencial y comercial?", a: "El alquiler comercial tiene reglas específicas de la Ley de Inquilinato, con plazos generalmente más largos (mínimo 36 meses), garantías diferenciadas (fianza, seguro, depósito o carta de garantía) y posibilidad de fondo de comercio. El residencial tiene plazos más flexibles (a partir de 12 meses) y garantías como fiador o seguro de fianza." },
      { q: "¿Cómo se realiza la evaluación de un inmueble?", a: "Nuestra evaluación considera: ubicación, metraje, estado de conservación, estándar constructivo, valor de mercado de la región, ofertas similares en el área y potencial de valorización. Para inmuebles comerciales, también analizamos flujo de personas, visibilidad e infraestructura del entorno." },
      { q: "¿Cuánto tiempo lleva vender un inmueble?", a: "El tiempo promedio varía según el tipo de inmueble, ubicación y precio. En Balneário Camboriú, el promedio es de 3 a 6 meses para inmuebles bien valorados. Con nuestra estrategia de marketing y red de socios, podemos reducir este tiempo a 2 a 4 meses en promedio." },
      { q: "¿En qué regiones atienden?", a: "Atendemos todo el litoral catarinense, con oficinas físicas en Balneário Camboriú, Florianópolis, Itapema, Bombinhas y Joinville. También realizamos atención remota para clientes de otras regiones interesados en invertir en Santa Catarina." }
    ]
  },

  depoimentos: {
    pt: [
      { text: "A Su Imobiliária fez toda a diferença na compra do nosso primeiro apartamento. Profissionais atenciosos, transparentes e extremamente competentes. Recomendo de olhos fechados!", name: "Ana Carolina Silva", role: "Compradora • Apartamento 2 quartos • Balneário Camboriú" },
      { text: "Vendi meu apartamento em menos de 30 dias graças ao trabalho sério da equipe. A precificação foi certeira e a comunicação impecável do começo ao fim.", name: "Luciano Mendes", role: "Vendedor • Cobertura • Florianópolis" },
      { text: "Alugo um imóvel comercial há 3 anos com a Su Imobiliária. A gestão é impecável, os relatórios são mensais e qualquer manutenção é resolvida rapidamente. Parceria que dá certo.", name: "Roberta Oliveira", role: "Locatária • Sala comercial • Itapema" }
    ],
    en: [
      { text: "Su Imobiliária made all the difference when purchasing our first apartment. Attentive, transparent and extremely competent professionals. I recommend them with my eyes closed!", name: "Ana Carolina Silva", role: "Buyer • 2-bedroom apartment • Balneário Camboriú" },
      { text: "I sold my apartment in less than 30 days thanks to the team's serious work. The pricing was spot on and communication was impeccable from start to finish.", name: "Luciano Mendes", role: "Seller • Penthouse • Florianópolis" },
      { text: "I've been renting a commercial property with Su Imobiliária for 3 years. The management is impeccable, reports are monthly and any maintenance is resolved quickly. A partnership that works.", name: "Roberta Oliveira", role: "Tenant • Commercial office • Itapema" }
    ],
    es: [
      { text: "Su Imobiliária marcó la diferencia en la compra de nuestro primer apartamento. Profesionales atentos, transparentes y extremadamente competentes. ¡Lo recomiendo con los ojos cerrados!", name: "Ana Carolina Silva", role: "Compradora • Apartamento 2 dormitorios • Balneário Camboriú" },
      { text: "Vendí mi apartamento en menos de 30 días gracias al trabajo serio del equipo. La valoración fue acertada y la comunicación impecable de principio a fin.", name: "Luciano Mendes", role: "Vendedor • Ático • Florianópolis" },
      { text: "Alquilo un inmueble comercial desde hace 3 años con Su Imobiliária. La gestión es impecable, los informes son mensuales y cualquier mantenimiento se resuelve rápidamente. Una asociación que funciona.", name: "Roberta Oliveira", role: "Arrendataria • Oficina comercial • Itapema" }
    ]
  },

  parceiros: {
    pt: ["Caixa Econômica", "Banco do Brasil", "Itaú", "Santander", "Bradesco", "Sicredi"],
    en: ["Caixa Econômica", "Banco do Brasil", "Itaú", "Santander", "Bradesco", "Sicredi"],
    es: ["Caixa Econômica", "Banco do Brasil", "Itaú", "Santander", "Bradesco", "Sicredi"]
  },

  stats: {
    pt: ["Imóveis comercializados", "Anos de experiência", "Clientes satisfeitos", "Parceiros credenciados"],
    en: ["Properties sold", "Years of experience", "Satisfied clients", "Accredited partners"],
    es: ["Inmuebles comercializados", "Años de experiencia", "Clientes satisfechos", "Socios acreditados"]
  }
};

/* ===================================================================
   STATS — números que aparecen en "Quem somos" y en la sección STATS
   (sobre muestra los 3 primeros; stats muestra todos)
   =================================================================== */
const STATS = [
  { value: "+500", label: "Im\u00F3veis comercializados" },
  { value: "+15",  label: "Anos de experi\u00EAncia" },
  { value: "+300", label: "Clientes satisfeitos" },
  { value: "+50",  label: "Parceiros credenciados" }
];

/* Hero slideshow — imágenes de fondo que rotan automáticamente */
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80"
];
const HERO_VIDEO = ""; // URL de un video MP4 (opcional — si se llena, aparece en vez de las imágenes)

/* Secciones deshabilitadas — poné los IDs que NO querés mostrar en el menú ni en el SPA */
/* IDs disponibles: "sobre", "stats", "servicos", "depoimentos", "parceiros", "faq", "financiamento" */
const DISABLED_SECTIONS = ["alugar","stats","favoritos"]; // ej: ["stats", "faq"]

/* Redes sociales — aparecen en el footer. Dejá vacío si no tenés */
const SOCIAL = {
  instagram: "https://instagram.com/suimobiliaria",
  facebook:  "https://facebook.com/suimobiliaria",
  youtube:   "https://youtube.com/@suimobiliaria",
  linkedin:  ""
};

/* Paginación — cuántos imóveis mostrar por página */
const PAGE_SIZE = 6;

/* Menú desplegable en el nav (Comprar → Categoría → Quartos) */
const ENABLE_DROPDOWN_MENU = true; // cambiá a true para activar


/* ===================================================================
   TABELA: PROPERTIES (Imóveis para venda / aluguel)
   ===================================================================
   Campos:
     id         = identificador único (ex: "prop-1", "prop-11")
     type       = "sale" (venda) ou "rent" (aluguel)
     category   = Apartamento | Casa | Cobertura | Kitnet/Studio | Terreno | Comercial
     title      = Nome do imóvel
     price      = Texto do preço (ex: "R$ 1.250.000")
     priceNum   = Preço só números (ex: 1250000) — usado na busca
      location   = Cidade (ex: "Balneário Camboriú")
      maps       = URL do Google Maps (ex: "https://maps.app.goo.gl/...") — opcional
      lat, lng   = Coordenadas para o mapa interativo (ex: lat: -26.9947, lng: -48.6353)
     desc       = Descrição curta (aparece na card)
     beds       = Quartos (0 se não aplicável)
     baths      = Banheiros
     garage     = Vagas
     area       = Metragem (m²)
     img        = URL da foto principal (use w=800)
     gallery    = [ URLs das fotos da galeria (use w=1200) ]
     video      = URL do YouTube embed (ex: "https://www.youtube.com/embed/...")
     features   = [ Lista de características ]
     description= Descrição longa. Use \n\n para separar parágrafos.
     front      = Metros de frente (só para Terreno) — opcional
     back       = Metros de fundo (só para Terreno) — opcional
     zone       = Zona (só para Terreno, ex: "Urbana", "Rural") — opcional, padrão "Urbana"
      topography = Topografia (só para Terreno, ex: "Plana", "Aclive") — opcional, padrão "Plana"
    =================================================================== */

const PROPERTIES = [

  /* ---- VENDA ---- */

  // ------------------------- prop-1 -------------------------
  {
    id: "prop-1",
    type: "sale",
    category: "Apartamento",
    title: "Apartamento de Luxo",
    price: "R$ 1.250.000",
    priceNum: 1250000,
    location: "Balneário Camboriú",
    maps: "https://maps.app.goo.gl/5qLkY3F5kNqB3aZJ8",
    lat: -26.9920, lng: -48.6330,
    status: "disponivel",
    desc: "Amplo apartamento com acabamento premium na melhor região de Balneário Camboriú.",
    beds: 3,  baths: 2,  garage: 1,  area: 128,
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18f5b0042?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80"
    ],
    video: "https://www.youtube.com/embed/6LM4N9B7y6I",
    features: [
      "3 quartos sendo 1 suíte master com closet",
      "2 banheiros sociais",
      "1 vaga de garagem coberta",
      "Sacada gourmet com churrasqueira",
      "Cozinha planejada com eletrodomésticos",
      "Piso porcelanato em todos os ambientes",
      "Ar-condicionado split",
      "Portaria 24 horas",
      "Piscina e academia no condomínio",
      "Condomínio: R$ 890/mês",
      "IPTU: R$ 320/mês"
    ],
    description: "Deslumbrante apartamento localizado no coração de Balneário Camboriú, a apenas 200 metros da praia. O imóvel possui acabamento premium com piso em porcelanato, bancadas de granito e armários planejados em todos os ambientes.\n\nA sala de estar ampla e integrada à sacada gourmet com churrasqueira proporciona momentos únicos de confraternização. A cozinha é equipada com eletrodomésticos de última geração e despensa separada.\n\nO condomínio oferece piscina, academia, salão de festas e portaria 24 horas. Uma oportunidade imperdível para quem busca qualidade de vida e valorização imobiliária."
  },

  // ------------------------- prop-2 -------------------------
  {
    id: "prop-2",
    type: "sale",
    category: "Casa",
    title: "Casa Contemporânea",
    price: "R$ 890.000",
    priceNum: 890000,
    location: "Florianópolis",
    maps: "https://maps.app.goo.gl/8zFh3ZmqXcV6nQe28",
    lat: -27.5940, lng: -48.5470,
    status: "disponivel",
    desc: "Casa moderna com piscina e área de lazer em condomínio fechado em Florianópolis.",
    beds: 4,  baths: 3,  garage: 2,  area: 210,
    img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18f5b0042?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1600563443848-1f5e5fa506b1?w=1200&q=80"
    ],
    video: "https://www.youtube.com/embed/3tmd-ClpJxA",
    features: [
      "4 quartos sendo 2 suítes",
      "3 banheiros + lavabo social",
      "2 vagas de garagem",
      "Piscina aquecida",
      "Churrasqueira e área gourmet",
      "Cozinha americana planejada",
      "Jardim paisagístico",
      "Ar-condicionado central",
      "Alarme e câmeras",
      "Condomínio: R$ 650/mês",
      "IPTU: R$ 280/mês"
    ],
    description: "Casa contemporânea em condomínio fechado de alto padrão em Florianópolis. O imóvel possui design arrojado, com amplas janelas que proporcionam iluminação natural abundante e integração com a área externa.\n\nNo pavimento inferior, encontramos sala de estar integrada à sala de jantar, cozinha americana moderna e lavabo social. O pavimento superior abriga 4 quartos, sendo 2 suítes com closet.\n\nO quintal conta com piscina aquecida, churrasqueira e jardim paisagístico. Condomínio com portaria 24h, câmeras de segurança e área de lazer compartilhada."
  },

  // ------------------------- prop-3 -------------------------
  {
    id: "prop-3",
    type: "sale",
    category: "Cobertura",
    title: "Cobertura Duplex",
    price: "R$ 2.100.000",
    priceNum: 2100000,
    location: "Itapema",
    maps: "https://maps.app.goo.gl/1tF9mLN5tLhKd4Pc7",
    lat: -27.1460, lng: -48.6090,
    status: "disponivel",
    desc: "Cobertura duplex com vista panorâmica para o mar, 2 vagas e terraço privativo em Itapema.",
    beds: 4,  baths: 4,  garage: 2,  area: 280,
    img: "https://images.unsplash.com/photo-1600566753086-00f18f5b0042?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600566753086-00f18f5b0042?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80"
    ],
    video: "https://www.youtube.com/embed/Fwci7F1mt-8",
    features: [
      "4 suítes com closet",
      "4 banheiros + lavabo",
      "2 vagas de garagem",
      "Terraço com ofurô e piscina",
      "Cozinha gourmet completa",
      "Pé-direito duplo na sala",
      "Automação residencial",
      "Piso em mármore",
      "Portaria 24 horas",
      "Condomínio: R$ 1.450/mês",
      "IPTU: R$ 580/mês"
    ],
    description: "Cobertura duplex com vista panorâmica para o mar de Itapema. São 280 m² de área privativa distribuídos em dois pavimentos, com acabamento de altíssimo padrão e design exclusivo.\n\nO primeiro pavimento conta com sala ampla com pé-direito duplo, cozinha gourmet, lavabo e suíte master. O segundo pavimento possui mais 3 suítes e um terraço privativo com ofurô e piscina de borda infinita.\n\nEdifício com infraestrutura completa: piscina, academia, spa, salão de festas, playground e portaria 24 horas. Uma oportunidade única para quem busca o melhor da vida à beira-mar."
  },

  // ------------------------- prop-4 -------------------------
  {
    id: "prop-4",
    type: "sale",
    category: "Kitnet/Studio",
    title: "Studio Mobiliado",
    price: "R$ 380.000",
    priceNum: 380000,
    location: "Bombinhas",
    maps: "https://maps.app.goo.gl/7zGp2RmL9vNwXeD45",
    lat: -27.1360, lng: -48.5150,
    status: "disponivel",
    desc: "Studio completo e mobiliado, ideal para investidores. Localização privilegiada em Bombinhas.",
    beds: 1,  baths: 1,  garage: 1,  area: 42,
    img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18f5b0042?w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80"
    ],
    video: "https://www.youtube.com/embed/6LM4N9B7y6I",
    features: [
      "1 quarto com cama de casal",
      "1 banheiro social",
      "1 vaga de garagem",
      "Mobiliado e decorado",
      "Cozinha americana equipada",
      "Ar-condicionado split",
      "TV 50 polegadas",
      "Piscina no condomínio",
      "Condomínio: R$ 380/mês",
      "IPTU: R$ 140/mês"
    ],
    description: "Studio completo e mobiliado, ideal para investidores que buscam rentabilidade com imóveis para temporada em Bombinhas. Localizado a 2 quadras da praia de Bombas, uma das mais bonitas da região.\n\nO imóvel é entregue com móveis planejados, eletrodomésticos, ar-condicionado e decoração completa. O condomínio conta com piscina, churrasqueira e salão de festas.\n\nExcelente potencial de locação por temporada, com retorno médio de 8% ao ano. Administração local disponível para gestão do aluguel."
  },

  // ------------------------- prop-5 -------------------------
  {
    id: "prop-5",
    type: "sale",
    category: "Terreno",
    title: "Terreno Residencial",
    price: "R$ 450.000",
    priceNum: 450000,
    location: "Joinville",
    maps: "https://maps.app.goo.gl/3jKm8NvT5wByRfG92",
    lat: -26.3020, lng: -48.8420,
    status: "disponivel",
    desc: "Terreno plano de 360 m² em loteamento aprovado, pronto para construir em Joinville.",
    beds: 0,  baths: 0,  garage: 0,  area: 360,
    img: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18f5b0042?w=1200&q=80"
    ],
    video: "https://www.youtube.com/embed/3tmd-ClpJxA",
    features: [
      "360 m² de área total",
      "12 metros de frente",
      "30 metros de profundidade",
      "Topografia plana",
      "Loteamento aprovado",
      "Infraestrutura completa",
      "Zoneamento residencial R3",
      "Documentação regular",
      "Próximo a comércio e escolas",
      "IPTU: R$ 180/mês"
    ],
    description: "Terreno residencial de 360 m² localizado em loteamento aprovado no bairro América, uma das regiões mais valorizadas de Joinville. Topografia plana, solo firme e pronto para construir.\n\nO loteamento conta com infraestrutura completa: asfalto, redes de água, esgoto, energia elétrica, iluminação pública e galho pluvial. A região é servida por escolas, hospitais, supermercados e transporte público a menos de 1 km.\n\nIdeal para construção de casa ou pequeno condomínio residencial. Zoneamento permite até 4 pavimentos. Documentação totalmente regularizada."
  },

  // ------------------------- prop-6 -------------------------
  {
    id: "prop-6",
    type: "sale",
    category: "Comercial",
    title: "Sala Comercial",
    price: "R$ 620.000",
    priceNum: 620000,
    location: "Balneário Camboriú",
    maps: "https://maps.app.goo.gl/5qLkY3F5kNqB3aZJ8",
    lat: -26.9970, lng: -48.6370,
    status: "disponivel",
    desc: "Sala comercial em edifício corporativo com infraestrutura completa em Balneário Camboriú.",
    beds: 0,  baths: 1,  garage: 1,  area: 55,
    img: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80"
    ],
    video: "https://www.youtube.com/embed/Fwci7F1mt-8",
    features: [
      "55 m² de área privativa",
      "1 sala com divisórias de vidro",
      "1 banheiro privativo",
      "Copa integrada",
      "1 vaga de garagem",
      "Piso elevado técnico",
      "Forro acústico",
      "Ar-condicionado central",
      "Portaria 24 horas",
      "Gerador próprio",
      "Condomínio: R$ 1.100/mês",
      "IPTU: R$ 410/mês"
    ],
    description: "Sala comercial em edifício corporativo classe A na principal avenida comercial de Balneário Camboriú. O imóvel está em perfeito estado de conservação, com piso elevado, forro acústico e instalações elétricas e de dados aparentes.\n\nO edifício conta com portaria 24 horas, segurança patrimonial, gerador próprio, 4 elevadores, hall de entrada imponente e estacionamento para visitantes. A sala possui divisórias de vidro, copa e banheiro privativo.\n\nLocalização estratégica próxima a bancos, restaurantes, hotéis e comércio variado. Ideal para escritórios de advocacia, consultórios, imobiliárias ou filiais corporativas."
  },

  /* ---- ALUGUEL ---- */

  // ------------------------- prop-7 -------------------------
  {
    id: "prop-7",
    type: "rent",
    category: "Apartamento",
    title: "Apartamento Centro",
    price: "R$ 3.500/mês",
    priceNum: 3500,
    location: "Florianópolis",
    maps: "https://maps.app.goo.gl/8zFh3ZmqXcV6nQe28",
    lat: -27.5990, lng: -48.5520,
    status: "disponivel",
    desc: "Apartamento bem localizado próximo a universidades, comércio e transporte público em Florianópolis.",
    beds: 2,  baths: 1,  garage: 1,  area: 68,
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18f5b0042?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80"
    ],
    video: "https://www.youtube.com/embed/6LM4N9B7y6I",
    features: [
      "2 quartos sendo 1 suíte",
      "1 banheiro social",
      "1 vaga de garagem",
      "Cozinha americana planejada",
      "Lavanderia separada",
      "Portaria eletrônica",
      "Câmeras de segurança",
      "Próximo a universidades",
      "Condomínio: R$ 480/mês",
      "IPTU: R$ 200/mês",
      "Garantia: fiador ou seguro"
    ],
    description: "Apartamento bem localizado no centro de Florianópolis, próximo a universidades, comércio, hospitais e transporte público. Ideal para estudantes, profissionais liberais ou casais jovens.\n\nO imóvel possui sala integrada à cozinha americana, 2 quartos sendo 1 suíte, banheiro social, lavanderia e vaga de garagem. O condomínio oferece portaria eletrônica e câmeras de segurança.\n\nContrato de locação a partir de 12 meses com possibilidade de renovação. Aceita fiador, seguro fiança ou caução."
  },

  // ------------------------- prop-8 -------------------------
  {
    id: "prop-8",
    type: "rent",
    category: "Casa",
    title: "Casa de Temporada",
    price: "R$ 4.800/mês",
    priceNum: 4800,
    location: "Bombinhas",
    maps: "https://maps.app.goo.gl/7zGp2RmL9vNwXeD45",
    lat: -27.1400, lng: -48.5190,
    status: "disponivel",
    desc: "Casa ampla com piscina, churrasqueira e jardim, perfeita para temporada em Bombinhas.",
    beds: 3,  baths: 2,  garage: 2,  area: 160,
    img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18f5b0042?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1600563443848-1f5e5fa506b1?w=1200&q=80"
    ],
    video: "https://www.youtube.com/embed/3tmd-ClpJxA",
    features: [
      "3 quartos sendo 1 suíte",
      "2 banheiros sociais",
      "2 vagas de garagem",
      "Piscina com cascata",
      "Churrasqueira fixa",
      "Cozinha completa equipada",
      "Mobiliado",
      "Jardim com gramado",
      "500 m da praia",
      "Alarme de segurança",
      "Condomínio: R$ 350/mês",
      "IPTU: R$ 220/mês"
    ],
    description: "Casa ampla e confortável em Bombinhas, perfeita para temporada ou locação anual. A casa possui 3 quartos, sala de estar ampla, cozinha completa e área de lazer com piscina e churrasqueira.\n\nO imóvel está mobiliado e equipado com todos os utensílios necessários. O jardim paisagístico e o quintal com gramado são perfeitos para crianças e animais de estimação.\n\nLocalização privilegiada a 500 metros da praia de Bombas, próximo a mercados, farmácias e restaurantes. Aluguel por temporada (mínimo 7 dias) ou contrato anual."
  },

  // ------------------------- prop-9 -------------------------
  {
    id: "prop-9",
    type: "rent",
    category: "Kitnet/Studio",
    title: "Kitnet/Studio",
    price: "R$ 2.200/mês",
    priceNum: 2200,
    location: "Balneário Camboriú",
    maps: "https://maps.app.goo.gl/5qLkY3F5kNqB3aZJ8",
    lat: -26.9930, lng: -48.6380,
    status: "disponivel",
    desc: "Studio compacto e moderno, ideal para solteiros ou casais. Mobiliado e com condomínio incluso em Balneário Camboriú.",
    beds: 1,  baths: 1,  garage: 0,  area: 35,
    img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18f5b0042?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80"
    ],
    video: "https://www.youtube.com/embed/Fwci7F1mt-8",
    features: [
      "1 quarto com cama de casal",
      "1 banheiro social",
      "Condomínio incluso",
      "Mobiliado e equipado",
      "Cozinha americana",
      "Ar-condicionado split",
      "TV 43 polegadas",
      "Academia no prédio",
      "Bicicletário",
      "Lavanderia compartilhada",
      "3 quadras da praia",
      "Contrato a partir de 6 meses"
    ],
    description: "Studio moderno e compacto, ideal para solteiros ou casais jovens que buscam praticidade e localização privilegiada em Balneário Camboriú. O imóvel é mobiliado e equipado, com condomínio incluso no valor do aluguel.\n\nO studio possui sala integrada à cozinha americana, quarto com cama de casal, banheiro social e lavabo. O prédio conta com academia, lavanderia compartilhada e bicicletário.\n\nLocalizado a 3 quadras da praia, próximo a bares, restaurantes e supermercados. Contrato de locação a partir de 6 meses."
  },

  // ------------------------- prop-10 -------------------------
  {
    id: "prop-10",
    type: "rent",
    category: "Comercial",
    title: "Sala Comercial",
    price: "R$ 2.900/mês",
    priceNum: 2900,
    location: "Itapema",
    maps: "https://maps.app.goo.gl/1tF9mLN5tLhKd4Pc7",
    lat: -27.1500, lng: -48.6140,
    status: "disponivel",
    desc: "Sala comercial pronta para uso em edifício corporativo com portaria 24h, em Itapema.",
    beds: 0,  baths: 1,  garage: 1,  area: 48,
    img: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80"
    ],
    video: "https://www.youtube.com/embed/6LM4N9B7y6I",
    features: [
      "48 m² de área útil",
      "Layout aberto",
      "1 banheiro privativo",
      "1 vaga de garagem",
      "Piso porcelanato",
      "Ar-condicionado split",
      "Portaria 24 horas",
      "3 elevadores",
      "Próximo ao comércio",
      "Condomínio: R$ 680/mês",
      "IPTU: R$ 290/mês",
      "Contrato mínimo 24 meses"
    ],
    description: "Sala comercial disponível para locação em edifício corporativo em Itapema. O imóvel possui layout aberto, ideal para adaptação conforme a necessidade do negócio. Piso porcelanato, pintura nova e instalações elétricas em bom estado.\n\nO edifício conta com portaria 24 horas, câmeras de segurança, 3 elevadores e estacionamento para visitantes. A localização é privilegiada, na principal avenida da cidade com grande fluxo de pessoas e veículos.\n\nContrato de locação comercial com prazo mínimo de 24 meses. Garantias: fiança bancária, seguro fiança ou carta de fiança. Pronta para uso imediato."
  }

];


/* ===================================================================
   TABELA: EMPREENDIMENTOS (Lançamentos)
   ===================================================================
   Campos:
     id           = identificador único (ex: "emp-meupredio")
     title        = Nome do empreendimento
     location     = Cidade — Estado (ex: "Balneário Camboriú — SC")
     price        = Texto do preço (ex: "A partir de R$ 850.000")
     priceNum     = Preço só números (ex: 850000)
     description  = Descrição longa. Use \n\n para parágrafos.
     img          = URL da foto principal (use w=800)
     gallery      = [ URLs das fotos da galeria ]
     video        = URL do YouTube embed
     tags         = [ Tags: "LANÇAMENTO", "32 ANDARES", etc ]
     progress     = Percentual vendido (0-100)
     progressLabel= Texto do progresso (ex: "72% vendidos")
     delivery     = Previsão (ex: "Previsão: jun/2027")
     plants       = [ URLs das plantas ]
     timeline     = [ { date, title, desc } ] — cronograma da obra
     amenities    = [ Lista de amenities ]
     prices       = [ { unit, area, value, highlight } ] — tabela de preços
     payment      = [ { label, value } ] — condições de pagamento
   =================================================================== */

const EMPREENDIMENTOS = [

  // -------------------- emp-parkavenue --------------------
  {
    id: "emp-parkavenue",
    title: "Park Avenue Residence",
    location: "Balneário Camboriú — SC",
    price: "A partir de R$ 850.000",
    priceNum: 850000,
    lat: -26.9900, lng: -48.6320,
    description: "O Park Avenue Residence é um empreendimento de alto padrão localizado na Avenida Atlântica, a poucos passos da praia. Com 32 pavimentos e unidades de 2 a 4 suítes, o edifício oferece uma experiência única de morar à beira-mar.\n\nTodos os apartamentos contam com acabamento premium, piso porcelanato, bancadas de quartzo, armários planejados e sistema de automação residencial. As unidades possuem de 98 a 210 m², com varandas gourmet e churrasqueira.\n\nA torre única impõe presença na orla, com fachada em vidro e design assinado por arquitetos renomados. A entrega está prevista para junho de 2027.",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18f5b0042?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
      "https://images.unsplash.com/photo-1600563443848-1f5e5fa506b1?w=800&q=80"
    ],
    video: "https://www.youtube.com/embed/6LM4N9B7y6I",
    tags: ["LANÇAMENTO", "32 ANDARES", "VISTA PARA O MAR"],
    progress: 72,
    progressLabel: "72% vendidos",
    delivery: "Previsão: jun/2027",
    plants: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80",
      "https://images.unsplash.com/photo-1600563443848-1f5e5fa506b1?w=800&q=80"
    ],
    timeline: [
      { date: "Jan 2025", title: "Início das obras", desc: "Movimentação de terra e fundações" },
      { date: "Jun 2026", title: "Estrutura concluída", desc: "Concretagem dos 32 pavimentos finalizada" },
      { date: "Dez 2026", title: "Acabamentos internos", desc: "Instalações elétricas, hidráulicas e revestimentos" },
      { date: "Jun 2027", title: "Entrega das chaves", desc: "Previsão de conclusão e entrega" }
    ],
    amenities: [
      "Piscina aquecida com vista para o mar",
      "Academia equipada",
      "Salão de festas",
      "Espaço gourmet",
      "Sauna seca e úmida",
      "Spa com ofurô",
      "Quadra poliesportiva",
      "Playground",
      "Salão de jogos",
      "Home cinema",
      "CO2 (sistema de aquecimento)",
      "Gerador de emergência"
    ],
    prices: [
      { unit: "2 quartos (padrão)",    area: "98 m²",  value: "R$ 850.000" },
      { unit: "3 quartos (padrão)",    area: "128 m²", value: "R$ 1.150.000" },
      { unit: "3 quartos (suíte)",     area: "145 m²", value: "R$ 1.380.000", highlight: true },
      { unit: "4 quartos (suíte)",     area: "180 m²", value: "R$ 1.750.000" },
      { unit: "Cobertura duplex",      area: "210 m²", value: "R$ 2.800.000" }
    ],
    payment: [
      { label: "Entrada",         value: "30%" },
      { label: "Durante a obra",  value: "48 parcelas" },
      { label: "Chaves",          value: "70% financiamento" }
    ]
  },

  // -------------------- emp-infinitycoast --------------------
  {
    id: "emp-infinitycoast",
    title: "Infinity Coast",
    location: "Florianópolis — SC",
    price: "A partir de R$ 620.000",
    priceNum: 620000,
    lat: -27.5980, lng: -48.5500,
    description: "O Infinity Coast é um condomínio resort localizado em Jurerê Internacional, um dos bairros mais nobres de Florianópolis. Com 4 torres de 18 andares cada, o empreendimento oferece unidades de 2 a 4 quartos com plantas que variam de 72 a 185 m².\n\nInspirado na arquitetura contemporânea, o Infinity Coast combina design sofisticado com sustentabilidade. Todas as unidades contam com aquecimento solar, sistema de reuso de água e janelas com vidro duplo para isolamento térmico e acústico.\n\nO condomínio ocupa uma área de 45.000 m², com 70% de área permeável e preservação da vegetação nativa. Previsão de entrega para dezembro de 2027.",
    img: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18f5b0042?w=800&q=80",
      "https://images.unsplash.com/photo-1600563443848-1f5e5fa506b1?w=800&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80"
    ],
    video: "https://www.youtube.com/embed/3tmd-ClpJxA",
    tags: ["LANÇAMENTO", "RESORT", "FRENTE PARA O MAR"],
    progress: 58,
    progressLabel: "58% vendidos",
    delivery: "Previsão: dez/2027",
    plants: [
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18f5b0042?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
    ],
    timeline: [
      { date: "Mar 2025", title: "Início das obras", desc: "Escavação e fundação das 4 torres" },
      { date: "Ago 2026", title: "Estrutura concluída", desc: "Todas as torres finalizadas estruturalmente" },
      { date: "Mai 2027", title: "Áreas comuns e lazer", desc: "Piscinas, paisagismo e áreas de convivência" },
      { date: "Dez 2027", title: "Entrega das chaves", desc: "Previsão de conclusão e entrega" }
    ],
    amenities: [
      "Piscina paisagística com borda infinita",
      "Piscina infantil aquecida",
      "Academia com vista para o mar",
      "Salão de festas com churrasqueira",
      "Espaço zen com yoga e meditação",
      "Spa com hidromassagem",
      "Quadra de tênis",
      "Campo de futebol society",
      "Playground com brinquedos ecológicos",
      "Brinquedoteca",
      "Espaço pet",
      "Bicicletário e carregamento para veículos elétricos"
    ],
    prices: [
      { unit: "2 quartos (padrão)",    area: "72 m²",  value: "R$ 620.000" },
      { unit: "3 quartos (padrão)",    area: "98 m²",  value: "R$ 890.000" },
      { unit: "3 quartos (suíte)",     area: "125 m²", value: "R$ 1.120.000" },
      { unit: "4 quartos (suíte)",     area: "160 m²", value: "R$ 1.450.000", highlight: true },
      { unit: "Cobertura",             area: "185 m²", value: "R$ 2.200.000" }
    ],
    payment: [
      { label: "Entrada",         value: "25%" },
      { label: "Durante a obra",  value: "60 parcelas" },
      { label: "Chaves",          value: "75% financiamento" }
    ]
  },

  // -------------------- emp-greenlife --------------------
  {
    id: "emp-greenlife",
    title: "Green Life Park",
    location: "Joinville — SC",
    price: "A partir de R$ 390.000",
    priceNum: 390000,
    lat: -26.3060, lng: -48.8470,
    description: "O Green Life Park é um condomínio horizontal composto por 12 torres de 8 andares cada, inserido em um parque particular de 70.000 m². O projeto prioriza a sustentabilidade com painéis solares, captação de água da chuva, telhado verde e estações de recarga para veículos elétricos.\n\nAs unidades de 2 e 3 quartos variam de 58 a 110 m², todas com varanda, churrasqueira e acabamento ecológico de alta qualidade. O condomínio conta com mais de 20.000 m² de área verde preservada, com trilhas ecológicas e lagoa paisagística.\n\nLocalizado no bairro América, próximo a escolas, hospitais e shopping centers, o Green Life Park é a escolha ideal para quem busca qualidade de vida sem abrir mão da conveniência urbana. Previsão de entrega para março de 2028.",
    img: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18f5b0042?w=800&q=80",
      "https://images.unsplash.com/photo-1600563443848-1f5e5fa506b1?w=800&q=80",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80"
    ],
    video: "https://www.youtube.com/embed/Fwci7F1mt-8",
    tags: ["LANÇAMENTO", "SUSTENTÁVEL", "ÁREAS VERDES"],
    progress: 45,
    progressLabel: "45% vendidos",
    delivery: "Previsão: mar/2028",
    plants: [
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18f5b0042?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
    ],
    timeline: [
      { date: "Abr 2025", title: "Início das obras", desc: "Preparação do terreno e fundações" },
      { date: "Out 2026", title: "Primeiras torres concluídas", desc: "Torres 1 a 4 com estrutura finalizada" },
      { date: "Set 2027", title: "Paisagismo e áreas comuns", desc: "Parque, lagoa e áreas de lazer" },
      { date: "Mar 2028", title: "Entrega das chaves", desc: "Previsão de conclusão geral" }
    ],
    amenities: [
      "Piscina natural com tratamento biológico",
      "Academia ao ar livre",
      "Salão de festas sustentável",
      "Espaço gourmet com forno a lenha",
      "Sauna seca",
      "Quadra poliesportiva",
      "Campo de futebol society",
      "Parque infantil ecológico",
      "Trilhas para caminhada",
      "Lagoa paisagística com deck",
      "Horta comunitária",
      "Bicicletário",
      "Salão de jogos",
      "Espaço coworking"
    ],
    prices: [
      { unit: "2 quartos (padrão)",    area: "58 m²",  value: "R$ 390.000" },
      { unit: "2 quartos (suíte)",     area: "68 m²",  value: "R$ 460.000" },
      { unit: "3 quartos (padrão)",    area: "82 m²",  value: "R$ 550.000", highlight: true },
      { unit: "3 quartos (suíte)",     area: "98 m²",  value: "R$ 650.000" },
      { unit: "Cobertura",             area: "110 m²", value: "R$ 890.000" }
    ],
    payment: [
      { label: "Entrada",         value: "20%" },
      { label: "Durante a obra",  value: "72 parcelas" },
      { label: "Chaves",          value: "80% financiamento" }
    ]
  }

];


/* ===================================================================
   TABELA: FAQS (Preguntas frecuentes)
   ===================================================================
   Campos:
     q = Pergunta
     a = Resposta
   =================================================================== */

const FAQS = [
  {
    q: "Como funciona o processo de compra de um imóvel?",
    a: "O processo inicia com a visita ao imóvel e análise da documentação. Após a aprovação, realizamos uma proposta formal e, uma vez aceita, encaminhamos para a análise de crédito e financiamento bancário. Acompanhamos cada etapa até a assinatura da escritura e registro em cartório."
  },
  {
    q: "Quais documentos preciso para financiar um imóvel?",
    a: "Para pessoa física, são necessários: RG, CPF, comprovante de residência, comprovante de renda (holerites, declaração de IR, extratos bancários), certidão de casamento (se aplicável) e certidão de ônus reais. Para autônomos, adicionamos declaração de pró-labore e DAS."
  },
  {
    q: "Qual a diferença entre aluguel residencial e comercial?",
    a: "O aluguel comercial possui regras específicas da Lei do Inquilinato, com prazos geralmente mais longos (mínimo de 36 meses), garantias diferenciadas (fiança, seguro, caução ou carta de fiança) e possibilidade de fundo de comércio. Já o residencial tem prazos mais flexíveis (a partir de 12 meses) e garantias como fiador ou seguro fiança."
  },
  {
    q: "Como é feita a avaliação de um imóvel?",
    a: "Nossa avaliação considera: localização, metragem, estado de conservação, padrão construtivo, valor de mercado da região, ofertas similares na área e potencial de valorização. Para imóveis comerciais, também analisamos fluxo de pessoas, visibilidade e infraestrutura do entorno."
  },
  {
    q: "Quanto tempo leva para vender um imóvel?",
    a: "O tempo médio varia conforme o tipo de imóvel, localização e preço. Em Balneário Camboriú, a média é de 3 a 6 meses para imóveis bem precificados. Com nossa estratégia de marketing e network de parceiros, conseguimos reduzir esse tempo para 2 a 4 meses em média."
  },
  {
    q: "Vocês atendem em quais regiões?",
    a: "Atendemos todo o litoral catarinense, com escritórios físicos em Balneário Camboriú, Florianópolis, Itapema, Bombinhas e Joinville. Também realizamos atendimento remoto para clientes de outras regiões interessados em investir em Santa Catarina."
  }
];


/* ===================================================================
   TABELA: DEPOIMENTOS
   ===================================================================
   Campos:
     text = Depoimento
     name = Nome do cliente
     role = Descrição (ex: "Compradora • Apartamento • Balneário Camboriú")
   =================================================================== */

const DEPOIMENTOS = [
  {
    text: "A Su Imobiliária fez toda a diferença na compra do nosso primeiro apartamento. Profissionais atenciosos, transparentes e extremamente competentes. Recomendo de olhos fechados!",
    name: "Ana Carolina Silva",
    role: "Compradora • Apartamento 2 quartos • Balneário Camboriú"
  },
  {
    text: "Vendi meu apartamento em menos de 30 dias graças ao trabalho sério da equipe. A precificação foi certeira e a comunicação impecável do começo ao fim.",
    name: "Luciano Mendes",
    role: "Vendedor • Cobertura • Florianópolis"
  },
  {
    text: "Alugo um imóvel comercial há 3 anos com a Su Imobiliária. A gestão é impecável, os relatórios são mensais e qualquer manutenção é resolvida rapidamente. Parceria que dá certo.",
    name: "Roberta Oliveira",
    role: "Locatária • Sala comercial • Itapema"
  }
];


/* ===================================================================
   TABELA: PARCEIROS
   ===================================================================
   Campos:
     name = Nome do banco/instituição
     img  = URL do logo
     url  = Link do site
   =================================================================== */

const PARCEIROS = [
  { name: "Caixa Econômica", img: "https://logo.clearbit.com/caixa.gov.br", url: "https://www.caixa.gov.br" },
  { name: "Banco do Brasil", img: "https://logo.clearbit.com/bb.com.br", url: "https://www.bb.com.br" },
  { name: "Itaú",            img: "https://logo.clearbit.com/itau.com.br", url: "https://www.itau.com.br" },
  { name: "Santander",       img: "https://logo.clearbit.com/santander.com.br", url: "https://www.santander.com.br" },
  { name: "Bradesco",        img: "https://logo.clearbit.com/bradesco.com.br", url: "https://www.bradesco.com.br" },
  { name: "Sicredi",         img: "https://logo.clearbit.com/sicredi.com.br", url: "https://www.sicredi.com.br" }
];


/* ===================================================================
   TABELA: BLOG_POSTS
   ===================================================================
   Para adicionar um post, copie o bloco entre { } e altere os campos.
   Campos:
     id       = identificador único (ex: "post-1")
     title    = Título do post
     date     = Data (ex: "15/03/2026")
     category = Categoria (ex: "Dicas", "Mercado", "Financiamento")
     author   = Autor (opcional)
     image    = URL da imagem principal
     excerpt  = Resumo curto (aparece na card)
     content  = Conteúdo completo. Use \n\n para separar parágrafos.
   =================================================================== */
const BLOG_POSTS = [
  {
    id: "post-1",
    title: "Como escolher o imóvel ideal para sua família",
    date: "15/03/2026",
    category: "Dicas",
    author: "Su Imobiliária",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    excerpt: "Descubra os fatores essenciais para escolher a casa ou apartamento perfeito para sua família, desde localização até infraestrutura do bairro.",
    content: "Escolher o imóvel ideal para sua família é uma decisão que vai muito além do preço. É preciso considerar diversos fatores que impactarão o dia a dia de todos os moradores.\n\nO primeiro passo é definir a localização. Pense na proximidade com o trabalho dos adultos, escolas dos filhos, supermercados, farmácias e hospitais. Um imóvel bem localizado valoriza com o tempo e oferece mais qualidade de vida.\n\nEm segundo lugar, avalie o tamanho. Não adianta comprar uma casa enorme se vocês são uma família pequena, assim como um apartamento compacto pode ficar apertado para uma família com três filhos. Pense a médio e longo prazo.\n\nPor fim, verifique a infraestrutura do bairro e do condomínio. Segurança, áreas de lazer, transporte público e opções de comércio local fazem toda a diferença no custo de vida e na rotina da família."
  },
  {
    id: "post-2",
    title: "Financiamento imobiliário: tudo que você precisa saber",
    date: "08/03/2026",
    category: "Financiamento",
    author: "Su Imobiliária",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    excerpt: "Entenda as modalidades de financiamento, taxas de juros, prazos e documentos necessários para realizar o sonho da casa própria.",
    content: "O financiamento imobiliário é o caminho mais comum para a aquisição da casa própria no Brasil. Mas é fundamental entender como funciona antes de assinar qualquer contrato.\n\nAs principais modalidades são o SFH (Sistema Financeiro de Habitação) e o SFI (Sistema Financeiro Imobiliário). O SFH tem juros mais baixos mas limite de valor, enquanto o SFI permite imóveis mais caros com taxas um pouco maiores.\n\nOs documentos básicos exigidos são: RG, CPF, comprovante de residência, comprovante de renda dos últimos 3 meses, declaração do Imposto de Renda e certidão de casamento (se aplicável). Para autônomos, também é necessário o DAS e extrato bancário.\n\nUma dica importante: use a calculadora de financiamento do nosso site para simular as parcelas antes de iniciar o processo. Isso ajuda a planejar seu orçamento e evita surpresas."
  },
  {
    id: "post-3",
    title: "Mercado imobiliário de SC: tendências para 2026",
    date: "01/03/2026",
    category: "Mercado",
    author: "Su Imobiliária",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    excerpt: "Análise completa do mercado imobiliário catarinense: bairros em alta, valorização por região e perspectivas para investidores.",
    content: "Santa Catarina segue se destacando no cenário imobiliário nacional. Cidades como Balneário Camboriú, Florianópolis e Itapema continuam atraindo investidores de todo o Brasil.\n\nBalneário Camboriú mantém a liderança em valorização, com novos empreendimentos de alto padrão sendo lançados regularmente. A cidade oferece infraestrutura completa e qualidade de vida incomparável.\n\nFlorianópolis segue aquecida tanto para compra quanto para aluguel, especialmente nos bairros Jurerê Internacional e Santo Antônio de Lisboa. A demanda por imóveis sustentáveis e com áreas verdes está em alta.\n\nPara investidores, Bombinhas surge como uma excelente opção para aluguel por temporada, com retorno médio anual de 8% a 10%. Joinville também se destaca pelo custo-benefício e mercado corporativo aquecido.\n\nNossa recomendação para 2026: diversifique entre imóveis prontos e lançamentos, acompanhe as taxas de juros e conte com uma assessoria especializada para tomar as melhores decisões."
  }
];

/* ===================================================================
   BLOG_TRANSLATIONS (Traduções dos posts — EN / ES)
   =================================================================== */
const BLOG_TRANSLATIONS = {
  "post-1": {
    en: {
      title: "How to choose the ideal home for your family",
      excerpt: "Discover the essential factors for choosing the perfect house or apartment for your family, from location to neighborhood infrastructure.",
      content: "Choosing the ideal home for your family is a decision that goes far beyond price. It is necessary to consider several factors that will impact the daily lives of all residents.\n\nThe first step is to define the location. Think about proximity to adult workplaces, children's schools, supermarkets, pharmacies and hospitals. A well-located property appreciates over time and offers more quality of life.\n\nSecond, evaluate the size. There is no point in buying a huge house if you are a small family, just as a compact apartment can be cramped for a family with three children. Think medium and long term.\n\nFinally, check the infrastructure of the neighborhood and condominium. Security, leisure areas, public transportation and local commerce options make all the difference in the cost of living and family routine."
    },
    es: {
      title: "Cómo elegir el hogar ideal para su familia",
      excerpt: "Descubra los factores esenciales para elegir la casa o apartamento perfecto para su familia, desde la ubicación hasta la infraestructura del barrio.",
      content: "Elegir el hogar ideal para su familia es una decisión que va mucho más allá del precio. Es necesario considerar diversos factores que impactarán el día a día de todos los residentes.\n\nEl primer paso es definir la ubicación. Piense en la proximidad al trabajo de los adultos, escuelas de los hijos, supermercados, farmacias y hospitales. Una propiedad bien ubicada se valoriza con el tiempo y ofrece más calidad de vida.\n\nEn segundo lugar, evalúe el tamaño. No sirve comprar una casa enorme si son una familia pequeña, así como un apartamento compacto puede quedar ajustado para una familia con tres hijos. Piense a mediano y largo plazo.\n\nPor último, verifique la infraestructura del barrio y del condominio. Seguridad, áreas de ocio, transporte público y opciones de comercio local hacen toda la diferencia en el costo de vida y en la rutina familiar."
    }
  },
  "post-2": {
    en: {
      title: "Real estate financing: everything you need to know",
      excerpt: "Understand financing options, interest rates, terms and required documents to achieve the dream of homeownership.",
      content: "Real estate financing is the most common path to homeownership in Brazil. But it is essential to understand how it works before signing any contract.\n\nThe main modalities are SFH (Housing Finance System) and SFI (Real Estate Finance System). SFH has lower interest rates but a value limit, while SFI allows more expensive properties with slightly higher rates.\n\nThe basic required documents are: ID, CPF, proof of residence, proof of income for the last 3 months, Income Tax return and marriage certificate (if applicable). For self-employed workers, DAS and bank statement are also required.\n\nAn important tip: use our website's financing calculator to simulate the installments before starting the process. This helps plan your budget and avoid surprises."
    },
    es: {
      title: "Financiamiento inmobiliario: todo lo que necesita saber",
      excerpt: "Conozca las modalidades de financiamiento, tasas de interés, plazos y documentos necesarios para realizar el sueño de la casa propia.",
      content: "El financiamiento inmobiliario es el camino más común para la adquisición de la casa propia en Brasil. Pero es fundamental entender cómo funciona antes de firmar cualquier contrato.\n\nLas principales modalidades son el SFH (Sistema de Financiamiento de Vivienda) y el SFI (Sistema de Financiamiento Inmobiliario). El SFH tiene intereses más bajos pero un límite de valor, mientras que el SFI permite inmuebles más caros con tasas un poco mayores.\n\nLos documentos básicos exigidos son: cédula de identidad, CPF, comprobante de residencia, comprobante de ingresos de los últimos 3 meses, declaración de impuesto a la renta y certificado de matrimonio (si aplica). Para autónomos, también se requiere el DAS y extracto bancario.\n\nUn consejo importante: use la calculadora de financiamiento de nuestro sitio para simular las cuotas antes de iniciar el proceso. Esto ayuda a planificar su presupuesto y evita sorpresas."
    }
  },
  "post-3": {
    en: {
      title: "SC real estate market: trends for 2026",
      excerpt: "Complete analysis of the Santa Catarina real estate market: trending neighborhoods, appreciation by region and prospects for investors.",
      content: "Santa Catarina continues to stand out in the national real estate scene. Cities like Balneário Camboriú, Florianópolis and Itapema keep attracting investors from all over Brazil.\n\nBalneário Camboriú maintains its leadership in appreciation, with new high-standard developments being launched regularly. The city offers complete infrastructure and unmatched quality of life.\n\nFlorianópolis remains heated for both buying and renting, especially in Jurerê Internacional and Santo Antônio de Lisboa neighborhoods. The demand for sustainable properties with green areas is on the rise.\n\nFor investors, Bombinhas emerges as an excellent option for seasonal rentals, with an average annual return of 8% to 10%. Joinville also stands out for its cost-benefit and heated corporate market.\n\nOur recommendation for 2026: diversify between ready properties and new launches, monitor interest rates and rely on specialized advisors to make the best decisions."
    },
    es: {
      title: "Mercado inmobiliario de SC: tendencias para 2026",
      excerpt: "Análisis completo del mercado inmobiliario catarinense: barrios en auge, valorización por región y perspectivas para inversores.",
      content: "Santa Catarina sigue destacándose en el escenario inmobiliario nacional. Ciudades como Balneário Camboriú, Florianópolis e Itapema continúan atrayendo inversores de todo Brasil.\n\nBalneário Camboriú mantiene el liderazgo en valorización, con nuevos emprendimientos de alto estándar siendo lanzados regularmente. La ciudad ofrece infraestructura completa y calidad de vida incomparable.\n\nFlorianópolis sigue caliente tanto para compra como para alquiler, especialmente en los barrios Jurerê Internacional y Santo Antônio de Lisboa. La demanda por inmuebles sostenibles y con áreas verdes está en alza.\n\nPara inversores, Bombinhas surge como una excelente opción para alquiler por temporada, con retorno promedio anual del 8% al 10%. Joinville también se destaca por su relación costo-beneficio y mercado corporativo caliente.\n\nNuestra recomendación para 2026: diversifique entre inmuebles listos y lanzamientos, acompañe las tasas de interés y cuente con asesoría especializada para tomar las mejores decisiones."
    }
  }
};

/* ===================================================================
   PROPERTIES_TRANSLATIONS (Traduções dos imóveis — EN / ES)
   =================================================================== */
const PROPERTIES_TRANSLATIONS = {
  "prop-1": {
    en: {
      title: "Luxury Apartment",
      desc: "Spacious luxury apartment with premium finishes in the best area of Balneário Camboriú.",
      description: "Stunning apartment located in the heart of Balneário Camboriú, just 200 meters from the beach. The property features premium finishes with porcelain tile flooring, granite countertops and custom cabinetry throughout.\n\nThe large living room integrates with a gourmet balcony with barbecue grill, providing unique moments of entertainment. The kitchen is equipped with state-of-the-art appliances and a separate pantry.\n\nThe condominium offers a swimming pool, gym, party hall and 24-hour concierge. A unique opportunity for those seeking quality of life and real estate appreciation.",
      features: ["3 bedrooms including 1 master suite with walk-in closet", "2 social bathrooms", "1 covered parking spot", "Gourmet balcony with barbecue", "Fitted kitchen with appliances", "Porcelain tile flooring throughout", "Split air conditioning", "24-hour concierge", "Swimming pool and gym in the condominium", "HOA: R$ 890/month", "Property tax: R$ 320/month"]
    },
    es: {
      title: "Apartamento de Lujo",
      desc: "Amplio apartamento con acabados premium en la mejor zona de Balneário Camboriú.",
      description: "Impresionante apartamento ubicado en el corazón de Balneário Camboriú, a solo 200 metros de la playa. La propiedad cuenta con acabados premium, pisos de porcelanato, encimeras de granito y armarios personalizados en todos los ambientes.\n\nLa amplia sala de estar se integra con un balcón gourmet con parrilla, brindando momentos únicos de confraternización. La cocina está equipada con electrodomésticos de última generación y despensa separada.\n\nEl condominio ofrece piscina, gimnasio, salón de fiestas y conserjería 24 horas. Una oportunidad única para quienes buscan calidad de vida y valoración inmobiliaria.",
      features: ["3 dormitorios incluyendo 1 suite master con vestidor", "2 baños sociales", "1 estacionamiento cubierto", "Balcón gourmet con parrilla", "Cocina equipada con electrodomésticos", "Piso de porcelanato en todos los ambientes", "Aire acondicionado split", "Conserjería 24 horas", "Piscina y gimnasio en el condominio", "Condominio: R$ 890/mes", "IPTU: R$ 320/mes"]
    }
  },
  "prop-2": {
    en: {
      title: "Contemporary House",
      desc: "Modern house with pool and leisure area in a gated community in Florianópolis.",
      description: "Contemporary house in an upscale gated community in Florianópolis. The property features bold design with large windows providing abundant natural light and integration with the outdoor area.\n\nOn the ground floor, there is a living room integrated with the dining room, a modern American kitchen and a social half-bath. The upper floor houses 4 bedrooms, including 2 suites with walk-in closets.\n\nThe backyard features a heated pool, barbecue grill and landscaped garden. Condominium with 24-hour concierge, security cameras and shared leisure area.",
      features: ["4 bedrooms including 2 suites", "3 bathrooms + social half-bath", "2 parking spots", "Heated pool", "Barbecue and gourmet area", "American-style fitted kitchen", "Landscaped garden", "Central air conditioning", "Alarm and cameras", "HOA: R$ 650/month", "Property tax: R$ 280/month"]
    },
    es: {
      title: "Casa Contemporánea",
      desc: "Casa moderna con piscina y área de ocio en condominio cerrado en Florianópolis.",
      description: "Casa contemporánea en condominio cerrado de alto estándar en Florianópolis. La propiedad tiene un diseño audaz, con grandes ventanales que brindan abundante luz natural e integración con el área exterior.\n\nEn la planta baja encontramos sala de estar integrada con comedor, cocina americana moderna y medio baño social. La planta superior alberga 4 dormitorios, incluyendo 2 suites con vestidor.\n\nEl patio cuenta con piscina climatizada, parrilla y jardín paisajístico. Condominio con conserjería 24h, cámaras de seguridad y área de ocio compartida.",
      features: ["4 dormitorios incluyendo 2 suites", "3 baños + medio baño social", "2 estacionamientos", "Piscina climatizada", "Parrilla y área gourmet", "Cocina americana equipada", "Jardín paisajístico", "Aire acondicionado central", "Alarma y cámaras", "Condominio: R$ 650/mes", "IPTU: R$ 280/mes"]
    }
  },
  "prop-3": {
    en: {
      title: "Duplex Penthouse",
      desc: "Duplex penthouse with panoramic sea view, 2 parking spots and private terrace in Itapema.",
      description: "Duplex penthouse with panoramic sea views in Itapema. With 280 m² of private area spread over two floors, featuring high-end finishes and exclusive design.\n\nThe first floor features a large living room with double-height ceiling, gourmet kitchen, half-bath and master suite. The second floor has 3 additional suites and a private terrace with hot tub and infinity-edge pool.\n\nBuilding with complete infrastructure: pool, gym, spa, party hall, playground and 24-hour concierge. A unique opportunity for those seeking the best of seaside living.",
      features: ["4 suites with walk-in closet", "4 bathrooms + half-bath", "2 parking spots", "Terrace with hot tub and pool", "Complete gourmet kitchen", "Double-height ceiling in living room", "Home automation", "Marble flooring", "24-hour concierge", "HOA: R$ 1,450/month", "Property tax: R$ 580/month"]
    },
    es: {
      title: "Ático Dúplex",
      desc: "Ático dúplex con vista panorámica al mar, 2 estacionamientos y terraza privada en Itapema.",
      description: "Ático dúplex con vista panorámica al mar en Itapema. Son 280 m² de área privada distribuidos en dos plantas, con acabados de alto estándar y diseño exclusivo.\n\nLa primera planta cuenta con amplia sala de doble altura, cocina gourmet, medio baño y suite master. La segunda planta tiene 3 suites adicionales y una terraza privada con hidromasaje y piscina de borde infinito.\n\nEdificio con infraestructura completa: piscina, gimnasio, spa, salón de fiestas, playground y conserjería 24 horas. Una oportunidad única para quienes buscan lo mejor de la vida junto al mar.",
      features: ["4 suites con vestidor", "4 baños + medio baño", "2 estacionamientos", "Terraza con hidromasaje y piscina", "Cocina gourmet completa", "Doble altura en sala de estar", "Domótica", "Piso de mármol", "Conserjería 24 horas", "Condominio: R$ 1.450/mes", "IPTU: R$ 580/mes"]
    }
  },
  "prop-4": {
    en: {
      title: "Furnished Studio",
      desc: "Fully furnished studio, ideal for investors. Prime location in Bombinhas.",
      description: "Fully furnished studio, ideal for investors seeking profitability with seasonal properties in Bombinhas. Located just 2 blocks from Bombas beach, one of the most beautiful in the region.\n\nThe property comes with custom furniture, appliances, air conditioning and complete decor. The condominium features a swimming pool, barbecue and party hall.\n\nExcellent seasonal rental potential, with an average return of 8% per year. Local management available for rental administration.",
      features: ["1 bedroom with queen bed", "1 social bathroom", "1 parking spot", "Fully furnished and decorated", "Equipped American kitchen", "Split air conditioning", "50-inch TV", "Swimming pool in condominium", "HOA: R$ 380/month", "Property tax: R$ 140/month"]
    },
    es: {
      title: "Estudio Amueblado",
      desc: "Estudio completamente amueblado, ideal para inversores. Ubicación privilegiada en Bombinhas.",
      description: "Estudio completamente amueblado, ideal para inversores que buscan rentabilidad con propiedades de temporada en Bombinhas. Ubicado a 2 cuadras de la playa de Bombas, una de las más bellas de la región.\n\nLa propiedad se entrega con muebles personalizados, electrodomésticos, aire acondicionado y decoración completa. El condominio cuenta con piscina, parrilla y salón de fiestas.\n\nExcelente potencial de alquiler por temporada, con retorno promedio del 8% anual. Administración local disponible para la gestión del alquiler.",
      features: ["1 dormitorio con cama matrimonial", "1 baño social", "1 estacionamiento", "Completamente amueblado y decorado", "Cocina americana equipada", "Aire acondicionado split", "TV 50 pulgadas", "Piscina en el condominio", "Condominio: R$ 380/mes", "IPTU: R$ 140/mes"]
    }
  },
  "prop-5": {
    en: {
      title: "Residential Lot",
      desc: "Flat 360 m² lot in an approved subdivision, ready to build in Joinville.",
      description: "Residential lot of 360 m² located in an approved subdivision in América neighborhood, one of the most valued areas of Joinville. Flat topography, firm soil and ready to build.\n\nThe subdivision has complete infrastructure: asphalt, water, sewage, electricity, public lighting and storm drainage. The area is served by schools, hospitals, supermarkets and public transportation within 1 km.\n\nIdeal for building a house or small residential condominium. Zoning allows up to 4 floors. Fully regularized documentation.",
      features: ["360 m² total area", "12 meters frontage", "30 meters depth", "Flat topography", "Approved subdivision", "Complete infrastructure", "Residential zoning R3", "Regular documentation", "Near shops and schools", "Property tax: R$ 180/month"]
    },
    es: {
      title: "Terreno Residencial",
      desc: "Terreno plano de 360 m² en loteamiento aprobado, listo para construir en Joinville.",
      description: "Terreno residencial de 360 m² ubicado en loteamiento aprobado en el barrio América, una de las zonas más valoradas de Joinville. Topografía plana, suelo firme y listo para construir.\n\nEl loteamiento cuenta con infraestructura completa: asfalto, agua, alcantarillado, electricidad, alumbrado público y drenaje pluvial. La zona cuenta con escuelas, hospitales, supermercados y transporte público a menos de 1 km.\n\nIdeal para construir casa o pequeño condominio residencial. Zonificación permite hasta 4 pisos. Documentación totalmente regularizada.",
      features: ["360 m² de área total", "12 metros de frente", "30 metros de fondo", "Topografía plana", "Loteamiento aprobado", "Infraestructura completa", "Zonificación residencial R3", "Documentación regular", "Cerca de comercios y escuelas", "IPTU: R$ 180/mes"]
    }
  },
  "prop-6": {
    en: {
      title: "Commercial Office",
      desc: "Commercial office in a corporate building with full infrastructure in Balneário Camboriú.",
      description: "Class A corporate office on the main commercial avenue of Balneário Camboriú. The property is in perfect condition, with raised flooring, acoustic ceiling and exposed electrical and data installations.\n\nThe building features 24-hour concierge, property security, backup generator, 4 elevators, imposing lobby and visitor parking. The office has glass partitions, kitchenette and private bathroom.\n\nStrategic location close to banks, restaurants, hotels and varied commerce. Ideal for law firms, medical practices, real estate agencies or corporate branches.",
      features: ["55 m² private area", "1 room with glass partitions", "1 private bathroom", "Integrated kitchenette", "1 parking spot", "Technical raised floor", "Acoustic ceiling", "Central air conditioning", "24-hour concierge", "Backup generator", "HOA: R$ 1,100/month", "Property tax: R$ 410/month"]
    },
    es: {
      title: "Oficina Comercial",
      desc: "Oficina comercial en edificio corporativo con infraestructura completa en Balneário Camboriú.",
      description: "Oficina corporativa Clase A en la principal avenida comercial de Balneário Camboriú. La propiedad está en perfecto estado, con piso elevado, cielo raso acústico e instalaciones eléctricas y de datos expuestas.\n\nEl edificio cuenta con conserjería 24 horas, seguridad patrimonial, generador propio, 4 ascensores, vestíbulo imponente y estacionamiento para visitantes. La oficina tiene divisiones de vidrio, kitchenette y baño privado.\n\nUbicación estratégica cerca de bancos, restaurantes, hoteles y comercio variado. Ideal para despachos de abogados, consultorios, inmobiliarias o sucursales corporativas.",
      features: ["55 m² de área privada", "1 sala con divisiones de vidrio", "1 baño privado", "Kitchenette integrada", "1 estacionamiento", "Piso técnico elevado", "Cielo raso acústico", "Aire acondicionado central", "Conserjería 24 horas", "Generador propio", "Condominio: R$ 1.100/mes", "IPTU: R$ 410/mes"]
    }
  },
  "prop-7": {
    en: {
      title: "Downtown Apartment",
      desc: "Well-located apartment near universities, shops and public transportation in Florianópolis.",
      description: "Well-located apartment in downtown Florianópolis, close to universities, shops, hospitals and public transportation. Ideal for students, professionals or young couples.\n\nThe property features a living room integrated with an American kitchen, 2 bedrooms including 1 suite, social bathroom, laundry area and parking spot. The condominium offers electronic concierge and security cameras.\n\nRental contract from 12 months with renewal possibility. Accepts guarantor, rental insurance or deposit.",
      features: ["2 bedrooms including 1 suite", "1 social bathroom", "1 parking spot", "American-style fitted kitchen", "Separate laundry area", "Electronic concierge", "Security cameras", "Near universities", "HOA: R$ 480/month", "Property tax: R$ 200/month", "Guarantee: guarantor or insurance"]
    },
    es: {
      title: "Apartamento Centro",
      desc: "Apartamento bien ubicado cerca de universidades, comercios y transporte público en Florianópolis.",
      description: "Apartamento bien ubicado en el centro de Florianópolis, cerca de universidades, comercios, hospitales y transporte público. Ideal para estudiantes, profesionales o parejas jóvenes.\n\nLa propiedad cuenta con sala integrada a cocina americana, 2 dormitorios incluyendo 1 suite, baño social, lavandería y estacionamiento. El condominio ofrece conserjería electrónica y cámaras de seguridad.\n\nContrato de alquiler desde 12 meses con posibilidad de renovación. Acepta fiador, seguro de fianza o depósito.",
      features: ["2 dormitorios incluyendo 1 suite", "1 baño social", "1 estacionamiento", "Cocina americana equipada", "Lavandería separada", "Conserjería electrónica", "Cámaras de seguridad", "Cerca de universidades", "Condominio: R$ 480/mes", "IPTU: R$ 200/mes", "Garantía: fiador o seguro"]
    }
  },
  "prop-8": {
    en: {
      title: "Seasonal House",
      desc: "Spacious house with pool, barbecue and garden, perfect for seasonal stays in Bombinhas.",
      description: "Spacious and comfortable house in Bombinhas, perfect for seasonal or annual rental. The house has 3 bedrooms, a large living room, complete kitchen and leisure area with pool and barbecue.\n\nThe property is furnished and equipped with all necessary utensils. The landscaped garden and grassy backyard are perfect for children and pets.\n\nPrime location 500 meters from Bombas beach, close to markets, pharmacies and restaurants. Seasonal rental (minimum 7 days) or annual contract.",
      features: ["3 bedrooms including 1 suite", "2 social bathrooms", "2 parking spots", "Pool with waterfall", "Fixed barbecue grill", "Complete equipped kitchen", "Furnished", "Garden with lawn", "500 m from beach", "Security alarm", "HOA: R$ 350/month", "Property tax: R$ 220/month"]
    },
    es: {
      title: "Casa de Temporada",
      desc: "Casa amplia con piscina, parrilla y jardín, perfecta para temporada en Bombinhas.",
      description: "Casa amplia y confortable en Bombinhas, perfecta para alquiler de temporada o anual. La casa tiene 3 dormitorios, sala de estar amplia, cocina completa y área de ocio con piscina y parrilla.\n\nLa propiedad está amueblada y equipada con todos los utensilios necesarios. El jardín paisajístico y el patio con césped son perfectos para niños y mascotas.\n\nUbicación privilegiada a 500 metros de la playa de Bombas, cerca de mercados, farmacias y restaurantes. Alquiler por temporada (mínimo 7 días) o contrato anual.",
      features: ["3 dormitorios incluyendo 1 suite", "2 baños sociales", "2 estacionamientos", "Piscina con cascada", "Parrilla fija", "Cocina completa equipada", "Amueblado", "Jardín con césped", "500 m de la playa", "Alarma de seguridad", "Condominio: R$ 350/mes", "IPTU: R$ 220/mes"]
    }
  },
  "prop-9": {
    en: {
      title: "Studio",
      desc: "Compact modern studio, ideal for singles or couples. Furnished with HOA included in Balneário Camboriú.",
      description: "Modern and compact studio, ideal for singles or young couples seeking practicality and prime location in Balneário Camboriú. The property is furnished and equipped, with HOA fees included in the rent.\n\nThe studio features a living room integrated with an American kitchen, bedroom with queen bed, social bathroom and half-bath. The building offers a gym, shared laundry and bike storage.\n\nLocated 3 blocks from the beach, close to bars, restaurants and supermarkets. Rental contract from 6 months.",
      features: ["1 bedroom with queen bed", "1 social bathroom", "HOA included", "Furnished and equipped", "American kitchen", "Split air conditioning", "43-inch TV", "Gym in building", "Bike storage", "Shared laundry", "3 blocks from beach", "Contract from 6 months"]
    },
    es: {
      title: "Estudio",
      desc: "Estudio compacto y moderno, ideal para solteros o parejas. Amueblado con condominio incluido en Balneário Camboriú.",
      description: "Estudio moderno y compacto, ideal para solteros o parejas jóvenes que buscan practicidad y ubicación privilegiada en Balneário Camboriú. La propiedad está amueblada y equipada, con condominio incluido en el alquiler.\n\nEl estudio cuenta con sala integrada a cocina americana, dormitorio con cama matrimonial, baño social y medio baño. El edificio ofrece gimnasio, lavandería compartida y bicicletero.\n\nUbicado a 3 cuadras de la playa, cerca de bares, restaurantes y supermercados. Contrato de alquiler desde 6 meses.",
      features: ["1 dormitorio con cama matrimonial", "1 baño social", "Condominio incluido", "Amueblado y equipado", "Cocina americana", "Aire acondicionado split", "TV 43 pulgadas", "Gimnasio en el edificio", "Bicicletero", "Lavandería compartida", "3 cuadras de la playa", "Contrato desde 6 meses"]
    }
  },
  "prop-10": {
    en: {
      title: "Commercial Office",
      desc: "Commercial office ready for use in a corporate building with 24-hour concierge in Itapema.",
      description: "Commercial office available for rent in a corporate building in Itapema. The property has an open layout, ideal for adaptation according to business needs. Porcelain tile flooring, fresh paint and electrical installations in good condition.\n\nThe building features 24-hour concierge, security cameras, 3 elevators and visitor parking. The location is prime, on the main avenue of the city with heavy foot and vehicle traffic.\n\nCommercial lease agreement with minimum term of 24 months. Guarantees: bank guarantee, rental insurance or letter of guarantee. Ready for immediate use.",
      features: ["48 m² usable area", "Open layout", "1 private bathroom", "1 parking spot", "Porcelain tile flooring", "Split air conditioning", "24-hour concierge", "3 elevators", "Near commerce", "HOA: R$ 680/month", "Property tax: R$ 290/month", "Minimum 24-month contract"]
    },
    es: {
      title: "Oficina Comercial",
      desc: "Oficina comercial lista para usar en edificio corporativo con conserjería 24h en Itapema.",
      description: "Oficina comercial disponible para alquiler en edificio corporativo en Itapema. La propiedad tiene distribución abierta, ideal para adaptación según las necesidades del negocio. Piso de porcelanato, pintura nueva e instalaciones eléctricas en buen estado.\n\nEl edificio cuenta con conserjería 24 horas, cámaras de seguridad, 3 ascensores y estacionamiento para visitantes. La ubicación es privilegiada, en la principal avenida de la ciudad con gran flujo de personas y vehículos.\n\nContrato de alquiler comercial con plazo mínimo de 24 meses. Garantías: fianza bancaria, seguro de fianza o carta de fianza. Lista para uso inmediato.",
      features: ["48 m² de área útil", "Distribución abierta", "1 baño privado", "1 estacionamiento", "Piso de porcelanato", "Aire acondicionado split", "Conserjería 24 horas", "3 ascensores", "Cerca del comercio", "Condominio: R$ 680/mes", "IPTU: R$ 290/mes", "Contrato mínimo 24 meses"]
    }
  }
};


/* ===================================================================
   EMPREENDIMENTOS_TRANSLATIONS (Traduções dos lançamentos — EN / ES)
   =================================================================== */
const EMPREENDIMENTOS_TRANSLATIONS = {
  "emp-parkavenue": {
    en: {
      description: "Park Avenue Residence is a high-end development located on Avenida Atlântica, just steps from the beach. With 32 floors and units ranging from 2 to 4 suites, the building offers a unique beachfront living experience.\n\nAll apartments feature premium finishes, porcelain tile flooring, quartz countertops, custom cabinetry and a home automation system. Units range from 98 to 210 m², with gourmet balconies and barbecue grills.\n\nThe single tower commands presence on the waterfront, with a glass façade designed by renowned architects. Delivery is scheduled for June 2027.",
      tags: ["LAUNCH", "32 FLOORS", "SEA VIEW"],
      amenities: ["Heated pool with sea view", "Fully equipped gym", "Party hall", "Gourmet space", "Dry and wet sauna", "Spa with hot tub", "Multi-sports court", "Playground", "Game room", "Home cinema", "CO2 heating system", "Emergency generator"],
      timeline: [
        { title: "Construction start", desc: "Earthmoving and foundations" },
        { title: "Structure completed", desc: "Concreting of all 32 floors finished" },
        { title: "Interior finishes", desc: "Electrical, plumbing and cladding installations" },
        { title: "Key delivery", desc: "Estimated completion and handover" }
      ],
      payment: [
        { label: "Down payment", value: "30%" },
        { label: "During construction", value: "48 installments" },
        { label: "At delivery", value: "70% financing" }
      ]
    },
    es: {
      description: "Park Avenue Residence es un emprendimiento de alto estándar ubicado en la Avenida Atlântica, a pocos pasos de la playa. Con 32 pisos y unidades de 2 a 4 suites, el edificio ofrece una experiencia única de vivir frente al mar.\n\nTodos los apartamentos cuentan con acabados premium, pisos de porcelanato, encimeras de cuarzo, armarios personalizados y sistema de domótica. Las unidades tienen de 98 a 210 m², con balcones gourmet y parrilla.\n\nLa torre única impone presencia en la costa, con fachada de vidrio diseñada por arquitectos renombrados. La entrega está prevista para junio de 2027.",
      tags: ["LANZAMIENTO", "32 PISOS", "VISTA AL MAR"],
      amenities: ["Piscina climatizada con vista al mar", "Gimnasio equipado", "Salón de fiestas", "Espacio gourmet", "Sauna seca y húmeda", "Spa con hidromasaje", "Cancha polideportiva", "Parque infantil", "Sala de juegos", "Home cinema", "Sistema de calefacción CO2", "Generador de emergencia"],
      timeline: [
        { title: "Inicio de obras", desc: "Movimiento de tierra y cimientos" },
        { title: "Estructura concluida", desc: "Hormigonado de los 32 pisos finalizado" },
        { title: "Acabados interiores", desc: "Instalaciones eléctricas, hidráulicas y revestimientos" },
        { title: "Entrega de llaves", desc: "Finalización y entrega estimada" }
      ],
      payment: [
        { label: "Entrada", value: "30%" },
        { label: "Durante la obra", value: "48 cuotas" },
        { label: "Entrega", value: "70% financiamiento" }
      ]
    }
  },
  "emp-infinitycoast": {
    en: {
      description: "Infinity Coast is a resort-style condominium located in Jurerê Internacional, one of the most exclusive neighborhoods in Florianópolis. With 4 towers of 18 floors each, the development offers units from 2 to 4 bedrooms with floor plans ranging from 72 to 185 m².\n\nInspired by contemporary architecture, Infinity Coast combines sophisticated design with sustainability. All units feature solar heating, water reuse system and double-glazed windows for thermal and acoustic insulation.\n\nThe condominium occupies a 45,000 m² area, with 70% permeable area and preservation of native vegetation. Estimated delivery for December 2027.",
      tags: ["LAUNCH", "RESORT", "BEACHFRONT"],
      amenities: ["Landscape infinity-edge pool", "Heated children's pool", "Gym with sea view", "Party hall with barbecue", "Zen space with yoga and meditation", "Spa with whirlpool", "Tennis court", "Soccer field", "Playground with eco-friendly toys", "Playroom", "Pet space", "Bike storage and EV charging"],
      timeline: [
        { title: "Construction start", desc: "Excavation and foundations of 4 towers" },
        { title: "Structure completed", desc: "All towers structurally finished" },
        { title: "Common areas and leisure", desc: "Pools, landscaping and social areas" },
        { title: "Key delivery", desc: "Estimated completion and handover" }
      ],
      payment: [
        { label: "Down payment", value: "25%" },
        { label: "During construction", value: "60 installments" },
        { label: "At delivery", value: "75% financing" }
      ]
    },
    es: {
      description: "Infinity Coast es un condominio resort ubicado en Jurerê Internacional, uno de los barrios más exclusivos de Florianópolis. Con 4 torres de 18 pisos cada una, el emprendimiento ofrece unidades de 2 a 4 dormitorios con plantas que varían de 72 a 185 m².\n\nInspirado en la arquitectura contemporánea, Infinity Coast combina diseño sofisticado con sostenibilidad. Todas las unidades cuentan con calentamiento solar, sistema de reutilización de agua y ventanas de doble acristalamiento para aislamiento térmico y acústico.\n\nEl condominio ocupa un área de 45.000 m², con 70% de área permeable y preservación de la vegetación nativa. Entrega prevista para diciembre de 2027.",
      tags: ["LANZAMIENTO", "RESORT", "FRENTE AL MAR"],
      amenities: ["Piscina paisajística de borde infinito", "Piscina infantil climatizada", "Gimnasio con vista al mar", "Salón de fiestas con parrilla", "Espacio zen con yoga y meditación", "Spa con hidromasaje", "Cancha de tenis", "Campo de fútbol", "Parque infantil con juegos ecológicos", "Ludoteca", "Espacio para mascotas", "Bicicletero y carga para vehículos eléctricos"],
      timeline: [
        { title: "Inicio de obras", desc: "Excavación y cimentación de 4 torres" },
        { title: "Estructura concluida", desc: "Todas las torres finalizadas estructuralmente" },
        { title: "Áreas comunes y ocio", desc: "Piscinas, paisajismo y áreas sociales" },
        { title: "Entrega de llaves", desc: "Finalización y entrega estimada" }
      ],
      payment: [
        { label: "Entrada", value: "25%" },
        { label: "Durante la obra", value: "60 cuotas" },
        { label: "Entrega", value: "75% financiamiento" }
      ]
    }
  },
  "emp-greenlife": {
    en: {
      description: "Green Life Park is a horizontal condominium consisting of 12 towers of 8 floors each, set within a 70,000 m² private park. The project prioritizes sustainability with solar panels, rainwater harvesting, green roofs and electric vehicle charging stations.\n\nTwo and three-bedroom units range from 58 to 110 m², all with balconies, barbecue grills and high-quality eco-friendly finishes. The condominium features over 20,000 m² of preserved green area, with ecological trails and a landscaped lake.\n\nLocated in the América neighborhood, close to schools, hospitals and shopping centers, Green Life Park is the ideal choice for those seeking quality of life without giving up urban convenience. Estimated delivery for March 2028.",
      tags: ["LAUNCH", "SUSTAINABLE", "GREEN AREAS"],
      amenities: ["Natural pool with biological treatment", "Outdoor gym", "Sustainable party hall", "Gourmet space with wood-fired oven", "Dry sauna", "Multi-sports court", "Soccer field", "Eco-friendly playground", "Walking trails", "Landscaped lake with deck", "Community garden", "Bike storage", "Game room", "Coworking space"],
      timeline: [
        { title: "Construction start", desc: "Site preparation and foundations" },
        { title: "First towers completed", desc: "Towers 1 to 4 with finished structure" },
        { title: "Landscaping and common areas", desc: "Park, lake and leisure areas" },
        { title: "Key delivery", desc: "Estimated overall completion" }
      ],
      payment: [
        { label: "Down payment", value: "20%" },
        { label: "During construction", value: "72 installments" },
        { label: "At delivery", value: "80% financing" }
      ]
    },
    es: {
      description: "Green Life Park es un condominio horizontal compuesto por 12 torres de 8 pisos cada una, inserto en un parque privado de 70.000 m². El proyecto prioriza la sostenibilidad con paneles solares, captación de agua de lluvia, techos verdes y estaciones de carga para vehículos eléctricos.\n\nLas unidades de 2 y 3 dormitorios varían de 58 a 110 m², todas con balcón, parrilla y acabados ecológicos de alta calidad. El condominio cuenta con más de 20.000 m² de área verde preservada, con senderos ecológicos y lago paisajístico.\n\nUbicado en el barrio América, cerca de escuelas, hospitales y centros comerciales, Green Life Park es la opción ideal para quienes buscan calidad de vida sin renunciar a la conveniencia urbana. Entrega prevista para marzo de 2028.",
      tags: ["LANZAMIENTO", "SOSTENIBLE", "ÁREAS VERDES"],
      amenities: ["Piscina natural con tratamiento biológico", "Gimnasio al aire libre", "Salón de fiestas sostenible", "Espacio gourmet con horno de leña", "Sauna seca", "Cancha polideportiva", "Campo de fútbol", "Parque infantil ecológico", "Senderos para caminatas", "Lago paisajístico con deck", "Huerta comunitaria", "Bicicletero", "Sala de juegos", "Espacio de coworking"],
      timeline: [
        { title: "Inicio de obras", desc: "Preparación del terreno y cimientos" },
        { title: "Primeras torres concluidas", desc: "Torres 1 a 4 con estructura finalizada" },
        { title: "Paisajismo y áreas comunes", desc: "Parque, lago y áreas de ocio" },
        { title: "Entrega de llaves", desc: "Finalización general estimada" }
      ],
      payment: [
        { label: "Entrada", value: "20%" },
        { label: "Durante la obra", value: "72 cuotas" },
        { label: "Entrega", value: "80% financiamiento" }
      ]
    }
  }
};