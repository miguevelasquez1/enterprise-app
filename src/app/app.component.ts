import { Component } from '@angular/core';
// import { OneSignal } from '@awesome-cordova-plugins/onesignal/ngx';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(
    private _platform: Platform,
    // private _oneSignal: OneSignal,
    private translate: TranslateService,
  ) {
    this.translate.use(this.translate.getBrowserLang());
    this._platform.ready().then(() => {
      // this._oneSignal.startInit(
      //   'f5cf12d3-5f1c-4523-9657-ce5e4609f3da',
      //   // eslint-disable-next-line max-len
      //   '879964081618',
      // );
      // this._oneSignal.inFocusDisplaying(this._oneSignal.OSInFocusDisplayOption.InAppAlert);

      // this._oneSignal.handleNotificationReceived().subscribe(data => {
      //   const msg = data.payload.body;
      //   const title = data.payload.title;
      //   const additionalData = data.payload.additionalData;
      //   console.log('handleNotificationReceived', msg, title, additionalData);
      //   // do something when notification is received
      // });

      // this._oneSignal.handleNotificationOpened().subscribe(() => {
      //   // do something when a notification is opened
      // });

      // this._oneSignal.endInit();
    });
  }
}
