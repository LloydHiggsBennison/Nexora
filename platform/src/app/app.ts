import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, NavbarComponent, FooterComponent],
  template: `
    <app-navbar />
    <main>
      <router-outlet />
    </main>
    <app-footer />
  `,
  styles: [`
    main {
      min-height: 100vh;
    }
  `]
})
export class App implements OnInit {
  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    // Detectar idioma del navegador o usar español Chile como default
    const savedLang = localStorage.getItem('app_lang') || 'es-CL';
    this.translate.setDefaultLang('es-CL');
    this.translate.use(savedLang);
  }
}
