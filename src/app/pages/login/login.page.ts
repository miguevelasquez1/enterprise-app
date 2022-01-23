import { Component, OnInit } from '@angular/core';

import { AlertController } from '@ionic/angular';
import { AuthService } from '../../shared/services/auth/auth.service';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public serverEnabled = false;

  private subscription;

  constructor(
    public menuCtrl: MenuController,
    public authService: AuthService,
    public router: Router,
    public alertController: AlertController,
  ) {}

  ngOnInit(): void {}

  ionViewDidEnter(): void {
    this.menuCtrl.enable(false);
  }

  async onSubmitLogin(): Promise<void> {
    try {
      await this.authService.loginFirebase(this.authService.authForm.value);
      this.router.navigate(['/account']);
    } catch (err) {
      console.log(err.code, 'err');
      await this.presentAlert(err.code);
    }
  }

  async presentAlert(code: string): Promise<void> {
    console.log(code, 'code 1');
    code = code.split('/')[1];
    console.log(code, 'code 2');
    if (this.authService.authErrors[code]) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alert',
        message: this.authService.authErrors[code],
        buttons: ['OK'],
      });

      await alert.present();
    }
  }
}
