import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nexorder',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './nexorder.html',
  styleUrl: './nexorder.scss'
})
export class Nexorder implements OnInit, AfterViewInit {
  orderFeatures = [
    { icon: '📋', titleKey: 'NEXORDER.FEATURES.MENU.TITLE', descKey: 'NEXORDER.FEATURES.MENU.DESC' },
    { icon: '🛒', titleKey: 'NEXORDER.FEATURES.CART.TITLE', descKey: 'NEXORDER.FEATURES.CART.DESC' },
    { icon: '👨🍳', titleKey: 'NEXORDER.FEATURES.STAFF.TITLE', descKey: 'NEXORDER.FEATURES.STAFF.DESC' },
    { icon: '🔄', titleKey: 'NEXORDER.FEATURES.REALTIME.TITLE', descKey: 'NEXORDER.FEATURES.REALTIME.DESC' }
  ];

  constructor(
    private title: Title,
    private meta: Meta,
    private translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.translate.get('NAV.NEXORDER').subscribe(res => {
      this.title.setTitle(res + ' - Nexora');
      this.meta.updateTag({ name: 'description', content: 'Carta digital con carrito integrado: tus clientes escanean, ordenan desde el celular y la comanda llega al instante a tu personal, sin pasarelas de pago obligatorias.' });
    });
  }

  ngAfterViewInit(): void {
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

  bookMeeting() {
    this.router.navigate(['/'], { queryParams: { book: 'nexorder' } });
  }
}
