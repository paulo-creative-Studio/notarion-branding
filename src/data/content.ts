import { Segment, SolutionItem, PackageTier, DemoProject } from '../types';
import gastronomyMenuImg from '../assets/images/gastronomy_digital_menu_1790452639477.jpg';
import vitrineFashionImg from '../assets/images/vitrine_virtual_fashion_1790452627657.jpg';
import localServicesImg from '../assets/images/local_business_services_1790452653070.jpg';

export const COMPANY_INFO = {
  name: "NOTARION BRAND",
  shortName: "Notarion",
  tagline: "Soluções Digitais para Negócios Locais",
  positioning: "Design · Presença Digital · Tecnologia · Automação",
  whatsappNumber: "5544997234590",
  whatsappDisplay: "+55 44 9723-4590",
  defaultWhatsappMessage: "Olá! Vim pelo site da Notarion Brand e gostaria de conhecer as soluções para minha empresa.",
  email: "pauloartes020@gmail.com",
  location: "Doutor Camargo - PR",
  serviceCoverage: "Atendimento com reunião presencial na região de Maringá, Paiçandu e Doutor Camargo. Atendimento online para todo o Brasil.",
  instagram: "@notarion_brand",
  instagramUrl: "https://instagram.com/notarion_brand",
};

export const PROBLEM_SOLUTION_DATA = {
  title: "Seu cliente está procurando. O que ele encontra?",
  subtitle: "A maioria dos negócios locais perde vendas todos os dias por falhas simples na presença digital.",
  problems: [
    {
      title: "Instagram desatualizado",
      desc: "Fotos antigas, destaques confusos e o cliente não sabe se o local ainda está aberto ou quanto custam as coisas."
    },
    {
      title: "Cardápio e catálogo inacessíveis",
      desc: "PDFs pesados de 20MB que demoram para abrir ou fotos de cardápio físico borradas no celular."
    },
    {
      title: "Informações espalhadas",
      desc: "Endereço em um lugar, horário errado no Google Maps e link quebrado na bio."
    },
    {
      title: "Dependência de mensagens uma a uma",
      desc: "Sua equipe gasta horas respondendo perguntas repetitivas como 'qual o horário?' ou 'qual o endereço?'."
    },
    {
      title: "Ausência de site profissional",
      desc: "Quem busca no Google encontra seu concorrente primeiro e transmite mais credibilidade que você."
    },
    {
      title: "Apresentação amadora de produtos",
      desc: "Fotos sem padrão que desvalorizam mercadorias de alta qualidade, como roupas e peças de vestuário."
    }
  ],
  solutionHeadline: "A Notarion organiza sua presença digital em uma experiência simples, profissional e acessível.",
  solutionPillars: [
    "Tudo em um único link rápido que abre em menos de 1 segundo no celular",
    "Botão 'Como Chegar' sincronizado diretamente com Google Maps e Waze",
    "Cardápio, catálogo e vitrine com fotos organizadas por categorias",
    "Contato direto no WhatsApp com mensagem de interesse já preenchida",
    "Posicionamento estruturado para ser encontrado na sua cidade"
  ]
};

