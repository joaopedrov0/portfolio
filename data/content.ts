export type Locale = 'pt' | 'en';
export type Localized = Record<Locale, string>;

export type ProjectKind = 'production' | 'lab';
export type ProjectStatus = 'in-use' | 'live' | 'suspended' | 'done' | 'experimental' | 'paused';
export type LinkKind = 'live' | 'repo' | 'download';

export interface ProjectLink {
  kind: LinkKind;
  href: string;
  label?: Localized;
}

export interface Shot {
  src: string;
  alt: Localized;
  caption?: Localized;
}

export interface Fact {
  key?: 'role';
  label: Localized;
  value: Localized;
}

export type Section =
  | { type: 'text'; title: Localized; body: Localized }
  | { type: 'list'; title: Localized; items: { title: Localized; body: Localized }[] }
  | { type: 'cards'; title: Localized; items: { title: Localized; body: Localized }[] };

export interface Project {
  slug: string;
  kind: ProjectKind;
  title: string;
  year: string;
  ongoing?: boolean;
  status: ProjectStatus;
  version?: string;
  summary: Localized;
  lead?: Localized;
  stack: string[];
  image?: Shot;
  logo?: string;
  links: ProjectLink[];
  facts?: Fact[];
  sections?: Section[];
  details?: Localized;
  learned?: Localized;
  gallery?: Shot[];
  publications?: string[];
}

export interface Publication {
  slug: string;
  event: string;
  kind: Localized;
  title: string;
  authors: string;
  href: string;
  thumb?: string;
  featured?: boolean;
  abstract?: Localized;
  note?: Localized;
}

export interface Material {
  format: Localized;
  title: Localized;
  audience: Localized;
  host: string;
  href: string;
}

export interface DevToPost {
  area: Localized;
  title: string;
  href: string;
}

const L = (pt: string, en: string): Localized => ({ pt, en });

export const statusLabels: Record<ProjectStatus, Localized> = {
  'in-use': L('Em uso', 'In use'),
  live: L('No ar', 'Live'),
  suspended: L('Suspenso', 'Suspended'),
  done: L('Concluído', 'Completed'),
  experimental: L('Experimental', 'Experimental'),
  paused: L('Pausado', 'Paused'),
};

const GH = 'https://github.com/joaopedrov0/';
const PAGES = 'https://joaopedrov0.github.io/';

