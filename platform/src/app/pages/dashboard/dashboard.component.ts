import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

// ============================================================
// DASHBOARD — Panel de demos con tokens freemium
// ============================================================

interface ProductDemo {
  id: string;
  icon: string;
  name: string;
  tagline: string;
  color: string;
  description: string;
}

interface IndustryConfig {
  name: string;
  icon: string;
  sidebarItems: { icon: string; label: string }[];
  stats: { label: string; value: string; sub?: string }[];
  activeModule: string;
  domainColor: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // ── Producto activo seleccionado ──
  activeProduct: string = 'sysgen';

  // ── Tokens (simulados) ──
  totalTokens = 500;
  usedTokens = 0;
  get remainingTokens() { return this.totalTokens - this.usedTokens; }
  get tokenPercent() { return (this.usedTokens / this.totalTokens) * 100; }

  // ── Estado del modal de preview SysGen ──
  sysgenPrompt = '';
  sysgenGenerating = false;
  sysgenGenerated = false;
  sysgenLog: string[] = [];
  currentConfig: IndustryConfig | null = null;
  streamStep = 0;
  private streamInterval: any = null;

  // ── Catálogo de productos ──
  products: ProductDemo[] = [
    {
      id: 'sysgen',
      icon: '🤖',
      name: 'SysGen IA',
      tagline: 'CRM/ERP generado por IA',
      color: '#FFB347',
      description: 'Describe tu negocio y genera una vista de tu sistema de gestión personalizado.'
    },
    {
      id: 'proxipush',
      icon: '📡',
      name: 'ProxiPush',
      tagline: 'Marketing de proximidad',
      color: '#7C6DFA',
      description: 'Envía notificaciones push geolocalizadas a clientes cerca de tu negocio.'
    },
    {
      id: 'queueflow',
      icon: '🍽️',
      name: 'QueueFlow',
      tagline: 'Gestión de pedidos y mesas',
      color: '#FA6D8B',
      description: 'Carta digital, gestión de pedidos en tiempo real y control de mesas.'
    },
    {
      id: 'webcrafts',
      icon: '🌐',
      name: 'WebCrafts',
      tagline: 'Sitios web premium',
      color: '#00E5CC',
      description: 'Desarrollo de sitios web modernos, SEO optimizados y mobile-first.'
    },
    {
      id: 'autoflow',
      icon: '⚡',
      name: 'AutoFlow',
      tagline: 'Automatización inteligente',
      color: '#A855F7',
      description: 'Automatiza procesos, conecta sistemas e integra chatbots IA.'
    }
  ];

  // ── Ejemplos de prompts rápidos ──
  quickPrompts = [
    '🍔 Sistema para restaurante con carta digital y pedidos',
    '🏥 CRM para clínica dental con agenda de citas',
    '🛍️ ERP para tienda retail con inventario',
    '🏨 Sistema de reservas para hotel boutique',
    '💇 Gestión de agenda para peluquería o spa'
  ];

  // ── Configuraciones por industria ──
  private industryMap: { keywords: string[]; config: IndustryConfig }[] = [
    {
      keywords: ['restaurante','café','bar','cocina','comida','gastro','pizza','hamburguesa','sushi','menú','menu','delivery'],
      config: {
        name: 'RestaurantOS',
        icon: '🍽️',
        domainColor: '#FA6D8B',
        sidebarItems: [
          { icon: '📊', label: 'Dashboard' },
          { icon: '🍽️', label: 'Mesas' },
          { icon: '📋', label: 'Pedidos' },
          { icon: '👨‍🍳', label: 'Cocina' },
          { icon: '💰', label: 'Caja' },
          { icon: '📦', label: 'Inventario' },
          { icon: '📈', label: 'Reportes' }
        ],
        stats: [
          { label: 'Mesas activas', value: '8/24', sub: '67% ocupación' },
          { label: 'Pedidos hoy', value: '87', sub: '+12% vs ayer' },
          { label: 'Ticket prom.', value: '$8.490', sub: 'CLP' }
        ],
        activeModule: 'Pedidos'
      }
    },
    {
      keywords: ['clínica','clinica','médico','medico','dental','salud','paciente','cita','doctor','hospital','consulta'],
      config: {
        name: 'ClinicPro',
        icon: '🏥',
        domainColor: '#00E5CC',
        sidebarItems: [
          { icon: '📊', label: 'Dashboard' },
          { icon: '👤', label: 'Pacientes' },
          { icon: '📅', label: 'Agenda' },
          { icon: '💊', label: 'Recetas' },
          { icon: '💳', label: 'Pagos' },
          { icon: '📋', label: 'Historial' },
          { icon: '📈', label: 'Reportes' }
        ],
        stats: [
          { label: 'Pacientes', value: '142', sub: 'registrados' },
          { label: 'Citas hoy', value: '18', sub: '3 pendientes' },
          { label: 'Atendidos', value: '94%', sub: 'tasa de asist.' }
        ],
        activeModule: 'Agenda'
      }
    },
    {
      keywords: ['tienda','retail','inventario','stock','producto','venta','ecommerce','e-commerce','almacén','almacen'],
      config: {
        name: 'RetailERP',
        icon: '🛍️',
        domainColor: '#FFB347',
        sidebarItems: [
          { icon: '📊', label: 'Dashboard' },
          { icon: '🛍️', label: 'Ventas' },
          { icon: '📦', label: 'Inventario' },
          { icon: '👥', label: 'Clientes' },
          { icon: '🔁', label: 'Proveedores' },
          { icon: '💳', label: 'Pagos' },
          { icon: '📈', label: 'Reportes' }
        ],
        stats: [
          { label: 'Ventas hoy', value: '89', sub: 'transacciones' },
          { label: 'Stock total', value: '2.341', sub: 'artículos' },
          { label: 'Ingresos', value: '$2.1M', sub: 'este mes' }
        ],
        activeModule: 'Inventario'
      }
    },
    {
      keywords: ['hotel','hospedaje','habitación','habitacion','reserva','check-in','checkout','alojamiento','hostal','motel'],
      config: {
        name: 'HotelMS',
        icon: '🏨',
        domainColor: '#7C6DFA',
        sidebarItems: [
          { icon: '📊', label: 'Dashboard' },
          { icon: '🏨', label: 'Reservas' },
          { icon: '🛏️', label: 'Habitaciones' },
          { icon: '🔑', label: 'Check-in' },
          { icon: '🍽️', label: 'Room Service' },
          { icon: '💳', label: 'Facturación' },
          { icon: '📈', label: 'Reportes' }
        ],
        stats: [
          { label: 'Ocupación', value: '86%', sub: '24/28 hab.' },
          { label: 'Check-in hoy', value: '3', sub: 'pendientes' },
          { label: 'RevPAR', value: '$42.000', sub: 'CLP/noche' }
        ],
        activeModule: 'Reservas'
      }
    },
    {
      keywords: ['peluquería','peluqueria','spa','salón','salon','barbería','barberia','estética','estetica','belleza','masaje'],
      config: {
        name: 'BeautySuite',
        icon: '💇',
        domainColor: '#FA6D8B',
        sidebarItems: [
          { icon: '📊', label: 'Dashboard' },
          { icon: '📅', label: 'Agenda' },
          { icon: '👥', label: 'Clientes' },
          { icon: '✂️', label: 'Servicios' },
          { icon: '💳', label: 'Pagos' },
          { icon: '🎁', label: 'Fidelidad' },
          { icon: '📈', label: 'Reportes' }
        ],
        stats: [
          { label: 'Citas hoy', value: '12', sub: '2 disponibles' },
          { label: 'Clientes', value: '387', sub: 'activos' },
          { label: 'Ticket prom.', value: '$18.500', sub: 'CLP' }
        ],
        activeModule: 'Agenda'
      }
    }
  ];

