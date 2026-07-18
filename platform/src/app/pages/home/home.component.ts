import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { CalendarService } from '../../services/calendar.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChildren('animTarget') animTargets!: QueryList<ElementRef>;

  constructor(
    private calendarService: CalendarService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  currentYear = new Date().getFullYear();

  services = [
    {
      id: 'nexcore',
      icon: '💼',
      name: 'NexCore',
      shortDesc: 'CRM/ERP empresarial',
      tag: 'Gestión',
      color: '#7C6DFA',
      href: '#nexcore'
    },
    {
      id: 'nexbi',
      icon: '📊',
      name: 'NexBI',
      shortDesc: 'Inteligencia de negocios',
      tag: 'Analítica',
      color: '#FA6D8B',
      href: '#nexbi'
    },
    {
      id: 'nexpulse',
      icon: '📡',
      name: 'NexPulse',
      shortDesc: 'Marketing de proximidad',
      tag: 'Marketing',
      color: '#00E5CC',
      href: '#nexpulse'
    },
    {
      id: 'nexsite',
      icon: '🌐',
      name: 'NexSite',
      shortDesc: 'Desarrollo web y automatización',
      tag: 'Desarrollo & Automatización',
      color: '#FFB347',
      href: '#nexsite'
    },
    {
      id: 'nexorder',
      icon: '🛎️',
      name: 'NexOrder',
      shortDesc: 'Gestión de pedidos',
      tag: 'Operaciones',
      color: '#A855F7',
      href: '#nexorder'
    },
    {
      id: 'nexqueue',
      icon: '🔢',
      name: 'NexQueue',
      shortDesc: 'Cola de atención en tiempo real',
      tag: 'Atención',
      color: '#FF5722',
      href: '#nexqueue'
    }
  ];

  stats = [
    { value: '500+', labelKey: 'STATS.CLIENTS' },
    { value: '6',    labelKey: 'STATS.SERVICES' },
    { value: '3',    labelKey: 'STATS.COUNTRIES' },
    { value: '99.9%',labelKey: 'STATS.UPTIME' }
  ];

  

  

  

  

  

  steps = [
    { num: '01', titleKey: 'HOW_IT_WORKS.STEPS.1.TITLE', descKey: 'HOW_IT_WORKS.STEPS.1.DESC', icon: '📞' },
    { num: '02', titleKey: 'HOW_IT_WORKS.STEPS.2.TITLE', descKey: 'HOW_IT_WORKS.STEPS.2.DESC', icon: '🔍' },
    { num: '03', titleKey: 'HOW_IT_WORKS.STEPS.3.TITLE', descKey: 'HOW_IT_WORKS.STEPS.3.DESC', icon: '🚀' },
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

  // ── Scheduler State ──
  schedulerOpen = false;
  schedulerProduct = '';
  schedulerStep: 'form' | 'success' | 'error' = 'form';
  schedulerDate = '';
  schedulerTime = '';
  schedulerEmail = '';
  schedulerConfirming = false;
  schedulerMinDate = '';
  schedulerMaxDate = '';
  schedulerError = '';
  meetLink = '';
  meetLinkLoading = false;

  availableSlots: string[] = [];

  // ── Team members (About Us) ──
  teamMembers = [
    { nameKey: 'ABOUT_US.TEAM.1.NAME', roleKey: 'ABOUT_US.TEAM.1.ROLE', badgeKey: 'ABOUT_US.TEAM.1.BADGE', descKey: 'ABOUT_US.TEAM.1.DESC', initials: 'LH', color: '#7C6DFA', linkedin: 'https://www.linkedin.com/in/lloyd-higgs-bennison/' },
    { nameKey: 'ABOUT_US.TEAM.2.NAME', roleKey: 'ABOUT_US.TEAM.2.ROLE', badgeKey: 'ABOUT_US.TEAM.2.BADGE', descKey: 'ABOUT_US.TEAM.2.DESC', initials: 'SB', color: '#FA6D8B', linkedin: '' },
    { nameKey: 'ABOUT_US.TEAM.3.NAME', roleKey: 'ABOUT_US.TEAM.3.ROLE', badgeKey: 'ABOUT_US.TEAM.3.BADGE', descKey: 'ABOUT_US.TEAM.3.DESC', initials: 'ET', color: '#00E5CC', linkedin: '' },
    { nameKey: 'ABOUT_US.TEAM.4.NAME', roleKey: 'ABOUT_US.TEAM.4.ROLE', badgeKey: 'ABOUT_US.TEAM.4.BADGE', descKey: 'ABOUT_US.TEAM.4.DESC', initials: 'JA', color: '#FFB347', linkedin: '' }
  ];

  ngOnInit(): void {
    // Set min/max dates for scheduler
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.schedulerMinDate = this.formatDateForInput(tomorrow);
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 60);
    this.schedulerMaxDate = this.formatDateForInput(maxDate);
  }

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

  // ── Scheduler Methods ──
  openScheduler(product: string): void {
    this.schedulerProduct = product;
    this.schedulerStep = 'form';
    this.schedulerDate = '';
    this.schedulerTime = '';
    this.schedulerEmail = '';
    this.schedulerConfirming = false;
    this.schedulerError = '';
    this.availableSlots = [];
    this.schedulerOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeScheduler(): void {
    this.schedulerOpen = false;
    document.body.style.overflow = '';
  }

  onDateChange(): void {
    if (!this.schedulerDate) {
      this.availableSlots = [];
      return;
    }
    const selected = new Date(this.schedulerDate + 'T12:00:00');
    const day = selected.getDay(); // 0=Sun, 6=Sat
    if (day === 0 || day === 6) {
      this.availableSlots = [];
      return;
    }
    // Generate 30-min slots from 9:00 to 17:30 (Mon-Fri)
    this.availableSlots = [];
    for (let h = 9; h < 18; h++) {
      this.availableSlots.push(`${h.toString().padStart(2, '0')}:00`);
      if (h < 17 || (h === 17 && true)) {
        if (h < 17) {
          this.availableSlots.push(`${h.toString().padStart(2, '0')}:30`);
        }
      }
    }
    // Simulate some busy slots (random for demo)
    const busyCount = Math.floor(Math.random() * 4) + 2;
    for (let i = 0; i < busyCount; i++) {
      const idx = Math.floor(Math.random() * this.availableSlots.length);
      this.availableSlots.splice(idx, 1);
    }
    this.schedulerTime = '';
  }

  selectTime(slot: string): void {
    this.schedulerTime = slot;
  }

  async confirmBooking(): Promise<void> {
    if (!this.schedulerDate || !this.schedulerTime || !this.schedulerEmail) return;
    
    // Mostramos estado de carga
    this.schedulerConfirming = true;
    this.schedulerError = '';
    this.meetLink = '';
    this.meetLinkLoading = true;

    try {
      // 1. Mostrar pantalla de éxito optimista con estado "Generando enlace..."
      this.schedulerStep = 'success';
      this.schedulerConfirming = false;

      // 2. Llamar al Backend en segundo plano
      const result = await this.calendarService.createMeeting({
        date: this.schedulerDate,
        time: this.schedulerTime,
        email: this.schedulerEmail,
        service: this.schedulerProduct
      });

      this.meetLinkLoading = false;

      if (result && result.meetLink) {
        this.meetLink = result.meetLink;
      } else {
        throw new Error(result?.error || 'No se pudo generar el enlace');
      }

      // Forzar a Angular a actualizar la interfaz inmediatamente
      this.cdr.detectChanges();

    } catch (error: any) {
      console.error('[Frontend] Error agendando:', error);
      this.schedulerConfirming = false;
      this.meetLinkLoading = false;
      this.schedulerError = error.message || 'Error al agendar la reunión';
      
      // Si falla después de haber mostrado la pantalla success, regresamos a error
      this.schedulerStep = 'error';
      this.meetLink = '';
      
      this.cdr.detectChanges();
    }
  }

  getProductName(id: string): string {
    const svc = this.services.find(s => s.id === id);
    return svc ? svc.name : 'Nexora Suite';
  }

  private formatDateForInput(d: Date): string {
    const y = d.getFullYear();
    const m = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
}