export const projects: Project[] = [
  // ---------- Produção ----------
  {
    slug: 'emmas-librarian',
    kind: 'production',
    title: "Emma's Librarian",
    year: '2026',
    status: 'in-use',
    version: 'v1.2.2',
    summary: L(
      'Plataforma local e privada de apoio à pesquisa: busca unificada em Scopus, OpenAlex, Crossref, Europe PMC, arXiv e IEEE, download automático de PDFs de acesso aberto, categorização de artigos e IA com citação da página de origem.',
      'A local, private research platform: unified search across Scopus, OpenAlex, Crossref, Europe PMC, arXiv and IEEE, automatic download of open-access PDFs, paper categorization, and AI answers that cite the source page.'
    ),
    lead: L(
      'Uma plataforma local e privada que reúne em um só lugar o que um projeto de pesquisa costuma espalhar por várias ferramentas: busca bibliográfica, leitura de PDFs, categorização, IA e registro do dia a dia.',
      'A local, private platform that brings together what a research project usually spreads across many tools: literature search, PDF reading, categorization, AI and day-to-day notes.'
    ),
    stack: ['Electron', 'React', 'Vite', 'SQLite', 'ONNX'],
    image: {
      src: '/img/emmas-librarian/landing.jpg',
      alt: L("Landing page do Emma's Librarian: a suíte completa para revisão sistemática", "Emma's Librarian landing page: the complete suite for systematic reviews"),
    },
    logo: '/img/emmas-librarian/logo.svg',
    links: [
      { kind: 'download', href: 'https://mastrien.github.io/emmas_librarian/', label: L('Baixar para Windows', 'Download for Windows') },
      { kind: 'repo', href: 'https://github.com/mastrien/emmas_librarian' },
    ],
    facts: [
      { label: L('Contexto', 'Context'), value: L('Projeto pessoal, nascido do meu uso em iniciação científica', 'Personal project, born from my own undergraduate research') },
      { key: 'role', label: L('Meu papel', 'My role'), value: L('Desenvolvedor único', 'Sole developer') },
      { label: L('Período', 'Period'), value: L('2026 – hoje', '2026 – present') },
      { label: L('Quem usa', 'Who uses it'), value: L('Alunos de iniciação científica · apresentado no INPE e no IFSP', 'Undergraduate researchers · presented at INPE and IFSP') },
      { label: L('Stack', 'Stack'), value: L('Electron · React · Vite · SQLite · ONNX', 'Electron · React · Vite · SQLite · ONNX') },
      { label: L('IA', 'AI'), value: L('OpenAI · Gemini · Anthropic · Ollama', 'OpenAI · Gemini · Anthropic · Ollama') },
      { label: L('Distribuição', 'Distribution'), value: L('Instalador .exe com atualização automática', '.exe installer with auto-update') },
    ],
    sections: [
      {
        type: 'text',
        title: L('O problema', 'The problem'),
        body: L(
          'Usando o Bibliometrix/biblioshiny para análise bibliográfica, percebi que juntar resultados de bases diferentes numa mesma análise era desnecessariamente trabalhoso. A ideia inicial era só unificar as buscas e exportar para o biblioshiny. O resto surgiu aos poucos, do meu próprio uso da ferramenta na iniciação científica.',
          'While using Bibliometrix/biblioshiny for bibliometric analysis, I noticed that combining results from different databases in a single analysis was needlessly laborious. The initial idea was just to unify the searches and export them to biblioshiny. Everything else grew organically from my own use of the tool in undergraduate research.'
        ),
      },
      {
        type: 'list',
        title: L('O que ele faz', 'What it does'),
        items: [
          {
            title: L('Busca unificada', 'Unified search'),
            body: L(
              'uma consulta, montada num construtor visual, roda em Scopus, OpenAlex, Crossref, Europe PMC, arXiv e IEEE, e os PDFs de acesso aberto são baixados automaticamente.',
              'one query, built in a visual editor, runs on Scopus, OpenAlex, Crossref, Europe PMC, arXiv and IEEE, and open-access PDFs are downloaded automatically.'
            ),
          },
          {
            title: L('Investigação massiva e categorização', 'Large-scale screening and categorization'),
            body: L(
              'organizar e classificar grandes volumes de artigos segundo os critérios da pesquisa.',
              'organizing and classifying large volumes of papers according to the research criteria.'
            ),
          },
          {
            title: L('Conversa com a biblioteca', 'Talk to your library'),
            body: L(
              'RAG com citação da página de origem, usando o provedor de IA que a pessoa preferir, inclusive local via Ollama.',
              'RAG that cites the source page, using whichever AI provider the researcher prefers, including local models via Ollama.'
            ),
          },
          {
            title: L('Rotina de pesquisa', 'Research routine'),
            body: L('leitor de PDF, agenda, diário e backups automáticos no mesmo lugar.', 'PDF reader, schedule, research diary and automatic backups in one place.'),
          },
        ],
      },
      {
        type: 'cards',
        title: L('Decisões técnicas', 'Technical decisions'),
        items: [
          {
            title: L('Local e privado', 'Local and private'),
            body: L(
              'Algumas pesquisas, como um doutorado em andamento, não deveriam ficar na nuvem. Tudo fica na máquina da pessoa, em SQLite.',
              'Some research, like an ongoing PhD, should not live in the cloud. Everything stays on the researcher’s machine, in SQLite.'
            ),
          },
          {
            title: L('Electron', 'Electron'),
            body: L(
              'Facilita o uso: um instalador e pronto, com atualização automática, sem pedir que pesquisadores configurem um ambiente.',
              'Makes it easy to use: one installer with auto-update, without asking researchers to set up an environment.'
            ),
          },
          {
            title: L('Embeddings locais', 'Local embeddings'),
            body: L('Um modelo ONNX leve roda junto com o app — uma configuração a menos para o usuário.', 'A lightweight ONNX model ships with the app — one less thing for users to configure.'),
          },
          {
            title: L('Protocolo próprio para os PDFs', 'Custom protocol for PDFs'),
            body: L('Criado para otimizar o carregamento do leitor de PDF.', 'Built to speed up loading in the PDF reader.'),
          },
        ],
      },
      {
        type: 'text',
        title: L('O que aprendi', 'What I learned'),
        body: L(
          'Foi meu primeiro sistema com o código 100% escrito por agentes de IA. Aprendi a usá-los do jeito certo: definir quality gates, garantir que o código gerado continue de pé e gerenciar releases de um software standalone.',
          'It was my first system with 100% of the code written by AI agents. I learned how to use them properly: defining quality gates, making sure the generated code keeps standing, and managing releases of standalone software.'
        ),
      },
    ],
    gallery: [
      { src: '/img/emmas-librarian/busca-federada.png', alt: L('Construtor visual de consulta em árvore lógica', 'Visual query builder with a logic tree'), caption: L('Busca unificada com construtor visual', 'Unified search with a visual query builder') },
      { src: '/img/emmas-librarian/biblioteca-pdf.png', alt: L("Biblioteca de PDFs do Emma's Librarian", "Emma's Librarian PDF library"), caption: L('Biblioteca de PDFs e leitor integrado', 'PDF library and built-in reader') },
      { src: '/img/emmas-librarian/rag-ia.png', alt: L('Conversa com IA sobre os artigos, com citação de página', 'AI chat about the papers, with page citations'), caption: L('IA com RAG e citação da página de origem', 'RAG-powered AI with source page citations') },
      { src: '/img/emmas-librarian/agenda.png', alt: L('Agenda do projeto de pesquisa', 'Research project schedule'), caption: L('Agenda e rotina da pesquisa', 'Schedule and research routine') },
    ],
    publications: ['worcap-2026-emmas-librarian'],
  },
  {
    slug: 'ifvest',
    kind: 'production',
    title: 'IFVest',
    year: '2025',
    ongoing: true,
    status: 'live',
    summary: L(
      'Plataforma gratuita do IFSP de preparação para vestibulares, com simulados, gamificação e redação, usada no campus Jacareí. Coordeno o time de ~10 pessoas com minha orientadora.',
      'IFSP’s free university-entrance exam prep platform, with mock exams, gamification and essay practice, used at the Jacareí campus. I lead the ~10-person team together with my advisor.'
    ),
    lead: L(
      'Plataforma gratuita desenvolvida no IFSP para democratizar o acesso a simulados, redações e conteúdos de apoio para vestibulares.',
      'A free platform built at IFSP to broaden access to mock exams, essay practice and study material for university entrance exams.'
    ),
    stack: ['FastAPI', 'PostgreSQL', 'React', 'TypeScript', 'Docker'],
    image: { src: '/img/ifvest/home.jpg', alt: L('Página inicial do IFVest', 'IFVest home page') },
    links: [{ kind: 'live', href: 'https://ifvest.com.br' }],
    facts: [
      { label: L('Contexto', 'Context'), value: L('Projeto do IFSP campus Jacareí, ligado à iniciação científica', 'IFSP Jacareí campus project, tied to undergraduate research') },
      { key: 'role', label: L('Meu papel', 'My role'), value: L('Gestor do time, junto com minha orientadora', 'Team lead, together with my advisor') },
      { label: L('Equipe', 'Team'), value: L('Cerca de 10 pessoas', 'About 10 people') },
      { label: L('Período', 'Period'), value: L('2025 – hoje', '2025 – present') },
      { label: L('Quem usa', 'Who uses it'), value: L('Estudantes do campus Jacareí', 'Students at the Jacareí campus') },
      { label: L('Stack', 'Stack'), value: L('FastAPI · PostgreSQL · React · TypeScript · Docker', 'FastAPI · PostgreSQL · React · TypeScript · Docker') },
    ],
    sections: [
      {
        type: 'text',
        title: L('Minha participação', 'My part'),
        body: L(
          'Na versão anterior da plataforma, desenvolvi o módulo de revisão de conteúdo, que virou artigo no CONICT 2025. Na versão atual, um monorepo novo, sou o gestor do time.',
          'In the previous version of the platform, I built the content review module, which became a paper at CONICT 2025. In the current version, a brand-new monorepo, I lead the team.'
        ),
      },
      {
        type: 'text',
        title: L('Como é feito', 'How it is built'),
        body: L(
          'Monorepo com back-end em FastAPI e PostgreSQL e front-end em React com TypeScript e Vite, tudo em Docker, com uma CI que exige 90% de cobertura de testes.',
          'A monorepo with a FastAPI and PostgreSQL back end and a React, TypeScript and Vite front end, all in Docker, with CI that requires 90% test coverage.'
        ),
      },
      {
        type: 'text',
        title: L('O que aprendi', 'What I learned'),
        body: L('Principalmente, a organizar uma equipe.', 'Above all, how to organize a team.'),
      },
    ],
    publications: ['cobicet-2026', 'worcap-2025', 'conict-2025-ifvest'],
  },
  {
    slug: 'museu-ifsp',
    kind: 'production',
    title: 'Museu de Ciência e Tecnologia do IFSP',
    year: '2024',
    status: 'live',
    summary: L(
      'Criei e organizei a versão inicial do museu de ciência e tecnologia do IFSP, físico e online. Hoje o projeto segue com outra equipe, que mudou bastante o site.',
      'I created and organized the first version of IFSP’s science and technology museum, both physical and online. Today the project continues with another team, which has changed the site a lot.'
    ),
    stack: ['React', 'TypeScript', 'EmailJS'],
    image: { src: '/img/museu/home.png', alt: L('Tela inicial do Museu de Ciência e Tecnologia do IFSP', 'Home page of the IFSP Science and Technology Museum') },
    links: [
      { kind: 'live', href: `${PAGES}museucienciaetecnologia/` },
      { kind: 'repo', href: `${GH}museucienciaetecnologia` },
    ],
    facts: [
      { label: L('Contexto', 'Context'), value: L('Projeto de extensão do IFSP', 'IFSP outreach project') },
      { key: 'role', label: L('Meu papel', 'My role'), value: L('Criação e organização da versão inicial', 'Created and organized the first version') },
      { label: L('Período', 'Period'), value: L('2024', '2024') },
      { label: L('Stack', 'Stack'), value: L('React · TypeScript · EmailJS', 'React · TypeScript · EmailJS') },
    ],
    sections: [
      {
        type: 'text',
        title: L('Contexto', 'Context'),
        body: L(
          'O IFSP queria dar início a um museu de ciência e tecnologia. Fui eu que criei e organizei a versão inicial, tanto do espaço físico quanto do site, que inclui o acervo virtual e um sistema de agendamento de visitas.',
          'IFSP wanted to start a science and technology museum. I created and organized its first version, both the physical space and the website, which includes the virtual collection and a visit booking system.'
        ),
      },
      {
        type: 'text',
        title: L('Estado atual', 'Current state'),
        body: L(
          'O museu físico ainda não abriu. O site continua no ar, mas hoje grande parte dele foi refeita por quem deu continuidade ao projeto.',
          'The physical museum has not opened yet. The site is still live, but most of it has since been redone by the people who took over the project.'
        ),
      },
    ],
    publications: ['conict-2024-museu'],
  },
  {
    slug: 'rankit',
    kind: 'production',
    title: 'Rank.it',
    year: '2024',
    status: 'suspended',
    summary: L(
      'Rede social para avaliar filmes, séries, animes, jogos e livros, com perfis e seguidores. Saiu do ar quando o grupo priorizou outras coisas; a ideia é voltar.',
      'A social network for rating movies, series, anime, games and books, with profiles and followers. It went offline when the group shifted priorities; we plan to bring it back.'
    ),
    stack: ['Python', 'Django', 'MongoDB'],
    image: { src: '/img/rankit/home.png', alt: L('Tela inicial do Rank.it', 'Rank.it home page') },
    links: [{ kind: 'repo', href: `${GH}rankit` }],
    facts: [
      { label: L('Contexto', 'Context'), value: L('Projeto em grupo, iniciado em uma disciplina', 'Group project started in a university course') },
      { key: 'role', label: L('Meu papel', 'My role'), value: L('Front-end e back-end', 'Front end and back end') },
      { label: L('Período', 'Period'), value: L('2024', '2024') },
      { label: L('Stack', 'Stack'), value: L('Python · Django · MongoDB', 'Python · Django · MongoDB') },
    ],
    sections: [
      {
        type: 'text',
        title: L('Por que está suspenso', 'Why it is suspended'),
        body: L(
          'O grupo não deu continuidade porque surgiram outras prioridades, e na época os colegas ainda tinham pouca experiência, então eu teria que seguir sozinho. Hoje o grupo está mais experiente e planejamos voltar com o projeto.',
          'The group stopped because other priorities came up, and back then my teammates had little experience, so I would have had to carry on alone. The group is more experienced now and we plan to bring the project back.'
        ),
      },
      {
        type: 'text',
        title: L('O que eu faria diferente', 'What I would do differently'),
        body: L(
          'Usaria o ORM do Django. Na época não pude: a disciplina que deu origem ao projeto exigia que essa camada fosse escrita à mão.',
          'I would use Django’s ORM. Back then I couldn’t: the course that started the project required us to write that layer by hand.'
        ),
      },
    ],
  },
  {
    slug: 'bingo',
    kind: 'production',
    title: 'Bingo',
    year: '2021',
    status: 'live',
    summary: L(
      'Feito numa tarde, quando eu começava a programar, para a família jogar bingo sem o globo de sorteio — e usado no mesmo encontro.',
      'Built in one afternoon, when I was just starting to code, so my family could play bingo without a ball cage — and used at that same gathering.'
    ),
    stack: ['JavaScript'],
    image: { src: '/img/bingo/home.png', alt: L('Tela do Bingo', 'Bingo screen') },
    links: [
      { kind: 'live', href: `${PAGES}bingo` },
      { kind: 'repo', href: `${GH}bingo` },
    ],
    facts: [
      { label: L('Quem usou', 'Who used it'), value: L('Amigos e família', 'Friends and family') },
      { label: L('Período', 'Period'), value: L('2021', '2021') },
      { label: L('Stack', 'Stack'), value: L('HTML · CSS · JavaScript', 'HTML · CSS · JavaScript') },
    ],
    sections: [
      {
        type: 'text',
        title: L('A história', 'The story'),
        body: L(
          'Eu estava começando a aprender o básico de programação quando ouvi familiares dizendo que queriam jogar bingo, mas estavam sem o mecanismo de sorteio. Em uma tarde o sistema estava pronto, e eles usaram durante o encontro. É um projeto extremamente simples, mas foi importante para eu enxergar a programação como uma forma de resolver problemas.',
          'I was just learning the basics of programming when I heard relatives saying they wanted to play bingo but had no way to draw the numbers. In one afternoon the system was ready, and they used it at the gathering. It is an extremely simple project, but it was important for seeing programming as a way to solve problems.'
        ),
      },
    ],
  },

  // ---------- Laboratório ----------
  {
    slug: 'paper-advisor',
    kind: 'lab',
    title: 'paper-advisor',
    year: '2026',
    status: 'experimental',
    summary: L(
      'Sistema duplo para o ciclo de escrita e correção de artigos científicos. Validando a hipótese com modelos de NLI.',
      'A two-sided system for the writing and review cycle of scientific papers. Validating the hypothesis with NLI models.'
    ),
    details: L(
      'Está em fase de validar a hipótese: testando modelos de NLI e verificando se as correções de orientadores têm padrões repetíveis que alguma técnica de IA consiga aprender. Aqui o objetivo não é aprender, e sim resolver o problema.',
      'It is in the hypothesis-validation phase: testing NLI models and checking whether advisors’ corrections follow repeatable patterns that some AI technique could learn. The goal here is not learning, but solving the problem.'
    ),
    stack: ['Python', 'NLI'],
    links: [],
  },
  {
    slug: 'ultimato-de-tho-ka',
    kind: 'lab',
    title: 'Ultimato de Tho-ka',
    year: '2026',
    status: 'experimental',
    summary: L(
      'Roguelike com modos waves e dungeons, inspirado em Brotato e Soul Knight. Um teste de agentes de IA no desenvolvimento de jogos.',
      'A roguelike with waves and dungeons modes, inspired by Brotato and Soul Knight. A test of AI agents in game development.'
    ),
    details: L(
      'Um roguelike com dois modos, waves e dungeons, inspirados respectivamente em Brotato e Soul Knight, com mecânicas inspiradas em League of Legends e personagens de um universo de RPG autoral. Fiz sozinho. Ainda não está em uma loja de jogos; por enquanto, os arquivos ficam no Google Drive.',
      'A roguelike with two modes, waves and dungeons, inspired by Brotato and Soul Knight respectively, with mechanics inspired by League of Legends and characters from an original tabletop RPG universe. I made it alone. It is not on a game store yet; for now, the files live on Google Drive.'
    ),
    learned: L(
      'Queria testar agentes de IA no desenvolvimento de jogos e acabei testando também modelagem 3D, geração de imagens, animação e rigging, além de otimização conforme os problemas apareciam.',
      'I wanted to test AI agents in game development and ended up also testing 3D modeling, image generation, animation and rigging, plus optimization as problems came up.'
    ),
    stack: ['Godot'],
    links: [
      {
        kind: 'download',
        href: 'https://drive.google.com/drive/folders/1CbAQbUhYY6QdPHUXkjwpBG92WJSaksK1',
        label: L('Baixar no Google Drive', 'Download from Google Drive'),
      },
    ],
  },
  {
    slug: 'lab',
    kind: 'lab',
    title: 'lab',
    year: '2026',
    status: 'experimental',
    summary: L(
      'Experimentos feitos com Gemini CLI no Termux, com git e gh configurados.',
      'Experiments built with Gemini CLI on Termux, with git and gh set up.'
    ),
    details: L(
      'Um experimento do que eu conseguia fazer com o Gemini CLI no Termux, no celular. O hub reúne ENEM API Explorer, MathGen Trainer, uma maquininha de Banco Imobiliário, um hub de jogos, Arkeynist, DocToTex, League Whiteboard e o DataLab, que está em Materiais didáticos.',
      'An experiment in what I could build with Gemini CLI on Termux, on my phone. The hub includes ENEM API Explorer, MathGen Trainer, a Monopoly card machine, a games hub, Arkeynist, DocToTex, League Whiteboard and DataLab, which is listed under Teaching materials.'
    ),
    learned: L(
      'Agentes de IA já são competentes o suficiente para resolver problemas pequenos e bem definidos.',
      'AI agents are already capable enough to solve small, well-defined problems.'
    ),
    stack: ['JavaScript', 'Termux', 'Gemini CLI'],
    image: { src: '/img/lab/home.jpg', alt: L('Hub de experimentos do lab', 'The lab experiments hub') },
    links: [
      { kind: 'live', href: 'https://mastrien.github.io/lab/' },
      { kind: 'repo', href: 'https://github.com/mastrien/lab' },
    ],
  },
  {
    slug: 'wisdom-dungeon',
    kind: 'lab',
    title: 'Wisdom Dungeon',
    year: '2026',
    status: 'live',
    summary: L(
      'Plataforma gamificada de matemática e ENEM, em que resolver questões é como derrotar monstros.',
      'A gamified math and ENEM platform where solving questions means defeating monsters.'
    ),
    details: L(
      'Um projeto pessoal que eu queria fazer há bastante tempo, com uma identidade de jogo bem mais presente que a do IFVest. Foi planejando ele que acabei entrando no IFVest, que era um projeto parecido. Back-end em Django e DRF, front-end em Next.js, autenticação com Firebase, KaTeX para as fórmulas e um gerador procedural de questões, tudo desenvolvido com TDD.',
      'A personal project I had wanted to build for a long time, with a much stronger game identity than IFVest. Planning it is what led me to join IFVest, a similar project. Django and DRF back end, Next.js front end, Firebase auth, KaTeX for formulas and a procedural question generator, all built with TDD.'
    ),
    stack: ['Django', 'Next.js', 'Firebase'],
    image: { src: '/img/wisdom-dungeon/home.jpg', alt: L('Página inicial do Wisdom Dungeon', 'Wisdom Dungeon home page') },
    links: [{ kind: 'live', href: 'https://wisdomdungeon.vercel.app' }],
  },
  {
    slug: 'arca',
    kind: 'lab',
    title: 'arca',
    year: '2026',
    status: 'done',
    summary: L('Um build to learn para aprender Rust.', 'A build-to-learn project for learning Rust.'),
    learned: L('Rust.', 'Rust.'),
    stack: ['Rust'],
    links: [{ kind: 'repo', href: 'https://github.com/mastrien/arca' }],
  },
  {
    slug: 'zolt-summarizer',
    kind: 'lab',
    title: 'Zolt Summarizer',
    year: '2025',
    status: 'done',
    summary: L(
      'Resume vídeos identificando quem fala, com Whisper, Pyannote e Ollama rodando localmente. Feito para sessões de RPG e reuniões.',
      'Summarizes videos while identifying who is speaking, with Whisper, Pyannote and Ollama running locally. Made for RPG sessions and meetings.'
    ),
    learned: L(
      'A integrar modelos de IA em um sistema real rodando localmente: Ollama e SDKs de ferramentas como Whisper, Pyannote e LLMs.',
      'How to integrate AI models into a real system running locally: Ollama and SDKs for tools like Whisper, Pyannote and LLMs.'
    ),
    stack: ['Python', 'Whisper', 'Pyannote', 'Ollama'],
    links: [{ kind: 'repo', href: `${GH}zolt-summarizer` }],
  },
  {
    slug: 'zynlib',
    kind: 'lab',
    title: 'ZynLib',
    year: '2025',
    status: 'done',
    summary: L(
      'Escrita colaborativa de materiais didáticos com histórico rastreável de revisões.',
      'Collaborative writing of teaching materials with a traceable revision history.'
    ),
    details: L(
      'A ideia é servir de base para os materiais que futuramente vão entrar no módulo de revisão de conteúdo do IFVest, mas acabei usando também para escrever um material de redes neurais para ajudar alguns colegas.',
      'It is meant to be the foundation for materials that will later go into IFVest’s content review module, but I also ended up using it to write a neural networks guide to help some classmates.'
    ),
    stack: ['Next.js', 'Supabase'],
    links: [
      { kind: 'live', href: 'https://zynlib.vercel.app' },
      { kind: 'repo', href: `${GH}zynlib` },
    ],
  },
  {
    slug: 'abntoolbox',
    kind: 'lab',
    title: 'ABNToolbox',
    year: '2025',
    status: 'done',
    summary: L('Ferramentas de metodologia científica reunidas num lugar só.', 'Scientific methodology tools gathered in one place.'),
    details: L(
      'Queria reunir ferramentas úteis para o contexto científico em um só lugar, de uma forma simples.',
      'I wanted to bring useful tools for scientific work together in one place, in a simple way.'
    ),
    stack: ['JavaScript'],
    links: [
      { kind: 'live', href: `${PAGES}abntoolbox/` },
      { kind: 'repo', href: `${GH}abntoolbox` },
    ],
  },
  {
    slug: 'the-architect',
    kind: 'lab',
    title: 'The Architect',
    year: '2025',
    status: 'paused',
    summary: L(
      'Plataforma de suporte ao ensino de engenharia de software. Virou artigo no CONICT 2025.',
      'A platform to support software engineering teaching. It became a paper at CONICT 2025.'
    ),
    details: L('Desenvolvi sozinho. Foi pouco usado até agora, e o projeto está pausado.', 'I built it alone. It has seen little use so far, and the project is paused.'),
    stack: ['JavaScript'],
    links: [
      { kind: 'live', href: `${PAGES}architect/` },
      { kind: 'repo', href: `${GH}architect` },
    ],
    publications: ['conict-2025-architect'],
  },
  {
    slug: 'arcanaflow',
    kind: 'lab',
    title: 'ArcanaFlow',
    year: '2025',
    status: 'done',
    summary: L(
      'Módulo de logs em que cada parte do sistema é uma entidade que se identifica ao falar no terminal.',
      'A logging module where each part of the system is an entity that introduces itself when it speaks in the terminal.'
    ),
    learned: L(
      'O básico sobre logging — depois descobri que já existe meio mundo de ferramentas para isso, mas foi legal ver como funciona, por exemplo, capturar a linha que chamou cada função. Acho também que tratar cada parte como uma entidade que "diz" coisas é mais intuitivo para iniciantes.',
      'The basics of logging — later I found out there are tons of tools for this, but it was fun to see how things like capturing the calling line work. I also think treating each part as an entity that "says" things is more intuitive for beginners.'
    ),
    stack: ['JavaScript'],
    links: [{ kind: 'repo', href: `${GH}arcanaflow` }],
  },
  {
    slug: 'tijolo-girando',
    kind: 'lab',
    title: 'tijolo_girando',
    year: '2025',
    status: 'done',
    summary: L(
      'Um renderizador 3D simples no terminal, feito para aprender álgebra linear.',
      'A simple 3D renderer in the terminal, built to learn linear algebra.'
    ),
    learned: L(
      'Eu estava no meio do curso de álgebra linear do 3Blue1Brown. Já tinha visto gente fazer algo parecido com uma rosquinha e achava assustador que isso fosse possível no terminal — não fazia ideia de como funcionava. Tive o insight durante a aula, resolvi implementar e consegui.',
      'I was halfway through 3Blue1Brown’s linear algebra course. I had seen people do something similar with a donut and found it scary that it was possible in a terminal — I had no idea how it worked. I had the insight during class, decided to implement it, and pulled it off.'
    ),
    stack: ['JavaScript'],
    links: [{ kind: 'repo', href: `${GH}tijolo_girando` }],
  },
  {
    slug: 'nayachat',
    kind: 'lab',
    title: 'NayaChat',
    year: '2025',
    status: 'done',
    summary: L('Chat experimental em tempo real, feito como avaliação da disciplina de redes.', 'An experimental real-time chat, built as an assignment for a networking course.'),
    learned: L('A criar um chat em tempo real.', 'How to build a real-time chat.'),
    stack: ['JavaScript'],
    links: [{ kind: 'repo', href: `${GH}nayachat` }],
  },
  {
    slug: 'desafio-x',
    kind: 'lab',
    title: 'desafio_x',
    year: '2025',
    status: 'done',
    summary: L('Quiz para um amigo professor usar durante as aulas.', 'A quiz for a teacher friend to use during class.'),
    stack: ['HTML', 'JavaScript'],
    links: [
      { kind: 'live', href: `${PAGES}desafio_x/` },
      { kind: 'repo', href: `${GH}desafio_x` },
    ],
  },
  {
    slug: 'rpgdle',
    kind: 'lab',
    title: 'RPGdle',
    year: '2024',
    status: 'done',
    summary: L('Minha versão do LoLdle para universos de RPG que joguei com amigos.', 'My take on LoLdle for RPG universes I played with friends.'),
    details: L('Não foi para aprender nada: só queria criar para jogar com os amigos.', 'It was not about learning anything: I just wanted to make it to play with friends.'),
    stack: ['HTML', 'JavaScript'],
    links: [
      { kind: 'live', href: `${PAGES}rpgdle/` },
      { kind: 'repo', href: `${GH}rpgdle` },
    ],
  },
  {
    slug: 'jogo-da-memoria',
    kind: 'lab',
    title: 'Jogo da Memória',
    year: '2024',
    status: 'done',
    summary: L('Um jogo da memória, programado durante uma viagem para passar o tempo.', 'A memory game, coded during a trip to pass the time.'),
    stack: ['JavaScript'],
    image: { src: '/img/memorygame/home.png', alt: L('Tela do Jogo da Memória', 'Memory game screen') },
    links: [
      { kind: 'live', href: `${PAGES}memorygame/` },
      { kind: 'repo', href: `${GH}memorygame` },
    ],
  },
  {
    slug: 'ia',
    kind: 'lab',
    title: 'ia',
    year: '2024',
    status: 'done',
    summary: L('Implementação de cadeia de Markov.', 'A Markov chain implementation.'),
    learned: L('Como gerar um autocomplete com cadeia de Markov.', 'How to build autocomplete with a Markov chain.'),
    stack: ['JavaScript'],
    links: [{ kind: 'repo', href: `${GH}ia` }],
  },
  {
    slug: 'pinn',
    kind: 'lab',
    title: 'Pinn',
    year: '2023',
    status: 'done',
    summary: L(
      'Um jogo educativo para praticar soma, subtração e multiplicação: você resolve contas para ganhar dinheiro e compra o que o Pinn, seu bichinho virtual, precisa para continuar vivo.',
      'An educational game for practicing addition, subtraction and multiplication: you solve problems to earn money and buy what Pinn, your virtual pet, needs to stay alive.'
    ),
    stack: ['JavaScript', 'HTML', 'CSS'],
    image: { src: '/img/pinn/home.png', alt: L('Tela do jogo Pinn', 'Pinn game screen') },
    links: [
      { kind: 'live', href: `${PAGES}pinn/`, label: L('Jogar', 'Play') },
      { kind: 'repo', href: `${GH}pinn` },
    ],
    publications: ['conict-2024-pinn'],
  },
  {
    slug: 'dnd-search',
    kind: 'lab',
    title: 'D&D Search',
    year: '2021',
    status: 'done',
    summary: L(
      'Fichas de monstros e magias de D&D consumindo uma API pública.',
      'D&D monster and spell sheets powered by a public API.'
    ),
    learned: L('A consumir uma API.', 'How to consume an API.'),
    stack: ['JavaScript', 'API'],
    links: [
      { kind: 'live', href: `${PAGES}monstersearch/`, label: L('Monstros', 'Monsters') },
      { kind: 'live', href: `${PAGES}spellsearch/`, label: L('Magias', 'Spells') },
      { kind: 'repo', href: `${GH}monstersearch`, label: L('Repositório (monstros)', 'Repository (monsters)') },
      { kind: 'repo', href: `${GH}spellsearch`, label: L('Repositório (magias)', 'Repository (spells)') },
    ],
  },
  {
    slug: 'helpincalculus',
    kind: 'lab',
    title: 'HelpInCalculus',
    year: '2021',
    status: 'done',
    summary: L('Uma página que explica passo a passo a resolução de equações.', 'A page that explains how to solve equations, step by step.'),
    learned: L(
      'Era mais ensinar do que aprender, mas foi quando comecei a sentir a necessidade de quebrar o código em diferentes arquivos.',
      'It was more about teaching than learning, but it is when I first felt the need to split code into separate files.'
    ),
    stack: ['JavaScript'],
    image: { src: '/img/helpincalculus/home.png', alt: L('Tela do HelpInCalculus', 'HelpInCalculus screen') },
    links: [
      { kind: 'live', href: `${PAGES}helpincalculus` },
      { kind: 'repo', href: `${GH}helpincalculus` },
    ],
  },
  {
    slug: 'pitsas',
    kind: 'lab',
    title: 'Pitsás',
    year: '2021',
    status: 'done',
    summary: L(
      'Sistema para uma pizzaria fictícia receber e gerenciar pedidos — meu primeiro full stack em produção.',
      'A system for a fictional pizzeria to receive and manage orders — my first full-stack app in production.'
    ),
    learned: L('Como colocar um sistema full stack em produção e como lidar com MongoDB.', 'How to put a full-stack system in production and how to work with MongoDB.'),
    stack: ['JavaScript', 'MongoDB'],
    image: { src: '/img/pitsas/home.png', alt: L('Tela do Pitsás', 'Pitsás screen') },
    links: [
      { kind: 'live', href: 'https://pitsas.onrender.com' },
      { kind: 'repo', href: `${GH}pitsas` },
    ],
  },
  {
    slug: 'nexum',
    kind: 'lab',
    title: 'Nexum',
    year: '2021',
    status: 'done',
    summary: L('Uma rede social de texto extremamente simples.', 'An extremely simple text-based social network.'),
    learned: L('Back-end — foi o primeiro que eu fiz.', 'Back-end development — it was my first one.'),
    stack: ['Node', 'Pug'],
    links: [{ kind: 'repo', href: `${GH}nexum` }],
  },
  {
    slug: 'sortear-grupos',
    kind: 'lab',
    title: 'Sortear Grupos',
    year: '2021',
    status: 'done',
    summary: L('Site para sortear grupos na escola.', 'A site for drawing groups at school.'),
    learned: L(
      'O algoritmo de embaralhar uma lista. Precisei pesquisar na internet, mas não copiei o código até entender perfeitamente como ele funcionava — lembro até hoje de simular o algoritmo com cartas em uma mesa.',
      'The list-shuffling algorithm. I had to look it up, but I didn’t copy the code until I fully understood how it worked — I still remember simulating it with playing cards on a table.'
    ),
    stack: ['HTML', 'JavaScript'],
    links: [
      { kind: 'live', href: `${PAGES}sortearGrupos` },
      { kind: 'repo', href: `${GH}sortearGrupos` },
    ],
  },
];

