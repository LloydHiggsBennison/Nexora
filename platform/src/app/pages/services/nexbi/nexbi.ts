import { Component, OnInit } from '@angular/core';
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
export class Nexbi implements OnInit {
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
      this.meta.updateTag({ name: 'description', content: 'Conoce los beneficios de ' + res + ' y cómo impulsará tu negocio.' });
    });
  }

  bookMeeting() {
    this.router.navigate(['/'], { queryParams: { book: 'nexbi' } });
  }
}
