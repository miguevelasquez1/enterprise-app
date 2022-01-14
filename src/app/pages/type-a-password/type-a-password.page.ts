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
  params = {
    'invalid-argument': 'Erro: Um argumento inválido foi fornecido.',
    'invalid-disabled-field': 'Erro: O valor fornecido para a propriedade de usuário é inválido.',
    'argument-error': 'No has ingresado tus datos',
    'email-already-in-use': 'Esta cuenta ya existe, intenta con otro email',
    'invalid-email': 'Correo electronico invalido',
    'weak-password': 'Contraseña débil. Intenta con otra',
    'missing-email': 'Hace falta un correo electrónico',

    /* ADD HERE THE OTHERs IDs AND THE CORRESPONDING MESSAGEs */
  } as MessagesIndex;

  constructor(
    private alertCtrl: AlertController,
    public authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  async onSubmitRegister(): Promise<void> {
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

  get controls(): {
    [key: string]: AbstractControl;
  } {
    return this.authService.authForm.controls;
  }
}
