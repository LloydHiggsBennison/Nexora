import { Component, HostListener, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../app/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule],
  template: `
    <nav class="navbar" [class.scrolled]="isScrolled()">
      <div class="navbar__inner">
        <!-- Logo -->
        <div class="navbar__logo">
          <div class="logo-mark">
            <span class="logo-icon">⬡</span>
          </div>
          <span class="logo-text">
            <span class="logo-text--main">Nex</span>
            <span class="logo-text--accent">ora</span>
          </span>
        </div>

        <!-- Nav Links (Desktop) -->
        <div class="navbar__links" [class.is-open]="menuOpen()">
          <a class="navbar__link" [routerLink]="['/']" fragment="services" (click)="closeMenu()">
            {{ 'NAV.SERVICES' | translate }}
          </a>
          <a class="navbar__link" [routerLink]="['/']" fragment="proxipush" (click)="closeMenu()">
            {{ 'NAV.PROXIPUSH' | translate }}
          </a>
          <a class="navbar__link" [routerLink]="['/']" fragment="queueflow" (click)="closeMenu()">
            {{ 'NAV.QUEUEFLOW' | translate }}
          </a>
          <a class="navbar__link" [routerLink]="['/']" fragment="webcrafts" (click)="closeMenu()">
            {{ 'NAV.WEBCRAFTS' | translate }}
          </a>
          <a class="navbar__link" [routerLink]="['/']" fragment="sysgen" (click)="closeMenu()">
            {{ 'NAV.SYSGEN' | translate }}
          </a>
          <a class="navbar__link" [routerLink]="['/']" fragment="how-it-works" (click)="closeMenu()">
            {{ 'NAV.HOW_IT_WORKS' | translate }}
          </a>

          <!-- Language switcher mobile (inside menu) -->
          <div class="lang-switcher lang-switcher--mobile">
            <button
              class="lang-btn"
              [class.active]="currentLang() === 'es-CL'"
              (click)="setLang('es-CL')">ES</button>
            <span class="lang-divider">|</span>
            <button
              class="lang-btn"
              [class.active]="currentLang() === 'en'"
              (click)="setLang('en')">EN</button>
          </div>

          <!-- CTA Mobile -->
          <button class="btn btn--primary btn--mobile-cta" (click)="goToLogin()" id="nav-cta-mobile">
            {{ 'NAV.GET_STARTED' | translate }}
          </button>
        </div>

        <!-- Right actions (Desktop) -->
        <div class="navbar__actions">
          <!-- Language switcher -->
          <div class="lang-switcher lang-switcher--desktop">
            <button
              class="lang-btn"
              [class.active]="currentLang() === 'es-CL'"
              (click)="setLang('es-CL')">ES</button>
            <span class="lang-divider">|</span>
            <button
              class="lang-btn"
              [class.active]="currentLang() === 'en'"
              (click)="setLang('en')">EN</button>
          </div>

          <!-- Usuario logueado -->
          <div class="navbar__user" *ngIf="auth.isLoggedIn()">
            <img
              [src]="auth.currentUser()!.picture"
              [alt]="auth.currentUser()!.name"
              class="navbar__avatar"
              (click)="toggleUserMenu()"/>
            <div class="navbar__user-info" (click)="toggleUserMenu()">
              <span class="navbar__user-name">{{ auth.currentUser()!.givenName }}</span>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
            <!-- Dropdown del usuario -->
            <div class="navbar__user-dropdown" *ngIf="userMenuOpen()">
              <div class="user-drop-header">
                <img [src]="auth.currentUser()!.picture" class="user-drop-avatar"/>
                <div>
                  <div class="user-drop-name">{{ auth.currentUser()!.name }}</div>
                  <div class="user-drop-email">{{ auth.currentUser()!.email }}</div>
                </div>
              </div>
              <hr class="user-drop-divider"/>
              <button class="user-drop-item" (click)="goToDashboard()">🎮 Panel de demos</button>
              <button class="user-drop-item user-drop-item--danger" (click)="auth.logout()">← Cerrar sesión</button>
            </div>
          </div>

          <!-- CTA (solo si no está logueado) -->
          <button *ngIf="!auth.isLoggedIn()"
                  class="btn btn--primary btn--sm navbar__cta"
                  (click)="goToLogin()" id="nav-cta-desktop">
            {{ 'NAV.GET_STARTED' | translate }}
          </button>

          <!-- Hamburger (Mobile) -->
          <button class="hamburger" (click)="toggleMenu()" [class.is-open]="menuOpen()" aria-label="Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  `,
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isScrolled   = signal(false);
  menuOpen     = signal(false);
  currentLang  = signal('es-CL');
  userMenuOpen = signal(false);

  constructor(
    private translate: TranslateService,
    private router: Router,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    const saved = localStorage.getItem('app_lang') || 'es-CL';
    this.currentLang.set(saved);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 20);
  }

  toggleMenu(): void {
    this.menuOpen.set(!this.menuOpen());
    document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
  }

  closeMenu(): void {
    this.menuOpen.set(false);
    document.body.style.overflow = '';
  }

  setLang(lang: string): void {
    this.currentLang.set(lang);
    this.translate.use(lang);
    localStorage.setItem('app_lang', lang);
    this.closeMenu();
  }

  goToLogin(): void {
    this.closeMenu();
    this.router.navigate(['/login']);
  }

  toggleUserMenu(): void {
    this.userMenuOpen.set(!this.userMenuOpen());
  }

  goToDashboard(): void {
    this.userMenuOpen.set(false);
    this.router.navigate(['/dashboard']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    if (!target.closest('.navbar__user')) {
      this.userMenuOpen.set(false);
    }
  }
}
