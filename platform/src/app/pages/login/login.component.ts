import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

// ============================================================
// LOGIN PAGE — Acceso y registro al Panel Demo
// ============================================================
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

  private langChangeSub!: Subscription;

  // ── Estado de tabs ──
  activeTab: 'login' | 'register' = 'login';

  // ── Producto de origen (para redirigir al demo correcto) ──
  targetProduct: string | null = null;

  // ── Formulario de login ──
  loginForm = { email: '', password: '' };

  // ── Formulario de registro ──
  registerForm = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    aceptaTerminos: false
  };

  // ── Estados de UI ──
  loginLoading  = false;
  registerLoading = false;
  loginError    = '';
  registerError = '';

  // ── Validación de registro ──
  get registerValid(): boolean {
    const f = this.registerForm;
    return !!(f.nombre.trim() && f.apellido.trim() && f.email.trim() &&
              f.telefono.trim() && f.aceptaTerminos);
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    // Si ya está logueado, ir directo al dashboard
    if (this.auth.isLoggedIn()) {
      this.navigateToDashboard();
      return;
    }

    // Capturar el producto de origen desde query params
    this.route.queryParams.subscribe(params => {
      this.targetProduct = params['product'] || null;
    });

    // Inicializar GIS con callback de éxito
    this.auth.initGoogle(() => {
      this.navigateToDashboard();
    });

    // Escuchar cambios de idioma para recargar y re-renderizar el botón de Google en caliente con limpieza profunda
    this.langChangeSub = this.translate.onLangChange.subscribe(() => {
      this.auth.initGoogle(() => {
        this.navigateToDashboard();
      });
      setTimeout(() => {
        const containerId = this.activeTab === 'login' ? 'google-btn-container' : 'google-btn-container-reg';
        this.auth.renderButton(containerId);
      }, 300);
    });

    // Animar entrada del card
    setTimeout(() => {
      const card = document.querySelector('.login-card');
      card?.classList.add('visible');
    }, 50);
  }

  ngAfterViewInit(): void {
    // Renderizar el botón oficial de Google en el contenedor reservado
    this.auth.renderButton('google-btn-container');
  }

  ngOnDestroy(): void {
    // Evitar fugas de memoria cancelando la suscripción
    if (this.langChangeSub) {
      this.langChangeSub.unsubscribe();
    }
  }

  // ── Cambiar tab activo ──
  setTab(tab: 'login' | 'register'): void {
    this.activeTab = tab;
    this.loginError = '';
    this.registerError = '';
    // Re-renderizar el botón en el contenedor correcto
    const containerId = tab === 'login' ? 'google-btn-container' : 'google-btn-container-reg';
    setTimeout(() => this.auth.renderButton(containerId), 50);
  }

  // ── Login con email/contraseña (simulado — reemplazar con tu backend) ──
  submitLogin(): void {
    if (!this.loginForm.email || !this.loginForm.password) {
      this.loginError = this.translate.instant('LOGIN.ERR_FIELDS');
      return;
    }
    this.loginLoading = true;
    this.loginError = '';
    // TODO: conectar con tu backend de autenticación
    setTimeout(() => {
      this.loginLoading = false;
      this.navigateToDashboard();
    }, 1000);
  }

  // ── Registro de cuenta (simulado — reemplazar con tu backend) ──
  submitRegister(): void {
    if (!this.registerValid) {
      this.registerError = this.translate.instant('LOGIN.ERR_TERMS');
      return;
    }
    this.registerLoading = true;
    this.registerError = '';
    // TODO: conectar con tu backend de registro
    setTimeout(() => {
      this.registerLoading = false;
      this.navigateToDashboard();
    }, 1400);
  }

  // ── Navegar al dashboard con el producto seleccionado ──
  navigateToDashboard(): void {
    const queryParams = this.targetProduct ? { product: this.targetProduct } : {};
    this.router.navigate(['/dashboard'], { queryParams });
  }

  // ── Volver al inicio ──
  goHome(): void {
    this.router.navigate(['/']);
  }
}
