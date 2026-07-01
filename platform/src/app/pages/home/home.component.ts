import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChildren('animTarget') animTargets!: QueryList<ElementRef>;

  constructor(private router: Router) {}

  currentYear = new Date().getFullYear();

  services = [
    {
      id: 'proxipush',
      icon: '📡',
      nameKey: 'SERVICES.PROXIPUSH.NAME',
      shortKey: 'SERVICES.PROXIPUSH.SHORT',
      tagKey: 'SERVICES.PROXIPUSH.TAG',
      color: '#7C6DFA',
      href: '#proxipush'
    },
    {
      id: 'queueflow',
      icon: '🍽️',
      nameKey: 'SERVICES.QUEUEFLOW.NAME',
      shortKey: 'SERVICES.QUEUEFLOW.SHORT',
      tagKey: 'SERVICES.QUEUEFLOW.TAG',
      color: '#FA6D8B',
      href: '#queueflow'
    },
    {
      id: 'webcrafts',
      icon: '🌐',
      nameKey: 'SERVICES.WEBCRAFTS.NAME',
      shortKey: 'SERVICES.WEBCRAFTS.SHORT',
      tagKey: 'SERVICES.WEBCRAFTS.TAG',
      color: '#00E5CC',
      href: '#webcrafts'
    },
    {
      id: 'sysgen',
      icon: '🤖',
      nameKey: 'SERVICES.SYSGEN.NAME',
      shortKey: 'SERVICES.SYSGEN.SHORT',
      tagKey: 'SERVICES.SYSGEN.TAG',
      color: '#FFB347',
      href: '#sysgen'
    },
    {
      id: 'autoflow',
      icon: '⚡',
      nameKey: 'SERVICES.AUTOFLOW.NAME',
      shortKey: 'SERVICES.AUTOFLOW.SHORT',
      tagKey: 'SERVICES.AUTOFLOW.TAG',
      color: '#A855F7',
      href: '#autoflow'
    }
  ];

  stats = [
    { value: '500+', labelKey: 'STATS.CLIENTS' },
    { value: '5',    labelKey: 'STATS.SERVICES' },
    { value: '3',    labelKey: 'STATS.COUNTRIES' },
    { value: '99.9%',labelKey: 'STATS.UPTIME' }
  ];

  proxiFeatures = [
    { icon: '📍', titleKey: 'PROXIPUSH.FEATURES.GEO.TITLE', descKey: 'PROXIPUSH.FEATURES.GEO.DESC' },
    { icon: '✉️', titleKey: 'PROXIPUSH.FEATURES.PERSONALIZED.TITLE', descKey: 'PROXIPUSH.FEATURES.PERSONALIZED.DESC' },
    { icon: '🛠️', titleKey: 'PROXIPUSH.FEATURES.PANEL.TITLE', descKey: 'PROXIPUSH.FEATURES.PANEL.DESC' },
    { icon: '📧', titleKey: 'PROXIPUSH.FEATURES.EMAIL.TITLE', descKey: 'PROXIPUSH.FEATURES.EMAIL.DESC' },
    { icon: '📊', titleKey: 'PROXIPUSH.FEATURES.REALTIME.TITLE', descKey: 'PROXIPUSH.FEATURES.REALTIME.DESC' },
    { icon: '🏢', titleKey: 'PROXIPUSH.FEATURES.MULTISITE.TITLE', descKey: 'PROXIPUSH.FEATURES.MULTISITE.DESC' }
  ];

  queueFeatures = [
    { icon: '📋', titleKey: 'QUEUEFLOW.FEATURES.MENU.TITLE', descKey: 'QUEUEFLOW.FEATURES.MENU.DESC' },
    { icon: '🛒', titleKey: 'QUEUEFLOW.FEATURES.CART.TITLE', descKey: 'QUEUEFLOW.FEATURES.CART.DESC' },
    { icon: '🔢', titleKey: 'QUEUEFLOW.FEATURES.QUEUE.TITLE', descKey: 'QUEUEFLOW.FEATURES.QUEUE.DESC' },
    { icon: '👨‍🍳', titleKey: 'QUEUEFLOW.FEATURES.STAFF.TITLE', descKey: 'QUEUEFLOW.FEATURES.STAFF.DESC' },
    { icon: '🔄', titleKey: 'QUEUEFLOW.FEATURES.REALTIME.TITLE', descKey: 'QUEUEFLOW.FEATURES.REALTIME.DESC' },
    { icon: '💳', titleKey: 'QUEUEFLOW.FEATURES.NOPAY.TITLE', descKey: 'QUEUEFLOW.FEATURES.NOPAY.DESC' }
  ];

  steps = [
    { num: '01', titleKey: 'HOW_IT_WORKS.STEPS.1.TITLE', descKey: 'HOW_IT_WORKS.STEPS.1.DESC', icon: '🚀' },
    { num: '02', titleKey: 'HOW_IT_WORKS.STEPS.2.TITLE', descKey: 'HOW_IT_WORKS.STEPS.2.DESC', icon: '⚙️' },
    { num: '03', titleKey: 'HOW_IT_WORKS.STEPS.3.TITLE', descKey: 'HOW_IT_WORKS.STEPS.3.DESC', icon: '✅' },
    { num: '04', titleKey: 'HOW_IT_WORKS.STEPS.4.TITLE', descKey: 'HOW_IT_WORKS.STEPS.4.DESC', icon: '📈' }
  ];

  techCategories: any[] = [
    {
      icon: '☁️', label: 'Cloud & Seguridad', color: '#7C6DFA', expanded: false,
      items: [
        { logo: 'CF',  name: 'Cloudflare',   sub: 'CDN & Security',   color: '#F6821F' },
        { logo: 'AWS', name: 'AWS',           sub: 'Cloud Computing',  color: '#FF9900' },
        { logo: 'GC',  name: 'Google Cloud',  sub: 'Cloud Platform',   color: '#4285F4' },
        { logo: 'AZ',  name: 'Azure',         sub: 'Microsoft Cloud',  color: '#0078D4' },
        { logo: 'DO',  name: 'DigitalOcean',  sub: 'Cloud Hosting',    color: '#0080FF' },
      ]
    },
    {
      icon: '🏗️', label: 'Frameworks & Lenguajes', color: '#00E5CC', expanded: false,
      items: [
        { logo: 'Ng',  name: 'Angular',        sub: 'Web Framework',   color: '#DD0031' },
        { logo: '⚛',  name: 'React',          sub: 'UI Library',      color: '#61DAFB' },
        { logo: '▲',   name: 'Next.js',        sub: 'Full-stack',      color: '#EEEEEE' },
        { logo: 'Vue', name: 'Vue.js',         sub: 'Web Framework',   color: '#42B883' },
        { logo: 'Nx',  name: 'Nuxt',           sub: 'Vue Framework',   color: '#00DC82' },
        { logo: 'Sv',  name: 'Svelte',         sub: 'UI Framework',    color: '#FF3E00' },
        { logo: 'JS',  name: 'Node.js',        sub: 'Runtime',         color: '#68A063' },
        { logo: 'Ns',  name: 'NestJS',         sub: 'Backend',         color: '#E0234E' },
        { logo: 'Py',  name: 'Python',         sub: 'Backend / AI',    color: '#3776AB' },
        { logo: 'Lv',  name: 'Laravel',        sub: 'PHP Framework',   color: '#FF2D20' },
        { logo: 'Rb',  name: 'Ruby on Rails',  sub: 'Web Framework',   color: '#CC0000' },
        { logo: 'Rs',  name: 'Rust',           sub: 'Systems Lang.',   color: '#CE412B' },
        { logo: 'Kt',  name: 'Kotlin',         sub: 'Mobile / JVM',   color: '#7F52FF' },
      ]
    },
    {
      icon: '🗄️', label: 'BD Relacionales', color: '#FA6D8B', expanded: false,
      items: [
        { logo: 'PG',  name: 'PostgreSQL',   sub: 'RDBMS',            color: '#336791' },
        { logo: 'My',  name: 'MySQL',        sub: 'RDBMS',            color: '#4479A1' },
        { logo: 'MS',  name: 'SQL Server',   sub: 'Microsoft DB',     color: '#CC2927' },
        { logo: 'CR',  name: 'CockroachDB',  sub: 'Distributed SQL',  color: '#6933FF' },
        { logo: 'Sq',  name: 'SQLite',       sub: 'Embedded DB',      color: '#44A8D8' },
        { logo: 'Or',  name: 'Oracle DB',    sub: 'Enterprise DB',    color: '#F80000' },
        { logo: 'PS',  name: 'PlanetScale',  sub: 'Serverless MySQL', color: '#AAAAAA' },
        { logo: 'SB',  name: 'Supabase',     sub: 'PostgreSQL BaaS',  color: '#3ECF8E' },
      ]
    },
    {
      icon: '📦', label: 'BD NoSQL', color: '#FFB347', expanded: false,
      items: [
        { logo: 'Mg',  name: 'MongoDB',      sub: 'Document DB',      color: '#47A248' },
        { logo: 'Rd',  name: 'Redis',        sub: 'In-Memory DB',     color: '#DC382D' },
        { logo: 'Cs',  name: 'Cassandra',    sub: 'Wide-Column',      color: '#1287B1' },
        { logo: 'CB',  name: 'CouchDB',      sub: 'Document DB',      color: '#E42528' },
        { logo: 'Dy',  name: 'DynamoDB',     sub: 'AWS NoSQL',        color: '#FF9900' },
        { logo: 'N4',  name: 'Neo4j',        sub: 'Graph DB',         color: '#008CC1' },
        { logo: 'ES',  name: 'Elasticsearch',sub: 'Search Engine',    color: '#FEC514' },
        { logo: 'IF',  name: 'InfluxDB',     sub: 'Time-Series DB',   color: '#22ADF6' },
        { logo: '🔥',  name: 'Firebase',     sub: 'Google BaaS',      color: '#FFCA28' },
      ]
    },
    {
      icon: '🔗', label: 'APIs, GraphQL & ORM', color: '#A855F7', expanded: false,
      items: [
        { logo: '◆',  name: 'GraphQL',      sub: 'Query Language',   color: '#E10098' },
        { logo: 'Ap', name: 'Apollo',        sub: 'GraphQL Client',   color: '#7B3FE4' },
        { logo: 'RP', name: 'REST API',      sub: 'API Standard',     color: '#00C4B4' },
        { logo: 'tR', name: 'tRPC',          sub: 'Type-safe API',    color: '#398CCB' },
        { logo: 'Pr', name: 'Prisma',        sub: 'ORM',              color: '#5A67D8' },
        { logo: 'Ha', name: 'Hasura',        sub: 'Auto GraphQL',     color: '#1EB4D4' },
        { logo: 'Sw', name: 'Swagger',       sub: 'API Docs',         color: '#85EA2D' },
        { logo: 'gR', name: 'gRPC',          sub: 'RPC Protocol',     color: '#4BACC6' },
      ]
    },
    {
      icon: '🚀', label: 'Hosting & DevOps', color: '#00E5CC', expanded: false,
      items: [
        { logo: '▲',  name: 'Vercel',         sub: 'Edge Hosting',    color: '#EEEEEE' },
        { logo: 'Rn', name: 'Render',         sub: 'Cloud Hosting',   color: '#46E3B7' },
        { logo: 'Rw', name: 'Railway',        sub: 'App Platform',    color: '#5865F2' },
        { logo: 'Nl', name: 'Netlify',        sub: 'Jamstack CDN',    color: '#00C7B7' },
        { logo: 'Hr', name: 'Heroku',         sub: 'PaaS',            color: '#B692F1' },
        { logo: '🐳', name: 'Docker',         sub: 'Containers',      color: '#2496ED' },
        { logo: '☸',  name: 'Kubernetes',     sub: 'Orchestration',   color: '#326CE5' },
        { logo: 'GH', name: 'GitHub Actions', sub: 'CI / CD',         color: '#6E40C9' },
        { logo: 'CP', name: 'CF Pages',       sub: 'Edge Pages',      color: '#F6821F' },
      ]
    }
  ];

  readonly PREVIEW_COUNT = 6;

  getVisible(cat: any) {
    return cat.expanded ? cat.items : cat.items.slice(0, this.PREVIEW_COUNT);
  }

  toggleExpand(cat: any) {
    cat.expanded = !cat.expanded;
  }
  // ── Filas para el marquee infinito ──
  techMarqueeRow1 = [
    { logo: 'CF',  name: 'Cloudflare',    sub: 'CDN & Security',   color: '#F6821F' },
    { logo: 'Ng',  name: 'Angular',       sub: 'Web Framework',    color: '#DD0031' },
    { logo: 'PG',  name: 'PostgreSQL',    sub: 'BD Relacional',    color: '#336791' },
    { logo: '◆',  name: 'GraphQL',       sub: 'Query Language',   color: '#E10098' },
    { logo: '▲',   name: 'Vercel',        sub: 'Edge Hosting',     color: '#EEEEEE' },
    { logo: 'AWS', name: 'AWS',           sub: 'Cloud Computing',  color: '#FF9900' },
    { logo: '⚛',  name: 'React',         sub: 'UI Library',       color: '#61DAFB' },
    { logo: 'Mg',  name: 'MongoDB',       sub: 'Document DB',      color: '#47A248' },
    { logo: 'Pr',  name: 'Prisma',        sub: 'ORM',              color: '#5A67D8' },
    { logo: '🐳',  name: 'Docker',        sub: 'Containers',       color: '#2496ED' },
    { logo: 'GC',  name: 'Google Cloud',  sub: 'Cloud Platform',   color: '#4285F4' },
    { logo: 'Vue', name: 'Vue.js',        sub: 'Web Framework',    color: '#42B883' },
    { logo: 'SB',  name: 'Supabase',      sub: 'PostgreSQL BaaS',  color: '#3ECF8E' },
    { logo: 'Rd',  name: 'Redis',         sub: 'In-Memory DB',     color: '#DC382D' },
    { logo: 'GH',  name: 'GitHub Actions',sub: 'CI / CD',          color: '#6E40C9' },
    { logo: 'AZ',  name: 'Azure',         sub: 'Microsoft Cloud',  color: '#0078D4' },
    { logo: '▲',   name: 'Next.js',       sub: 'Full-stack',       color: '#EEEEEE' },
    { logo: 'Kt',  name: 'Kotlin',        sub: 'Mobile / JVM',    color: '#7F52FF' },
  ];

  techMarqueeRow2 = [
    { logo: 'DO',  name: 'DigitalOcean',  sub: 'Cloud Hosting',    color: '#0080FF' },
    { logo: 'JS',  name: 'Node.js',       sub: 'Runtime',          color: '#68A063' },
    { logo: 'My',  name: 'MySQL',         sub: 'BD Relacional',    color: '#4479A1' },
    { logo: 'Ap',  name: 'Apollo',        sub: 'GraphQL Client',   color: '#7B3FE4' },
    { logo: 'Rn',  name: 'Render',        sub: 'Cloud Hosting',    color: '#46E3B7' },
    { logo: 'Sv',  name: 'Svelte',        sub: 'UI Framework',     color: '#FF3E00' },
    { logo: 'ES',  name: 'Elasticsearch', sub: 'Search Engine',    color: '#FEC514' },
    { logo: 'tR',  name: 'tRPC',          sub: 'Type-safe API',    color: '#398CCB' },
    { logo: '☸',   name: 'Kubernetes',    sub: 'Orchestration',    color: '#326CE5' },
    { logo: 'Ns',  name: 'NestJS',        sub: 'Backend',          color: '#E0234E' },
    { logo: 'N4',  name: 'Neo4j',         sub: 'Graph DB',         color: '#008CC1' },
    { logo: 'Ha',  name: 'Hasura',        sub: 'Auto GraphQL',     color: '#1EB4D4' },
    { logo: 'Rw',  name: 'Railway',       sub: 'App Platform',     color: '#5865F2' },
    { logo: 'Py',  name: 'Python',        sub: 'Backend / AI',     color: '#3776AB' },
    { logo: '🔥',  name: 'Firebase',      sub: 'Google BaaS',      color: '#FFCA28' },
    { logo: 'Nl',  name: 'Netlify',       sub: 'Jamstack CDN',     color: '#00C7B7' },
    { logo: 'Rs',  name: 'Rust',          sub: 'Systems Lang.',    color: '#CE412B' },
    { logo: 'Sw',  name: 'Swagger',       sub: 'API Docs',         color: '#85EA2D' },
  ];

  sysgenPrompt = '';
  sysgenGenerating = false;
  sysgenGenerated = false;
  sysgenLog: string[] = [];
  currentConfig: any = null;
  private streamInterval: any = null;

  // ── Mapa de industrias (palabras clave → configuración de UI) ──
  private industryMap = [
    {
      keywords: ['restaurante','café','bar','cocina','comida','gastro','pizza','hamburguesa','delivery','menú','menu'],
      config: {
        name: 'RestaurantOS', icon: '🍽️', domainColor: '#FA6D8B',
        sidebarItems: [
          { icon: '📊', label: 'Dashboard' }, { icon: '🍽️', label: 'Mesas' },
          { icon: '📋', label: 'Pedidos' }, { icon: '👨‍🍳', label: 'Cocina' },
          { icon: '💰', label: 'Caja' }, { icon: '📈', label: 'Reportes' }
        ],
        stats: [
          { label: 'Mesas activas', value: '8/24' },
          { label: 'Pedidos hoy', value: '87' },
          { label: 'Ticket prom.', value: '$8.490' }
        ],
        activeModule: 'Pedidos'
      }
    },
    {
      keywords: ['clínica','clinica','médico','medico','dental','salud','paciente','cita','hospital'],
      config: {
        name: 'ClinicPro', icon: '🏥', domainColor: '#00E5CC',
        sidebarItems: [
          { icon: '📊', label: 'Dashboard' }, { icon: '👤', label: 'Pacientes' },
          { icon: '📅', label: 'Agenda' }, { icon: '💊', label: 'Recetas' },
          { icon: '💳', label: 'Pagos' }, { icon: '📈', label: 'Reportes' }
        ],
        stats: [
          { label: 'Pacientes', value: '142' },
          { label: 'Citas hoy', value: '18' },
          { label: 'Atendidos', value: '94%' }
        ],
        activeModule: 'Agenda'
      }
    },
    {
      keywords: ['tienda','retail','inventario','stock','producto','venta','almacén'],
      config: {
        name: 'RetailERP', icon: '🛍️', domainColor: '#FFB347',
        sidebarItems: [
          { icon: '📊', label: 'Dashboard' }, { icon: '🛍️', label: 'Ventas' },
          { icon: '📦', label: 'Inventario' }, { icon: '👥', label: 'Clientes' },
          { icon: '💳', label: 'Pagos' }, { icon: '📈', label: 'Reportes' }
        ],
        stats: [
          { label: 'Ventas hoy', value: '89' },
          { label: 'Stock total', value: '2.341' },
          { label: 'Ingresos', value: '$2.1M' }
        ],
        activeModule: 'Inventario'
      }
    },
    {
      keywords: ['hotel','hospedaje','habitación','reserva','check-in','alojamiento','hostal'],
      config: {
        name: 'HotelMS', icon: '🏨', domainColor: '#7C6DFA',
        sidebarItems: [
          { icon: '📊', label: 'Dashboard' }, { icon: '🏨', label: 'Reservas' },
          { icon: '🛏️', label: 'Habitaciones' }, { icon: '🔑', label: 'Check-in' },
          { icon: '💳', label: 'Facturación' }, { icon: '📈', label: 'Reportes' }
        ],
        stats: [
          { label: 'Ocupación', value: '86%' },
          { label: 'Check-in hoy', value: '3' },
          { label: 'RevPAR', value: '$42k' }
        ],
        activeModule: 'Reservas'
      }
    },
    {
      keywords: ['peluquería','peluqueria','spa','salón','barbería','estética','belleza'],
      config: {
        name: 'BeautySuite', icon: '💇', domainColor: '#FA6D8B',
        sidebarItems: [
          { icon: '📊', label: 'Dashboard' }, { icon: '📅', label: 'Agenda' },
          { icon: '👥', label: 'Clientes' }, { icon: '✂️', label: 'Servicios' },
          { icon: '💳', label: 'Pagos' }, { icon: '📈', label: 'Reportes' }
        ],
        stats: [
          { label: 'Citas hoy', value: '12' },
          { label: 'Clientes', value: '387' },
          { label: 'Ticket prom.', value: '$18.5k' }
        ],
        activeModule: 'Agenda'
      }
    }
  ];

  private defaultConfig = {
    name: 'BusinessCRM', icon: '📊', domainColor: '#7C6DFA',
    sidebarItems: [
      { icon: '📊', label: 'Dashboard' }, { icon: '👥', label: 'Contactos' },
      { icon: '📈', label: 'Pipeline' }, { icon: '📧', label: 'Campañas' },
      { icon: '📅', label: 'Calendario' }, { icon: '⚙️', label: 'Config.' }
    ],
    stats: [
      { label: 'Leads activos', value: '247' },
      { label: 'Conversión', value: '34%' },
      { label: 'Pipeline', value: '$2.4M' }
    ],
    activeModule: 'Dashboard'
  };

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initScrollAnimations();
  }

  initScrollAnimations(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.anim-hidden').forEach((el) => {
      observer.observe(el);
    });
  }

  // ── Detectar industria a partir del prompt ──
  private detectIndustry(prompt: string): any {
    const lower = prompt.toLowerCase();
    for (const entry of this.industryMap) {
      if (entry.keywords.some(kw => lower.includes(kw))) {
        return entry.config;
      }
    }
    return this.defaultConfig;
  }

  // ── Generar preview con stream animado (100% local, 0 API calls) ──
  generatePreview(): void {
    if (!this.sysgenPrompt.trim()) return;
    this.sysgenGenerating = true;
    this.sysgenGenerated = false;
    this.sysgenLog = [];
    this.currentConfig = null;
    if (this.streamInterval) clearInterval(this.streamInterval);

    const config = this.detectIndustry(this.sysgenPrompt);
    const logSteps = [
      '🔍 Analizando prompt del cliente...',
      `🏷️ Industria detectada: ${config.icon} ${config.name}`,
      '🧩 Definiendo módulos del sistema...',
      `📐 Construyendo layout "${config.name}"...`,
      '✅ Vista previa lista'
    ];

    let i = 0;
    this.streamInterval = setInterval(() => {
      if (i < logSteps.length) {
        this.sysgenLog = [...this.sysgenLog, logSteps[i]];
        if (i === 3) { this.currentConfig = config; } // mostrar preview al paso 4
        i++;
      } else {
        clearInterval(this.streamInterval);
        this.sysgenGenerating = false;
        this.sysgenGenerated = true;
      }
    }, 480);
  }

  // ── Navegar al demo de un producto (con login gate) ──
  goToDemo(product: string): void {
    this.router.navigate(['/login'], { queryParams: { product } });
  }
}
