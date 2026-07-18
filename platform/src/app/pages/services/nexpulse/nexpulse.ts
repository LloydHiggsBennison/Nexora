import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nexpulse',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './nexpulse.html',
  styleUrl: './nexpulse.scss'
})
export class Nexpulse implements OnInit, AfterViewInit {
  proxiFeatures = [
    { icon: '📍', titleKey: 'NEXPULSE.FEATURES.GEO.TITLE', descKey: 'NEXPULSE.FEATURES.GEO.DESC' },
    { icon: '✉️', titleKey: 'NEXPULSE.FEATURES.PERSONALIZED.TITLE', descKey: 'NEXPULSE.FEATURES.PERSONALIZED.DESC' },
    { icon: '🛠️', titleKey: 'NEXPULSE.FEATURES.PANEL.TITLE', descKey: 'NEXPULSE.FEATURES.PANEL.DESC' },
    { icon: '📧', titleKey: 'NEXPULSE.FEATURES.EMAIL.TITLE', descKey: 'NEXPULSE.FEATURES.EMAIL.DESC' },
    { icon: '📊', titleKey: 'NEXPULSE.FEATURES.REALTIME.TITLE', descKey: 'NEXPULSE.FEATURES.REALTIME.DESC' },
    { icon: '🏢', titleKey: 'NEXPULSE.FEATURES.MULTISITE.TITLE', descKey: 'NEXPULSE.FEATURES.MULTISITE.DESC' }
  ];

  constructor(
    private title: Title,
    private meta: Meta,
    private translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.translate.get('NAV.NEXPULSE').subscribe(res => {
      this.title.setTitle(res + ' - Nexora');
      this.meta.updateTag({ name: 'description', content: 'Notificaciones push geolocalizadas para llegar a clientes a 100m de tu local. Personaliza mensajes, mide aperturas y conversiones en tiempo real desde un solo panel.' });
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
    this.router.navigate(['/'], { queryParams: { book: 'nexpulse' } });
  }
}
