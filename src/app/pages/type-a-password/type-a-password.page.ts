import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

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
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmitRegister() {
    this.authService.register(this.authService.authForm.value)
      .then(auth => {
        console.log(auth, 'auth');
        this.router.navigate(['/home']);
      })
      .catch((err) => { console.log(err, 'ERR'); this.presentAlert(err.code); });
  }

  async presentAlert(code) {
    console.log(code, 'code');
    this.alertCtrl.create({

    });
    // code = code.split('/')[1];
  }

  get controls(){
    return this.authService.authForm.controls;
  }

}
