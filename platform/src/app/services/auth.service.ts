import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';

// ── Tipo de usuario autenticado ──
export interface AuthUser {
  name: string;
  givenName: string;
  familyName: string;
  email: string;
  picture: string;
  sub: string; // Google user ID
}

// ── Tipado del objeto global de GIS ──
declare const google: any;

@Injectable({ providedIn: 'root' })
export class AuthService {

  // ══════════════════════════════════════════
  // IMPORTANTE: Reemplaza este valor con tu
  // Google Client ID desde:
  // console.cloud.google.com → APIs & Services → Credentials
  // ══════════════════════════════════════════
  private readonly CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';

  private readonly STORAGE_KEY = 'da_auth_user';

  // ── Estado reactivo ──
  currentUser = signal<AuthUser | null>(this.loadFromStorage());
  isLoggedIn  = computed(() => this.currentUser() !== null);

  constructor(private router: Router) {}

  // ── Inicializar GIS (llamar desde AppComponent o LoginComponent) ──
  initGoogle(callback?: (user: AuthUser) => void): void {
    if (typeof google === 'undefined') {
      // GIS no cargó aún — reintenta en 500ms
      setTimeout(() => this.initGoogle(callback), 500);
      return;
    }

    google.accounts.id.initialize({
      client_id: this.CLIENT_ID,
      callback: (response: any) => {
        const user = this.decodeJwt(response.credential);
        this.setUser(user);
        if (callback) callback(user);
      },
      auto_select: false,
      cancel_on_tap_outside: true,
    });
  }

  // ── Mostrar popup de Google One Tap ──
  promptOneTap(): void {
    if (typeof google !== 'undefined') {
      google.accounts.id.prompt();
    }
  }

  // ── Renderizar botón de Google en un elemento ──
  renderButton(elementId: string): void {
    if (typeof google === 'undefined') {
      setTimeout(() => this.renderButton(elementId), 500);
      return;
    }
    const el = document.getElementById(elementId);
    if (!el) return;

    google.accounts.id.renderButton(el, {
      theme: 'filled_black',
      size: 'large',
      shape: 'rectangular',
      width: el.offsetWidth || 400,
      text: 'continue_with',
      logo_alignment: 'left',
    });
  }

  // ── Cerrar sesión ──
  logout(): void {
    if (typeof google !== 'undefined') {
      google.accounts.id.disableAutoSelect();
    }
    this.currentUser.set(null);
    localStorage.removeItem(this.STORAGE_KEY);
    this.router.navigate(['/']);
  }

  // ── Helpers privados ──
  private setUser(user: AuthUser): void {
    this.currentUser.set(user);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
  }

  private loadFromStorage(): AuthUser | null {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  // Decodifica el JWT de Google (solo payload, sin validación — solo para UI)
  private decodeJwt(token: string): AuthUser {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      name:       payload.name,
      givenName:  payload.given_name,
      familyName: payload.family_name,
      email:      payload.email,
      picture:    payload.picture,
      sub:        payload.sub,
    };
  }
}
