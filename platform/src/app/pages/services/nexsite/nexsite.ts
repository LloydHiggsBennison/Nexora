import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nexsite',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './nexsite.html',
  styleUrl: './nexsite.scss'
})
export class Nexsite implements OnInit {
  siteFeatures = [
    { icon: '🌐', titleKey: 'NEXSITE.FEATURES.WEB.TITLE', descKey: 'NEXSITE.FEATURES.WEB.DESC' },
    { icon: '⚡', titleKey: 'NEXSITE.FEATURES.AUTO.TITLE', descKey: 'NEXSITE.FEATURES.AUTO.DESC' },
    { icon: '🔗', titleKey: 'NEXSITE.FEATURES.INTEGRATION.TITLE', descKey: 'NEXSITE.FEATURES.INTEGRATION.DESC' },
    { icon: '📈', titleKey: 'NEXSITE.FEATURES.PERFORMANCE.TITLE', descKey: 'NEXSITE.FEATURES.PERFORMANCE.DESC' }
  ];

  constructor(
    private title: Title,
    private meta: Meta,
    private translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.translate.get('NAV.NEXSITE').subscribe(res => {
      this.title.setTitle(res + ' - Nexora');
      this.meta.updateTag({ name: 'description', content: 'Sitios web corporativos de alto rendimiento que automatizan tus flujos internos: formularios conectados a tu ERP/CRM, SEO y velocidad optimizados desde el diseño.' });
    });
  }

  bookMeeting() {
    this.router.navigate(['/'], { queryParams: { book: 'nexsite' } });
  }
}
