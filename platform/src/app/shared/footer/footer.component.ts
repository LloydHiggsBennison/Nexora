import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <footer class="footer">
      <div class="footer__glow footer__glow--left"></div>
      <div class="footer__glow footer__glow--right"></div>

      <div class="footer__inner">
        <div class="footer__grid">
          <!-- Brand -->
          <div class="footer__brand">
            <div class="footer__logo">
              <div class="footer__logo-mark">⬡</div>
              <span class="footer__logo-text">
                <span>Nex</span><span class="text-purple">ora</span>
              </span>
            </div>
            <p class="footer__brand-desc">{{ 'FOOTER.BRAND_DESC' | translate }}</p>
            <div class="footer__socials">
              <a href="#" class="social-btn" aria-label="LinkedIn">in</a>
              <a href="#" class="social-btn" aria-label="Instagram">ig</a>
              <a href="#" class="social-btn" aria-label="Twitter">𝕏</a>
            </div>
            <div class="footer__contact-info">
              <span class="footer__contact-item">
                📧 {{ 'FOOTER.CONTACT_PLACEHOLDER' | translate }}
              </span>
              <span class="footer__contact-item">
                💬 {{ 'FOOTER.WHATSAPP_PLACEHOLDER' | translate }}
              </span>
            </div>
          </div>

          <!-- Services -->
          <div class="footer__col">
            <h4 class="footer__col-title">{{ 'FOOTER.SERVICES_TITLE' | translate }}</h4>
            <ul class="footer__links">
              <li><a href="#proxipush">{{ 'NAV.PROXIPUSH' | translate }}</a></li>
              <li><a href="#queueflow">{{ 'NAV.QUEUEFLOW' | translate }}</a></li>
              <li><a href="#webcrafts">{{ 'NAV.WEBCRAFTS' | translate }}</a></li>
              <li><a href="#sysgen">{{ 'NAV.SYSGEN' | translate }}</a></li>
              <li><a href="#autoflow">{{ 'NAV.AUTOFLOW' | translate }}</a></li>
            </ul>
          </div>

          <!-- Company -->
          <div class="footer__col">
            <h4 class="footer__col-title">{{ 'FOOTER.COMPANY_TITLE' | translate }}</h4>
            <ul class="footer__links">
              <li><a href="#">{{ 'FOOTER.COMPANY.ABOUT' | translate }}</a></li>
              <li><a href="#">{{ 'FOOTER.COMPANY.BLOG' | translate }}</a></li>
              <li><a href="#">{{ 'FOOTER.COMPANY.CAREERS' | translate }}</a></li>
              <li><a href="#">{{ 'FOOTER.COMPANY.CONTACT' | translate }}</a></li>
            </ul>
          </div>

          <!-- Legal -->
          <div class="footer__col">
            <h4 class="footer__col-title">{{ 'FOOTER.LEGAL_TITLE' | translate }}</h4>
            <ul class="footer__links">
              <li><a href="#">{{ 'FOOTER.LEGAL.PRIVACY' | translate }}</a></li>
              <li><a href="#">{{ 'FOOTER.LEGAL.TERMS' | translate }}</a></li>
              <li><a href="#">{{ 'FOOTER.LEGAL.COOKIES' | translate }}</a></li>
            </ul>
          </div>
        </div>

        <div class="divider"></div>

        <div class="footer__bottom">
          <span class="footer__copyright">
            © {{ currentYear }} Nexora. {{ 'FOOTER.COPYRIGHT' | translate }}
          </span>
          <span class="footer__made-in">{{ 'FOOTER.MADE_IN' | translate }}</span>
        </div>
      </div>
    </footer>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
