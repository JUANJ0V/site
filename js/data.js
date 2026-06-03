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
const HERO_TITLE    = "Su Imobiliária em Balneário Camboriú | Compra, Venda e Aluguel de Imóveis";
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
    content: "Escolher o imóvel ideal para sua família é uma decisão que vai muito além do preço. É preciso considerar diversos fatores que impactarão o dia a dia de todos os moradores.\n\n## Localização\n\nO primeiro passo é definir a localização. Pense na proximidade com o trabalho dos adultos, escolas dos filhos, supermercados, farmácias e hospitais. Um imóvel bem localizado valoriza com o tempo e oferece mais qualidade de vida.\n\n## Tamanho\n\nEm segundo lugar, avalie o tamanho. Não adianta comprar uma casa enorme se vocês são uma família pequena, assim como um apartamento compacto pode ficar apertado para uma família com três filhos. Pense a médio e longo prazo.\n\n## Infraestrutura do bairro\n\nPor fim, verifique a infraestrutura do bairro e do condomínio. Segurança, áreas de lazer, transporte público e opções de comércio local fazem toda a diferença no custo de vida e na rotina da família."
  },
  {
    id: "post-2",
    title: "Financiamento imobiliário: tudo que você precisa saber",
    date: "08/03/2026",
    category: "Financiamento",
    author: "Su Imobiliária",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    excerpt: "Entenda as modalidades de financiamento, taxas de juros, prazos e documentos necessários para realizar o sonho da casa própria.",
    content: "O financiamento imobiliário é o caminho mais comum para a aquisição da casa própria no Brasil. Mas é fundamental entender como funciona antes de assinar qualquer contrato.\n\n## Modalidades de financiamento\n\nAs principais modalidades são o SFH (Sistema Financeiro de Habitação) e o SFI (Sistema Financeiro Imobiliário). O SFH tem juros mais baixos mas limite de valor, enquanto o SFI permite imóveis mais caros com taxas um pouco maiores.\n\n## Documentos necessários\n\nOs documentos básicos exigidos são: RG, CPF, comprovante de residência, comprovante de renda dos últimos 3 meses, declaração do Imposto de Renda e certidão de casamento (se aplicável). Para autônomos, também é necessário o DAS e extrato bancário.\n\n## Dica importante\n\nUma dica importante: use a calculadora de financiamento do nosso site para simular as parcelas antes de iniciar o processo. Isso ajuda a planejar seu orçamento e evita surpresas."
  },
  {
    id: "post-3",
    title: "Mercado imobiliário de SC: tendências para 2026",
    date: "01/03/2026",
    category: "Mercado",
    author: "Su Imobiliária",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    excerpt: "Análise completa do mercado imobiliário catarinense: bairros em alta, valorização por região e perspectivas para investidores.",
    content: "Santa Catarina segue se destacando no cenário imobiliário nacional. Cidades como Balneário Camboriú, Florianópolis e Itapema continuam atraindo investidores de todo o Brasil.\n\n## Balneário Camboriú\n\nBalneário Camboriú mantém a liderança em valorização, com novos empreendimentos de alto padrão sendo lançados regularmente. A cidade oferece infraestrutura completa e qualidade de vida incomparável.\n\n## Florianópolis\n\nFlorianópolis segue aquecida tanto para compra quanto para aluguel, especialmente nos bairros Jurerê Internacional e Santo Antônio de Lisboa. A demanda por imóveis sustentáveis e com áreas verdes está em alta.\n\n## Bombinhas\n\nPara investidores, Bombinhas surge como uma excelente opção para aluguel por temporada, com retorno médio anual de 8% a 10%. Joinville também se destaca pelo custo-benefício e mercado corporativo aquecido.\n\n## Recomendação para 2026\n\nNossa recomendação para 2026: diversifique entre imóveis prontos e lançamentos, acompanhe as taxas de juros e conte com uma assessoria especializada para tomar as melhores decisões."
  }
];

/* ===================================================================
   BLOG_TRANSLATIONS (Traduções dos posts — EN / ES)
   =================================================================== */

/* ===================================================================
   PROPERTIES_TRANSLATIONS (Traduções dos imóveis — EN / ES)
   =================================================================== */


/* ===================================================================
   EMPREENDIMENTOS_TRANSLATIONS (Traduções dos lançamentos — EN / ES)
   =================================================================== */
