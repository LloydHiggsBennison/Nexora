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

  // ── Inicializar GIS con soporte de traducción dinámica (hl) ──
  initGoogle(callback?: (user: AuthUser) => void): void {
    const savedLang = localStorage.getItem('app_lang') || 'es-CL';
    const langCode = savedLang === 'en' ? 'en' : 'es';
    const expectedSrcBase = 'https://accounts.google.com/gsi/client';
    const expectedSrc = `${expectedSrcBase}?hl=${langCode}`;

    // 1. Verificar si el script ya existe en el DOM
    const scriptId = 'google-gis-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (script) {
      const currentSrc = script.src;
      // Si el script actual no tiene el idioma esperado en su URL, limpiar y forzar recarga
      if (!currentSrc.includes(`hl=${langCode}`)) {
        this.cleanGoogleIdentityServices();
        script = null as any;
      }
    }

    if (!script) {
      // Inyectar el script con la query param hl y timestamp de cache-busting
      script = document.createElement('script');
      script.id = scriptId;
      script.src = `${expectedSrcBase}?hl=${langCode}&ts=${new Date().getTime()}`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    // 2. Esperar a que el script del SDK esté disponible
    if (typeof google === 'undefined') {
      setTimeout(() => this.initGoogle(callback), 100);
      return;
    }

    // 3. Inicializar GIS
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

  // ── Limpieza agresiva de residuos del SDK de Google Identity Services ──
  private cleanGoogleIdentityServices(): void {
    // 1. Eliminar script del DOM
    const script = document.getElementById('google-gis-script');
    if (script) {
      script.remove();
    }

    // 2. Eliminar objeto global en window
    if (typeof (window as any).google !== 'undefined') {
      delete (window as any).google;
    }

    // 3. Eliminar todos los iframes de Google ( One Tap, canal de mensajes, etc. )
    const googleIframes = document.querySelectorAll('iframe');
    googleIframes.forEach(iframe => {
      const src = iframe.src || '';
      if (src.includes('accounts.google.com') || src.includes('gsi')) {
        iframe.remove();
      }
    });

    // 4. Eliminar divs contenedores inyectados al final del body por Google
    const googleDivs = document.querySelectorAll('div');
    googleDivs.forEach(div => {
      const id = div.id || '';
      const className = div.className || '';
      if (
        id.includes('google') || id.includes('gsi') || id.includes('credential_picker') ||
        className.includes('google') || className.includes('gsi')
      ) {
        // No eliminar nuestros propios contenedores de login
        if (id !== 'google-btn-container' && id !== 'google-btn-container-reg') {
          div.remove();
        }
      }
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

    // Vaciar el contenedor para remover el iframe del idioma anterior
    el.innerHTML = '';

    // Detectar idioma actual desde localStorage
    const savedLang = localStorage.getItem('app_lang') || 'es-CL';
    const localeVal = savedLang === 'en' ? 'en' : 'es';

    google.accounts.id.renderButton(el, {
      theme: 'filled_black',
      size: 'large',
      shape: 'rectangular',
      width: el.offsetWidth || 400,
      text: 'continue_with',
      logo_alignment: 'left',
      locale: localeVal,
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
