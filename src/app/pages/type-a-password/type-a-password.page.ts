import { Component, OnInit } from '@angular/core';

import { AbstractControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Router } from '@angular/router';

export interface MessagesIndex {
  [index: string]: string;
}

@Component({
  selector: 'app-type-a-password',
  templateUrl: './type-a-password.page.html',
  styleUrls: ['./type-a-password.page.scss'],
})
export class TypeAPasswordPage implements OnInit {
  constructor(
    private alertCtrl: AlertController,
    public authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  onSubmitRegister(): void {
    console.log(this.authService.authForm.value, 'shiiit');
    this.authService
      .register(this.authService.authForm.value)
      .then(auth => {
        console.log(auth, 'authhhh');
        this.router.navigate(['/home']);
      })
      .catch(err => {
        console.log(err, 'ERR');
        this.presentAlert(err.code);
      });
  }

  async presentAlert(code: any): Promise<void> {
    // code = code.split('/')[1];
    // console.log(code, 'code');
    // const alert = await this.alertCtrl.create({
    //   cssClass: 'my-custom-class',
    //   header: code,
    //   message: 'Message <strong>text</strong>!!!',
    //   buttons: [
    //     {
    //       text: 'Cancel',
    //       role: 'cancel',
    //       cssClass: 'secondary',
    //       handler: () => {
    //         console.log('Confirm Cancel: blah');
    //       },
    //     },
    //     {
    //       text: 'Okay',
    //       handler: () => {
    //         console.log('Confirm Okay');
    //       },
    //     },
    //   ],
    // });
    // return await alert.present();
  }

  get controls(): {
    [key: string]: AbstractControl;
  } {
    return this.authService.authForm.controls;
  }
}
