import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nexbi',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './nexbi.html',
  styleUrl: './nexbi.scss'
})
export class Nexbi implements OnInit, AfterViewInit {
  biFeatures = [
    { icon: '📊', titleKey: 'NEXBI.FEATURES.KPI.TITLE', descKey: 'NEXBI.FEATURES.KPI.DESC' },
    { icon: '🧩', titleKey: 'NEXBI.FEATURES.DASHBOARD.TITLE', descKey: 'NEXBI.FEATURES.DASHBOARD.DESC' },
    { icon: '📨', titleKey: 'NEXBI.FEATURES.REPORTS.TITLE', descKey: 'NEXBI.FEATURES.REPORTS.DESC' },
    { icon: '💡', titleKey: 'NEXBI.FEATURES.DECISION.TITLE', descKey: 'NEXBI.FEATURES.DECISION.DESC' }
  ];

  constructor(
    private title: Title,
    private meta: Meta,
    private translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.translate.get('NAV.NEXBI').subscribe(res => {
      this.title.setTitle(res + ' - Nexora');
      this.meta.updateTag({ name: 'description', content: 'Inteligencia de negocios que convierte tus datos operativos en tableros interactivos en tiempo real, con reportes automatizados para decisiones más rápidas y certeras.' });
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
    this.router.navigate(['/'], { queryParams: { book: 'nexbi' } });
  }
}
