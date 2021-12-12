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
    }
  }

  async presentAlert(err: string): Promise<void> {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: err,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