export const productionProjects = projects.filter((p) => p.kind === 'production');
export const labProjects = projects.filter((p) => p.kind === 'lab');

// Laboratório na home: seleção curta, o resto fica em /projetos
export const homeLabSlugs = [
  'paper-advisor',
  'ultimato-de-tho-ka',
  'wisdom-dungeon',
  'lab',
  'zolt-summarizer',
  'zynlib',
  'tijolo-girando',
  'pinn',
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export const publications: Publication[] = [
  {
    slug: 'worcap-2026-emmas-librarian',
    event: 'WorCAP 2026 · INPE',
    kind: L('Artigo · pôster', 'Paper · poster'),
    title: "Emma's Librarian: uma ferramenta de apoio à pesquisa integrando inteligência artificial e buscas bibliográficas unificadas",
    authors: 'João P. V. Gonçalves, Aline de Lucas, Ana P. A. C. Shiguemori',
    href: '/publicacoes/worcap-2026-emmas-librarian.pdf',
    thumb: '/img/publicacoes/worcap-2026.png',
    featured: true,
    note: L('Aceito, aguardando DOI', 'Accepted, awaiting DOI'),
    abstract: L(
      "Um projeto de pesquisa envolve buscar literatura, registrar reuniões, gerenciar tarefas e escrever artigos, normalmente com uma ferramenta para cada coisa. O artigo descreve a metodologia de desenvolvimento e os resultados do Emma's Librarian, que reúne essas atividades em uma plataforma única, local e privada.",
      "A research project involves searching the literature, logging meetings, managing tasks and writing papers, usually with a separate tool for each. The paper describes the development methodology and results of Emma's Librarian, which brings these activities together in a single local, private platform."
    ),
  },
  {
    slug: 'cobicet-2026',
    event: 'CoBICET 2026',
    kind: L('Resumo expandido', 'Extended abstract'),
    title: 'Estudo sobre sistemas de recomendação educacional para personalização da aprendizagem na plataforma IFVest',
    authors: 'J. P. V. Gonçalves, A. de Lucas, A. P. A. C. Shiguemori',
    href: 'https://www.even3.com.br/anais/cobicet2026-628540/1607368-estudo-sobre-sistemas-de-recomendacao-educacional-para-personalizacao-da-aprendizagem-na-plataforma-ifvest/',
    thumb: '/img/publicacoes/cobicet-2026.png',
  },
  {
    slug: 'worcap-2025',
    event: 'WorCAP 2025',
    kind: L('Resumo expandido', 'Extended abstract'),
    title: 'Sistema computacional de gerenciamento de materiais didáticos integrado à plataforma IFVest',
    authors: 'J. P. V. Gonçalves, A. D. Lucas, S. P. Gomes',
    href: 'http://mtc-m16c.sid.inpe.br/ibi/8JMKD2USPTW34P/4EGSSPB',
    thumb: '/img/publicacoes/worcap-2025.png',
  },
  {
    slug: 'conict-2025-ifvest',
    event: '16º CONICT 2025',
    kind: L('Artigo', 'Paper'),
    title: 'O desenvolvimento e integração de um módulo de revisão de conteúdo à plataforma IFVest',
    authors: 'J. P. V. Gonçalves, A. de Lucas, S. P. Gomes',
    href: 'https://congressos.ifsp.edu.br/conict/article/view/1378',
    thumb: '/img/publicacoes/conict-2025-ifvest.png',
  },
  {
    slug: 'conict-2025-architect',
    event: '16º CONICT 2025',
    kind: L('Artigo', 'Paper'),
    title: 'O desenvolvimento de uma plataforma de suporte ao ensino de engenharia de software',
    authors: 'J. P. V. Gonçalves, R. E. S. Castanhari',
    href: 'https://congressos.ifsp.edu.br/conict/article/view/1812',
    thumb: '/img/publicacoes/conict-2025-architect.png',
  },
  {
    slug: 'conict-2024-museu',
    event: '15º CONICT 2024',
    kind: L('Artigo', 'Paper'),
    title: 'O desenvolvimento de um sistema computacional para o gerenciamento de um museu de ciência e tecnologia',
    authors: 'J. P. V. Gonçalves, F. B. Rodrigues',
    href: 'https://congressos.ifsp.edu.br/conict/article/view/945',
    thumb: '/img/publicacoes/conict-2024-museu.png',
  },
  {
    slug: 'conict-2024-pinn',
    event: '15º CONICT 2024',
    kind: L('Artigo', 'Paper'),
    title: 'Um jogo educacional de incentivo ao exercício de matemática básica utilizando o ambiente web',
    authors: 'J. P. V. Gonçalves, F. B. Rodrigues',
    href: 'https://congressos.ifsp.edu.br/conict/article/view/231',
    thumb: '/img/publicacoes/conict-2024-pinn.png',
  },
];

export function getPublication(slug: string) {
  return publications.find((p) => p.slug === slug);
}

export const materials: Material[] = [
  {
    format: L('Resumos', 'Notes'),
    title: L('Resumos de Introdução à Programação', 'Intro to Programming notes'),
    audience: L(
      'Escrevi por conta própria, reexplicando cada aula com minhas palavras para a minha turma da faculdade.',
      'Written on my own initiative, re-explaining each class in my own words for my university classmates.'
    ),
    host: 'GitHub',
    href: `${GH}JCRPROG`,
  },
  {
    format: L('Laboratório', 'Lab'),
    title: L('DataLab', 'DataLab'),
    audience: L(
      'Ciência de dados para estudantes — pensado para a disciplina de Mineração de Dados da minha turma, mas cobrindo mais temas.',
      'Data science for students — designed for my class’s Data Mining course, but covering a wider range of topics.'
    ),
    host: 'mastrien.github.io',
    href: 'https://mastrien.github.io/lab/datascience/',
  },
];

const DEV = 'https://dev.to/joaopedrov0/';

export const devtoSeries = {
  title: L('Entendendo o JavaScript', 'Understanding JavaScript'),
  parts: [
    { title: L('#1 Introdução', '#1 Introduction'), href: `${DEV}1-introducao-entendendo-o-javascript-2k1a` },
    { title: L('#2 Variáveis', '#2 Variables'), href: `${DEV}2-variaveis-entendendo-o-javascript-3oc1` },
    { title: L('#3 Tipos de variáveis', '#3 Variable types'), href: `${DEV}3-tipos-de-variaveis-entendendo-o-javascript-2h0f` },
    { title: L('#4 Operadores', '#4 Operators'), href: `${DEV}4-operadores-entendendo-o-javascript-20hm` },
  ],
};

export const devtoPosts: DevToPost[] = [
  { area: L('web', 'web'), title: 'Entendendo o HTML', href: `${DEV}entendendo-o-html-2c36` },
  { area: L('web', 'web'), title: 'Entendendo o CSS', href: `${DEV}entendendo-o-css-47in` },
  { area: L('poo', 'oop'), title: 'Herança', href: `${DEV}heranca-2pna` },
  { area: L('poo', 'oop'), title: 'Polimorfismo', href: `${DEV}polimorfismo-24bi` },
  { area: L('poo', 'oop'), title: 'Diagrama de classes', href: `${DEV}diagrama-de-classes-od3` },
  { area: L('ferramentas', 'tools'), title: 'Git e GitHub', href: `${DEV}git-e-github-2iam` },
  { area: L('algoritmos', 'algorithms'), title: 'Algoritmos de ordenação', href: `${DEV}algoritmos-de-ordenacao-24oo` },
  { area: L('sistemas', 'systems'), title: 'Introdução a sistemas de memória', href: `${DEV}introducao-a-sistemas-de-memoria-25i` },
  { area: L('matemática', 'math'), title: 'Lógica matemática', href: `${DEV}logica-matematica-4153` },
  { area: L('matemática', 'math'), title: 'Conjuntos', href: `${DEV}conjuntos-1pik` },
  { area: L('matemática', 'math'), title: 'Matrizes', href: `${DEV}matrizes-i6a` },
  { area: L('ia', 'ai'), title: 'Softmax com categorical cross-entropy na flor Iris', href: `${DEV}por-que-usar-softmax-com-categorical-cross-entropy-para-o-problema-da-flor-iris-2i6j` },
];

export const profiles = {
  email: 'joaopedrov0.dev@gmail.com',
  github: 'https://github.com/joaopedrov0',
  githubMastrien: 'https://github.com/mastrien',
  linkedin: 'https://www.linkedin.com/in/jo%C3%A3o-pedro-895aa9227/',
  devto: 'https://dev.to/joaopedrov0',
};