export const SOLUTIONS_LIST: SolutionItem[] = [
  {
    id: "presenca-digital",
    title: "Presença Digital & Site Profissional",
    category: "Estrutura",
    description: "Site limpo, rápido e responsivo, projetado especificamente para converter visitantes em clientes no celular.",
    deliverables: [
      "Design exclusivo e profissional para o negócio",
      "Carregamento ultra-rápido em smartphones",
      "Página de apresentação institucional e serviços",
      "Botão de contato direto e redes sociais integradas"
    ],
    idealFor: "Negócios que querem transmitir credibilidade imediata e parar de depender só do Instagram."
  },
  {
    id: "vitrine-digital",
    title: "Vitrine Digital & Modelos Virtuais",
    category: "Vendas Visuais",
    badgeText: "Inovação para Moda & Vestuário",
    description: "Apresentação de alto padrão com modelos virtuais hiper-realistas para lojas de roupas, acessórios e vestuário.",
    deliverables: [
      "Apresentação de peças em modelos virtuais realistas",
      "Categorias por coleção, tamanhos e cores",
      "Fotos profissionais sem custos astronômicos de ensaio",
      "Botão 'Pedir no WhatsApp' integrado em cada produto"
    ],
    idealFor: "Lojas de roupas, calçados, moda fitness, óticas e confecções locais."
  },
  {
    id: "cardapio-catalogo",
    title: "Cardápio & Catálogo Digital",
    category: "Gastronomia & Comércio",
    description: "Substitua PDFs pesados por um cardápio interativo e leve que o cliente acessa via QR Code na mesa ou pelo link da bio.",
    deliverables: [
      "Menu organizado por seções (entradas, pratos, bebidas, sobremesas)",
      "Fotos apetitosas, descrição de ingredientes e valores",
      "Atualização simples e rápida de preços e pratos do dia",
      "QR Code personalizado para imprimir nas mesas e balcão"
    ],
    idealFor: "Restaurantes, bares, hamburguerias, cafeterias, pizzarias e confeitarias."
  },
  {
    id: "portfolio-servicos",
    title: "Portfólio de Trabalhos & Serviços",
    category: "Profissionais",
    description: "Mostre o antes e depois, projetos concluídos e diferenciais do seu serviço para fechar orçamentos de maior valor.",
    deliverables: [
      "Galeria visual com filtros por tipo de trabalho",
      "Lista detalhada de especialidades e áreas atendidas",
      "Formulário rápido de solicitação de orçamento",
      "Depoimentos e comprovação de experiência técnica"
    ],
    idealFor: "Eletricistas, pedreiros, marceneiros, mecânicos, fotógrafos, arquitetos e consultores."
  },
  {
    id: "google-maps",
    title: "Google & Presença Local Estruturada",
    category: "Visibilidade",
    description: "Organização técnica da sua ficha no Google Maps para aparecer quando clientes procuram serviços na sua região.",
    deliverables: [
      "Estruturação de dados locais para busca",
      "Botão inteligente 'Como Chegar' conectado ao Waze/Maps",
      "Horários de funcionamento corretos e telefone oficial",
      "Orientações práticas para coletar avaliações 5 estrelas"
    ],
    idealFor: "Qualquer empresa com endereço físico ou que atenda bairros específicos."
  },
  {
    id: "eventos-promocoes",
    title: "Páginas de Eventos & Promoções",
    category: "Ativação",
    description: "Páginas focadas para divulgar música ao vivo, promoções sazonais, festivais e ofertas de datas comemorativas.",
    deliverables: [
      "Cronograma visual da semana ou mês",
      "Reserva antecipada ou lista de espera via WhatsApp",
      "Contagem regressiva para viradas de lote ou promoções",
      "Link fácil para compartilhar em grupos e stories"
    ],
    idealFor: "Bares, casas de eventos, restaurantes com atrações e comércios locais."
  },
  {
    id: "whatsapp-integrado",
    title: "Integração Estratégica com WhatsApp",
    category: "Conversão",
    description: "Facilite o contato do cliente com botões posicionados nos pontos certos e mensagens pré-configuradas.",
    deliverables: [
      "Botão fixo acessível com um toque no mobile",
      "Mensagens personalizadas por produto ou serviço de interesse",
      "Redução de ruído: o cliente já chega informando o que deseja",
      "Sem perda de leads por falta de canal direto"
    ],
    idealFor: "Negócios que fecham vendas ou tiram dúvidas prioritariamente por mensagem."
  },
  {
    id: "automacoes-digitais",
    title: "Automações & Atendimento Digital",
    category: "Eficiência",
    description: "Triagem inicial inteligente para responder dúvidas frequentes, qualificar clientes e economizar o tempo da sua equipe.",
    deliverables: [
      "Triagem de novos contatos antes do atendimento humano",
      "Encaminhamento inteligente para o setor correto",
      "Agendamento simplificado de visitas ou reuniões",
      "Captação organizada de contatos para ações futuras"
    ],
    idealFor: "Empresas com alto volume de mensagens repetitivas ou prestadores que passam o dia em campo."
  }
];

