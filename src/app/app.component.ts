import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private _platform: Platform, private translate: TranslateService) {
    this._platform.ready().then(() => {
      console.log('pasa');
    });
    this.translate.use(this.translate.getBrowserLang());
  }
}