  private defaultConfig: IndustryConfig = {
    name: 'BusinessCRM',
    icon: '📊',
    domainColor: '#7C6DFA',
    sidebarItems: [
      { icon: '📊', label: 'Dashboard' },
      { icon: '👥', label: 'Contactos' },
      { icon: '📈', label: 'Pipeline' },
      { icon: '📧', label: 'Campañas' },
      { icon: '📅', label: 'Calendario' },
      { icon: '📋', label: 'Tareas' },
      { icon: '⚙️', label: 'Config.' }
    ],
    stats: [
      { label: 'Leads activos', value: '247', sub: '+8 esta semana' },
      { label: 'Conversión', value: '34%', sub: 'del pipeline' },
      { label: 'Pipeline', value: '$2.4M', sub: 'proyectado' }
    ],
    activeModule: 'Dashboard'
  };

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Leer producto de los query params
    this.route.queryParams.subscribe(params => {
      if (params['product']) {
        const exists = this.products.find(p => p.id === params['product']);
        if (exists) this.activeProduct = params['product'];
      }
    });
  }

  // ── Seleccionar producto ──
  selectProduct(id: string): void {
    this.activeProduct = id;
    if (id !== 'sysgen') {
      this.sysgenGenerated = false;
      this.sysgenPrompt = '';
      this.sysgenLog = [];
    }
  }

  // ── Usar prompt rápido ──
  useQuickPrompt(prompt: string): void {
    this.sysgenPrompt = prompt.replace(/^[^\s]+\s/, '');
  }

  // ── Detectar industria a partir del prompt ──
  detectIndustry(prompt: string): IndustryConfig {
    const lower = prompt.toLowerCase();
    for (const entry of this.industryMap) {
      if (entry.keywords.some(kw => lower.includes(kw))) {
        return entry.config;
      }
    }
    return this.defaultConfig;
  }

  // ── Generar preview con streaming animado ──
  generatePreview(): void {
    if (!this.sysgenPrompt.trim() || this.remainingTokens <= 0) return;

    this.sysgenGenerating = true;
    this.sysgenGenerated = false;
    this.sysgenLog = [];
    this.streamStep = 0;
    this.currentConfig = null;

    const config = this.detectIndustry(this.sysgenPrompt);
    const tokensUsed = Math.floor(150 + Math.random() * 100);

    const logSteps = [
      '🔍 Analizando prompt del cliente...',
      `🏷️ Industria detectada: ${config.icon} ${config.name}`,
      '🧩 Definiendo módulos del sistema...',
      `📐 Construyendo layout "${config.name}"...`,
      '📊 Calculando métricas de demo...',
      '✅ Vista previa lista'
    ];

    let i = 0;
    this.streamInterval = setInterval(() => {
      if (i < logSteps.length) {
        this.sysgenLog = [...this.sysgenLog, logSteps[i]];
        i++;

        // Revelar el preview en el paso 4
        if (i === 4) {
          this.currentConfig = config;
        }
      } else {
        clearInterval(this.streamInterval);
        this.sysgenGenerating = false;
        this.sysgenGenerated = true;
        this.usedTokens = Math.min(this.totalTokens, this.usedTokens + tokensUsed);
      }
    }, 500);
  }

  // ── Limpiar preview ──
  resetPreview(): void {
    if (this.streamInterval) clearInterval(this.streamInterval);
    this.sysgenGenerating = false;
    this.sysgenGenerated = false;
    this.sysgenPrompt = '';
    this.sysgenLog = [];
    this.currentConfig = null;
    this.streamStep = 0;
  }

  // ── Cerrar sesión / volver al home ──
  logout(): void {
    this.router.navigate(['/']);
  }
}
