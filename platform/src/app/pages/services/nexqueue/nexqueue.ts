import { Component, OnInit } from '@angular/core';
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
export class Nexqueue implements OnInit {
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
      this.meta.updateTag({ name: 'description', content: 'Conoce los beneficios de ' + res + ' y cómo impulsará tu negocio.' });
    });
  }

  bookMeeting() {
    this.router.navigate(['/'], { queryParams: { book: 'nexqueue' } });
  }
}
