import { Component, HostListener, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule],
  template: `
    <nav class="navbar" [class.scrolled]="isScrolled()">
      <div class="navbar__inner">
        <!-- Logo -->
        <div class="navbar__logo" [routerLink]="['/']" style="cursor: pointer; display: flex; align-items: center;">
          <!-- Isotipo N oficial (PNG con transparencia real) -->
          <img src="assets/Short Nexora.png" alt="N" style="height: 34px; width: auto; margin-right: -11px;">
          <!-- Resto del texto -->
          <span class="nexora-brand-text">
            E<span class="char-x">X</span>ORA
          </span>
        </div>

        <!-- Nav Links (Desktop) -->
        <div class="navbar__links" [class.is-open]="menuOpen()">
          <a class="navbar__link" [routerLink]="['/']" fragment="services" (click)="closeMenu()">
            {{ 'NAV.SERVICES' | translate }}
          </a>
          <a class="navbar__link" [routerLink]="['/servicios/nexcore']" (click)="closeMenu()">
            {{ 'NAV.NEXCORE' | translate }}
          </a>
          <a class="navbar__link" [routerLink]="['/servicios/nexbi']" (click)="closeMenu()">
            {{ 'NAV.NEXBI' | translate }}
          </a>
          <a class="navbar__link" [routerLink]="['/servicios/nexpulse']" (click)="closeMenu()">
            {{ 'NAV.NEXPULSE' | translate }}
          </a>
          <a class="navbar__link" [routerLink]="['/servicios/nexsite']" (click)="closeMenu()">
            {{ 'NAV.NEXSITE' | translate }}
          </a>
          <a class="navbar__link" [routerLink]="['/']" fragment="how-it-works" (click)="closeMenu()">
            {{ 'NAV.HOW_IT_WORKS' | translate }}
          </a>
          <a class="navbar__link" [routerLink]="['/']" fragment="about-us" (click)="closeMenu()">
            {{ 'NAV.ABOUT_US' | translate }}
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

          <!-- Botón quitado por solicitud del cliente -->
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

          <!-- Botón quitado por solicitud del cliente -->
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

  constructor(
    private translate: TranslateService,
    private router: Router,
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

  scrollToContact(): void {
    this.closeMenu();
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      this.router.navigate(['/'], { fragment: 'contact' });
    }
  }
}