export const SEGMENTS_DATA: Record<string, Segment> = {
  gastronomia: {
    id: "gastronomia",
    title: "Bares & Restaurantes",
    tagline: "Do QR Code na mesa ao pedido no balcão, sem enrolação.",
    description: "Proporcione uma experiência fluida para seus clientes encontrarem seu cardápio, saberem os dias de música ao vivo, verem o endereço e pedirem uma mesa.",
    badge: "Gastronomia & Lazer",
    features: [
      "Cardápio digital ágil sem necessidade de baixar aplicativo",
      "Agenda de eventos, música ao vivo e promoções da semana",
      "Botão de rotas 'Como Chegar' conectado direto ao GPS",
      "Link direto para reservas de mesa no WhatsApp",
      "Destaque de pratos especiais e combos da casa"
    ],
    mockupTitle: "Bistrô & Bar Regional",
    mockupSubtitle: "Cardápio QR Code · Música ao Vivo · Reservas",
    highlightText: "Elimine custos de impressão de cardápios e dê água na boca antes mesmo do cliente sentar à mesa.",
    exampleImage: gastronomyMenuImg,
    whatsappMessage: "Olá! Tenho um bar/restaurante e gostaria de ver uma demonstração de cardápio digital e presença no Google."
  },
  lojas: {
    id: "lojas",
    title: "Lojas & Confecções",
    tagline: "Apresente suas coleções sem os custos de uma produção fotográfica tradicional.",
    description: "Não dependa de contratação recorrente de modelos, fotógrafos e estúdios para apresentar cada nova coleção. Criamos modelos virtuais hiper-realistas, consistentes e personalizados para sua marca, apresentando suas peças de forma profissional e com padrão visual em todo o catálogo.",
    badge: "Varejo & Moda",
    features: [
      "Modelos Virtuais: modelos digitais hiper-realistas apresentando suas peças em diferentes cenários e composições",
      "Catálogo por Cores: organize e apresente suas peças por cores, coleções ou categorias",
      "Apresentação Profissional: imagens produzidas para valorizar o produto e facilitar a divulgação nas redes sociais e canais digitais",
      "Botão de Compra Direta: leve o cliente diretamente para o WhatsApp ou canal de compra da sua empresa"
    ],
    mockupTitle: "Boutique & Confecção Urbana",
    mockupSubtitle: "Modelos Virtuais · Catálogo por Cores · Compra Direta",
    highlightText: "Mais agilidade para lançar novos produtos. Mais consistência visual. Menos custos de produção.",
    exampleImage: vitrineFashionImg,
    whatsappMessage: "Olá! Tenho uma loja/confecção e quero conhecer a solução de modelos virtuais e catálogo digital."
  },
  comercio: {
    id: "comercio",
    title: "Mercadinhos & Pequenos Comércios",
    tagline: "Seja a primeira opção do seu bairro quando alguém precisar comprar.",
    description: "Mostre aos moradores da sua região o que você vende, as ofertas da semana, horários de feriados e como pedir entrega no bairro.",
    badge: "Comércio de Bairro",
    features: [
      "Painel de ofertas da semana com atualização rápida",
      "Lista de categorias principais e produtos essenciais",
      "Horários de funcionamento sempre atualizados para evitar viagens perdidas",
      "Botão 'Pedir entrega no bairro' pelo WhatsApp",
      "Presença no mapa da vizinhança no Google"
    ],
    mockupTitle: "Mercado & Hortifruti do Bairro",
    mockupSubtitle: "Ofertas da Semana · Entrega Local · Google Maps",
    highlightText: "O comércio de bairro ganha força quando os vizinhos encontram tudo pelo celular em 5 segundos.",
    whatsappMessage: "Olá! Tenho um comércio de bairro e quero organizar minhas ofertas e presença no Google e WhatsApp."
  },
  profissionais: {
    id: "profissionais",
    title: "Profissionais Liberais & Técnicos",
    tagline: "Passe confiança imediata e pare de disputar clientes por preço.",
    description: "Para eletricistas, mecânicos, pedreiros, fotógrafos, marceneiros, pintores, técnicos e consultores que precisam comprovar qualidade antes de passar o orçamento.",
    badge: "Serviços & Autônomos",
    features: [
      "Galeria de trabalhos concluídos (antes e depois)",
      "Relação clara de serviços especializados prestados",
      "Áreas e bairros atendidos com clareza",
      "Botão de solicitação de orçamento direto no WhatsApp",
      "Ficha de confiança com tempo de atuação e garantias"
    ],
    mockupTitle: "Especialista em Instalações Técnicas",
    mockupSubtitle: "Portfólio de Obras · Avaliações · Orçamento Rápido",
    highlightText: "Quando você envia um link com seu portfólio profissional, o cliente percebe o valor antes mesmo de perguntar o preço.",
    exampleImage: localServicesImg,
    whatsappMessage: "Olá! Sou profissional autônomo/técnico e quero um site com portfólio para fechar melhores orçamentos."
  },
  personalizado: {
    id: "personalizado",
    title: "Outros Negócios Locais",
    tagline: "Projetos desenhados sob medida para o seu modelo de atendimento.",
    description: "Clínicas, barbearias, pet shops, estúdios, academias ou prestadores de serviços específicos. Construímos a solução ideal para o seu dia a dia.",
    badge: "Solução Sob Medida",
    features: [
      "Diagnóstico focado na rotina operacional do negócio",
      "Estrutura personalizada de páginas e formulários",
      "Integração com ferramentas que você já utiliza",
      "Fluxo de agendamento ou captação de clientes sob demanda",
      "Suporte e orientação do início ao fim"
    ],
    mockupTitle: "Projeto Sob Medida",
    mockupSubtitle: "Estrutura personalizada para o seu modelo comercial",
    highlightText: "Não empurramos soluções prontas que não fazem sentido para o seu ramo. Adaptamos a tecnologia ao seu negócio.",
    whatsappMessage: "Olá! Gostaria de uma solução personalizada para o meu tipo de negócio local."
  }
};

