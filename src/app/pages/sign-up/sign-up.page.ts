import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Globals } from 'src/app/globals';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

interface MessagesIndex {
  [index: string]: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  params = {
    'invalid-argument': this._translate.instant('sign-up.error-messages.invalid-argument'),
    'invalid-disabled-field': this._translate.instant(
      'sign-up.error-messages.invalid-disabled-field',
    ),
    'argument-error': this._translate.instant('sign-up.error-messages.argument-error'),
    'email-already-in-use': this._translate.instant('sign-up.error-messages.email-already-in-use'),
    'invalid-email': this._translate.instant('sign-up.error-messages.invalid-email'),
    'weak-password': this._translate.instant('sign-up.error-messages.weak-password'),
    'missing-email': this._translate.instant('sign-up.error-messages.missing-email'),

    /* ADD HERE THE OTHERs IDs AND THE CORRESPONDING MESSAGEs */
  } as MessagesIndex;

  constructor(
    public authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    public globals: Globals,
    private _translate: TranslateService,
  ) {}

  ngOnInit(): void {}

  async signUpWithGoogle(): Promise<void> {
    await this.authService.googleAuth();
    this.router.navigate(['/account']);
  }

  async register(): Promise<void> {
    console.log(this.authService.authForm.hasError('notSame'), 'errorrr');
    try {
      await this.authService.register(this.authService.authForm.value);
      this.router.navigate(['/account']);
    } catch (err) {
      console.log(err, 'err');
      this.presentAlert(err.code);
    }
  }

  async presentAlert(code: any): Promise<void> {
    code = code.split('/')[1];
    if (this.params[code]) {
      const alert = await this.alertCtrl.create({
        cssClass: 'my-custom-class',
        header: 'Hey!',
        message: this.params[code],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {},
          },
          {
            text: 'Okay',
            handler: () => {},
          },
        ],
      });
      return await alert.present();
    }
  }
}
