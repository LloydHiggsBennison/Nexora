import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss'
})
export class AboutUs implements OnInit, AfterViewInit {

  teamMembers = [
    { nameKey: 'ABOUT_US.TEAM.1.NAME', roleKey: 'ABOUT_US.TEAM.1.ROLE', badgeKey: 'ABOUT_US.TEAM.1.BADGE', descKey: 'ABOUT_US.TEAM.1.DESC', initials: 'LH', color: '#8B7CF6', linkedin: 'https://www.linkedin.com/in/lloyd-higgs-bennison/' },
    { nameKey: 'ABOUT_US.TEAM.2.NAME', roleKey: 'ABOUT_US.TEAM.2.ROLE', badgeKey: 'ABOUT_US.TEAM.2.BADGE', descKey: 'ABOUT_US.TEAM.2.DESC', initials: 'SB', color: '#E8899F', linkedin: '' },
    { nameKey: 'ABOUT_US.TEAM.3.NAME', roleKey: 'ABOUT_US.TEAM.3.ROLE', badgeKey: 'ABOUT_US.TEAM.3.BADGE', descKey: 'ABOUT_US.TEAM.3.DESC', initials: 'ET', color: '#3ECFB0', linkedin: '' },
    { nameKey: 'ABOUT_US.TEAM.4.NAME', roleKey: 'ABOUT_US.TEAM.4.ROLE', badgeKey: 'ABOUT_US.TEAM.4.BADGE', descKey: 'ABOUT_US.TEAM.4.DESC', initials: 'JA', color: '#E0A455', linkedin: '' }
  ];

  constructor(
    private title: Title,
    private meta: Meta,
    private translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.translate.get('NAV.ABOUT_US').subscribe(res => {
      this.title.setTitle(res + ' - Nexora');
      this.meta.updateTag({ name: 'description', content: 'Conoce la historia de Nexora y el equipo detrás de Nexora Suite: el entorno corporativo que integra CRM, BI, automatización y más para PYMEs chilenas.' });
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
    this.router.navigate(['/'], { queryParams: { book: 'general' } });
  }
}