export const PACKAGES_DATA: PackageTier[] = [
  {
    id: "presenca",
    title: "Presença Digital",
    subtitle: "Uma apresentação profissional para empresas que precisam ser encontradas e contatadas com facilidade.",
    priceTag: "R$ 497",
    priceNote: "Valor atual do site · pagamento único",
    popular: false,
    featuresTitle: "O que está incluído:",
    features: [
      "Site responsivo com apresentação da empresa",
      "Serviços, horários e informações essenciais",
      "WhatsApp, Instagram e localização",
      "SEO local básico",
      "Publicação inicial"
    ],
    ctaText: "Solicitar proposta",
    ctaType: "consult",
    disclaimer: "Domínio, manutenção, integrações pagas e serviços de terceiros são avaliados separadamente."
  },
  {
    id: "negocio",
    title: "Negócio Digital",
    subtitle: "Uma vitrine organizada para produtos, serviços, cardápios, portfólios e campanhas.",
    priceTag: "R$ 797",
    priceNote: "Valor atual do site · pagamento único",
    popular: true,
    featuresTitle: "O que está incluído:",
    features: [
      "Todos os recursos de Presença Digital",
      "Catálogo, cardápio ou portfólio",
      "Categorias, imagens, descrições e preços",
      "Campanhas e promoções conforme escopo",
      "QR Code e solicitações via WhatsApp"
    ],
    ctaText: "Conhecer a solução",
    ctaType: "consult",
    disclaimer: "O escopo definitivo, prazos e condições constam da proposta comercial."
  },
  {
    id: "automacao",
    title: "Automação & Atendimento",
    subtitle: "Fluxos digitais para organizar contatos, reduzir tarefas repetitivas e apoiar o atendimento.",
    priceTag: "A partir de R$ 1.497",
    priceNote: "Implantação · escopo personalizado",
    popular: false,
    featuresTitle: "O que está incluído:",
    features: [
      "Triagem e qualificação de contatos",
      "Formulários e respostas automatizadas",
      "Encaminhamento para atendimento humano",
      "Agendamentos conforme viabilidade",
      "Integrações definidas em proposta"
    ],
    ctaText: "Discutir meu projeto",
    ctaType: "consult",
    disclaimer: "Integrações pagas, domínio e serviços de terceiros são avaliados separadamente em proposta comercial."
  }
];

