import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nexcore',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './nexcore.html',
  styleUrl: './nexcore.scss'
})
export class Nexcore implements OnInit, AfterViewInit {
  

  constructor(
    private title: Title,
    private meta: Meta,
    private translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.translate.get('NAV.NEXCORE').subscribe(res => {
      this.title.setTitle(res + ' - Nexora');
      this.meta.updateTag({ name: 'description', content: 'CRM/ERP personalizable que centraliza ventas, clientes, inventario y operaciones de tu empresa en una sola plataforma diseñada a la medida de tu industria.' });
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
    this.router.navigate(['/'], { queryParams: { book: 'nexcore' } });
  }
}
