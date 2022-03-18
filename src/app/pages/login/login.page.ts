import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { AlertController } from '@ionic/angular';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Globals } from 'src/app/globals';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public serverEnabled = false;

  public type = 'person';

  emailExists;

  constructor(
    public globals: Globals,
    private _activatedRoute: ActivatedRoute,
    private _chRef: ChangeDetectorRef,
    public menuCtrl: MenuController,
    public authService: AuthService,
    public router: Router,
    public alertController: AlertController,
  ) {}

  ngOnInit(): void {}

  ionViewDidEnter(): void {
    this.menuCtrl.enable(false);
    this.authService.authForm.reset();
    this._activatedRoute.queryParams.subscribe((params: { type: string }) => {
      this.type = params.type;
    });
  }

  async onSubmitLogin(): Promise<void> {
    try {
      await this.authService.loginFirebase(this.authService.authForm.value);
      this.authService.authForm.reset();
      this.router.navigate(['/account']);
    } catch (err) {
      await this.presentAlert(err.code);
    }
  }

  async presentAlert(code: string): Promise<void> {
    code = code.split('/')[1];
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
