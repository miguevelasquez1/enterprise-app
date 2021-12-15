import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  private darkMode;

  public currentLanguage: string;

  constructor(private translateService: TranslateService) {
    this.darkMode = true;
    this.currentLanguage = this.translateService.currentLang;
  }

  ngOnInit(): void {}

  cambio(): void {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark');
  }

  changeLanguage(e) {
    this.translateService.use(e.detail.value);
  }
}
