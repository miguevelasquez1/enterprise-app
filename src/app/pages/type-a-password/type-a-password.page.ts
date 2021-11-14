import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MessagesIndex } from '../register/register.page';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-type-a-password',
  templateUrl: './type-a-password.page.html',
  styleUrls: ['./type-a-password.page.scss'],
})
export class TypeAPasswordPage implements OnInit {

  params = {
    'invalid-argument': 'Erro: Um argumento inválido foi fornecido.',
    'invalid-disabled-field': 'Erro: O valor fornecido para a propriedade de usuário é inválido.',
    'argument-error': 'No has ingresado tus datos',
    'email-already-in-use': 'Esta cuenta ya existe, intenta con otro email',
    'invalid-email': 'Correo electrónico invalido',
    'weak-password': 'Contraseña débil. Intenta con otra'
  } as MessagesIndex;

  constructor(
    private alertController: AlertController,
    private router: Router,
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

  onSubmitRegister() {
    this.authService.register(this.authService.authForm.value)
    .then(response => {
      console.log(response, 'response');
      this.authService.isAuth2().subscribe(auth => {
      });
    })
    .catch((err) => { console.log(err); this.presentAlert(err.code); });
  }

  async presentAlert(code) {
    code = code.split('/')[1];
    if (this.params[code]) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alerta',
        message: this.params[code],
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  get controls(){
    return this.authService.authForm.controls;
  }

}
