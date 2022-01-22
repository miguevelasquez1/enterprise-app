import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  private darkMode;

  public currentLanguage: string;

  constructor(
    private translateService: TranslateService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.darkMode = true;
    this.currentLanguage = this.translateService.currentLang;
  }

  ngOnInit(): void {}

  cambio(): void {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark');
  }

  changeLanguage(e): void {
    console.log(e.detail.value);
    this.translateService.use(e.detail.value);
  }

  signOut(): void {
    this.authService.signOut();
    this.router.navigate(['/welcome-slide']);
  }
}