export const DEMO_PROJECTS: DemoProject[] = [
  {
    id: "demo-gastro",
    title: "Bistrô & Hambúrguer Artesanal",
    segment: "Bares & Gastronomia",
    description: "Cardápio digital interativo via QR Code, agenda da semana e botão de rotas diretas no GPS.",
    editorialSummary: "Experiência digital pensada para bares, bistrôs e hamburguerias substituírem PDFs lentos por um cardápio ágil na mesa, com reservas e pedidos direcionados ao WhatsApp.",
    headline: "Do QR Code na mesa ao pedido sem atrito no celular",
    concept: "Unir apresentação gastronômica envolvente, consulta instantânea de pratos e bebidas, programação semanal e direcionamento direto para mapa ou reserva.",
    image: gastronomyMenuImg,
    imageAlt: "Cardápio digital interativo exibido em smartphone sobre mesa de bistrô com hambúrguer artesanal e chopp",
    media: [
      {
        id: "gastro-cover",
        type: "image",
        src: gastronomyMenuImg,
        alt: "Cardápio digital interativo exibido em smartphone sobre mesa de bistrô com hambúrguer artesanal e chopp",
        kind: "Experiência na mesa",
        caption: "Acesso instantâneo ao cardápio digital por QR Code diretamente da mesa."
      }
    ],
    tag: "Projeto Demonstrativo",
    features: ["Cardápio QR Code", "Agenda de Chopp & Eventos", "Botão Como Chegar", "Pedidos no WhatsApp"],
    detailedItems: [
      {
        title: "Cardápio Interativo Leve",
        desc: "Abertura rápida no celular sem exigir download de aplicativo ou arquivos pesados em PDF."
      },
      {
        title: "Agenda de Atrações",
        desc: "Destaque claro para noites de música ao vivo, promoções de chopp em dobro e combos especiais."
      },
      {
        title: "Rotas Diretas no GPS",
        desc: "Integração objetiva com Google Maps e Waze para conduzir novos clientes até a porta."
      },
      {
        title: "Pedidos e Reservas no WhatsApp",
        desc: "Botões de ação posicionados nos itens e seções para agilizar o atendimento da casa."
      }
    ],
    actionLabel: "Ver Demonstração de Cardápio"
  },
  {
    id: "demo-moda",
    title: "Boutique & Confecção Urbana",
    segment: "Moda & Lojas",
    description: "Modelos virtuais hiper-realistas e catálogo organizado por cores conectado diretamente ao WhatsApp.",
    editorialSummary: "Solução criada para lojas de vestuário e confecções apresentarem coleções com padrão editorial de estúdio, mantendo consistência visual e agilidade a cada lançamento.",
    headline: "Apresente suas coleções sem os custos de uma produção fotográfica tradicional",
    concept: "Mais agilidade para lançar novos produtos, mais consistência visual em todo o catálogo e menos custos recorrentes de produção fotográfica.",
    bodyParagraphs: [
      "Não dependa de contratação recorrente de modelos, fotógrafos e estúdios para apresentar cada nova coleção.",
      "Criamos modelos virtuais hiper-realistas, consistentes e personalizados para sua marca, apresentando suas peças de forma profissional e com padrão visual em todo o catálogo."
    ],
    highlightTakeaway: "Mais agilidade para lançar novos produtos. Mais consistência visual. Menos custos de produção.",
    detailedItems: [
      {
        title: "Modelos Virtuais",
        desc: "Modelos digitais hiper-realistas apresentando suas peças em diferentes cenários e composições."
      },
      {
        title: "Catálogo por Cores",
        desc: "Organize e apresente suas peças por cores, coleções ou categorias."
      },
      {
        title: "Apresentação Profissional",
        desc: "Imagens produzidas para valorizar o produto e facilitar a divulgação nas redes sociais e canais digitais."
      },
      {
        title: "Botão de Compra Direta",
        desc: "Leve o cliente diretamente para o WhatsApp ou canal de compra da sua empresa."
      }
    ],
    image: vitrineFashionImg,
    imageAlt: "Modelo virtual hiper-realista vestindo jaqueta urbana em vitrine digital minimalista",
    media: [
      {
        id: "moda-cover",
        type: "image",
        src: vitrineFashionImg,
        alt: "Modelo virtual hiper-realista vestindo jaqueta urbana em vitrine digital minimalista",
        kind: "Vitrine Editorial",
        caption: "Modelos virtuais consistentes com estética de catálogo premium para lançamento de coleções."
      }
    ],
    tag: "Projeto Demonstrativo",
    features: ["Modelos Virtuais", "Catálogo por Cores", "Apresentação Profissional", "Botão de Compra Direta"],
    actionLabel: "Ver Demonstração de Vitrine"
  },
  {
    id: "demo-servicos",
    title: "Oficina & Manutenção Especializada",
    segment: "Serviços Técnicos",
    description: "Portfólio de serviços executados, garantias e solicitação de orçamento rápido em um clique.",
    editorialSummary: "Estrutura digital desenvolvida para oficinas, assistências técnicas e profissionais especializados comprovarem domínio técnico antes mesmo do primeiro contato comercial.",
    headline: "Credibilidade técnica que valoriza o orçamento desde a primeira visita",
    concept: "Organizar provas visuais do trabalho realizado, áreas atendidas e especialidades com garantia em um canal objetivo que filtra curiosos e gera pedidos qualificados.",
    image: localServicesImg,
    imageAlt: "Técnico em bancada especializada com computador exibindo portfólio e ordens de serviço",
    media: [
      {
        id: "servicos-cover",
        type: "image",
        src: localServicesImg,
        alt: "Técnico em bancada especializada com computador exibindo portfólio e ordens de serviço",
        kind: "Estrutura Técnica",
        caption: "Apresentação clara de especialidades, trabalhos concluídos e solicitação rápida de orçamento."
      }
    ],
    tag: "Projeto Demonstrativo",
    features: ["Portfólio de Obras", "Áreas Atendidas", "Orçamento em 1 Clique", "Garantias Claras"],
    detailedItems: [
      {
        title: "Galeria de Serviços & Antes e Depois",
        desc: "Exibição organizada dos trabalhos executados para evidenciar padrão técnico e acabamento."
      },
      {
        title: "Especialidades e Garantias",
        desc: "Relação objetiva dos atendimentos prestados, diferenciais e condições de garantia."
      },
      {
        title: "Cobertura Geográfica Clara",
        desc: "Indicação precisa de cidades, bairros ou regiões atendidas pela equipe."
      },
      {
        title: "Orçamento Direto em 1 Clique",
        desc: "Direcionamento para o WhatsApp com assunto já identificado para agilizar a triagem."
      }
    ],
    actionLabel: "Ver Demonstração de Portfólio"
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    number: "01",
    title: "Conversa",
    desc: "Entendemos a realidade do seu negócio, como seus clientes chegam até você e quais as principais dificuldades de atendimento."
  },
  {
    number: "02",
    title: "Diagnóstico",
    desc: "Identificamos os pontos cegos da sua presença digital (Google, WhatsApp, redes e catálogo) e traçamos o plano ideal."
  },
  {
    number: "03",
    title: "Demonstração",
    desc: "Criamos uma prévia visual para que você veja como sua empresa ficará no celular antes de qualquer compromisso financeiro."
  },
  {
    number: "04",
    title: "Desenvolvimento",
    desc: "Após sua aprovação, construímos a estrutura completa, otimizamos o carregamento, cadastramos seus produtos e conectamos os canais."
  },
  {
    number: "05",
    title: "Entrega e Evolução",
    desc: "Publicamos seu projeto pronto para receber clientes. Caso deseje, cuidamos da manutenção e suporte contínuo nos meses seguintes."
  }
];

export const DIFFERENTIALS_DATA = [
  {
    title: "Feito para a realidade local",
    desc: "Não usamos fórmulas de grandes corporações. Nossas soluções são desenhadas para quem atende no balcão, no bairro e no WhatsApp."
  },
  {
    title: "Apresentação profissional e confiável",
    desc: "Estrutura moderna e organizada que transmite seriedade aos seus clientes e valoriza seus produtos e serviços desde o primeiro contato."
  },
  {
    title: "Tecnologia sem complicação",
    desc: "Você não precisa saber programar nem entender de servidores. Entregamos tudo pronto para usar e fácil de operar."
  },
  {
    title: "Soluções modulares e escaláveis",
    desc: "Comece com uma presença sólida e adicione cardápios, vitrines com modelos virtuais ou automações conforme sua demanda cresce."
  },
  {
    title: "Demonstração antes de fechar",
    desc: "Você tem a oportunidade de enxergar o seu negócio dentro da nossa solução antes de tomar sua decisão comercial."
  }
];
