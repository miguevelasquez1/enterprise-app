import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { User } from '../../models/user';

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
    private authService: AuthService,
    public router: Router,
    public alertController: AlertController
  ) {}

  ngOnInit() {

    this.authService.loginResponse$.subscribe(user => {
      // if (user.server.name) {
      //   // trae todos los empleados de un servidor y revisa si coincide.
      //   this.subscription = this.authService.getUsersFromServer(user).subscribe(employees => {
      //     let userExist = false;

      //     for (const employee of employees) {
      //       if (employee.email === user.email) {
      //         userExist = true;
      //       }
      //     }

      //     if (userExist) {
      //       this.authService
      //         .loginFirebase(this.authService.authForm.value)
      //         .then(() => {
      //           this.router.navigate(['/home']);
      //           if (this.subscription) {
      //           }
      //         })
      //         .catch((err) => this.presentAlert(err.message) );
      //     } else {
      //       this.presentAlert('Server Incorrect');
      //     }
      //     if (this.subscription) {
      //       this.subscription.unsubscribe();
      //     }
      //   });
      // } else {
      //   this.presentAlert('Por favor ingrese un servidor');
      // }
    });
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  }

  onSubmitLogin() {
    this.authService.loginResponse$.emit(this.authService.authForm.value);
  }

  async presentAlert(err) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alerta',
      message: err,
      buttons: ['OK']
    });

    await alert.present();
  }

  onSubmitRegister() {
    this.router.navigate(['/register']);
  }

}
