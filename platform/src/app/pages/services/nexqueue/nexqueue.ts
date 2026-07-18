import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nexqueue',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './nexqueue.html',
  styleUrl: './nexqueue.scss'
})
export class Nexqueue implements OnInit, AfterViewInit {
  queueFeatures = [
    { icon: '🔢', titleKey: 'NEXQUEUE.FEATURES.TURNS.TITLE', descKey: 'NEXQUEUE.FEATURES.TURNS.DESC' },
    { icon: '📺', titleKey: 'NEXQUEUE.FEATURES.SCREEN.TITLE', descKey: 'NEXQUEUE.FEATURES.SCREEN.DESC' },
    { icon: '🔔', titleKey: 'NEXQUEUE.FEATURES.NOTIF.TITLE', descKey: 'NEXQUEUE.FEATURES.NOTIF.DESC' },
    { icon: '📈', titleKey: 'NEXQUEUE.FEATURES.METRICS.TITLE', descKey: 'NEXQUEUE.FEATURES.METRICS.DESC' }
  ];

  constructor(
    private title: Title,
    private meta: Meta,
    private translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.translate.get('NAV.NEXQUEUE').subscribe(res => {
      this.title.setTitle(res + ' - Nexora');
      this.meta.updateTag({ name: 'description', content: 'Gestión digital de filas de atención: turnos por QR, pantalla de llamados, notificaciones por SMS/WhatsApp y métricas de tiempos de espera en tiempo real.' });
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
    this.router.navigate(['/'], { queryParams: { book: 'nexqueue' } });
  }
}
