import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../../../../services/registro.service';
import { AuthService } from '../../../../services/auth.service';
import { Registro } from 'src/app/models/registro';

import { ItemReorderEventDetail } from '@ionic/core';

import * as FontAwesome from '@fortawesome/free-solid-svg-icons';
import { AlertController } from '@ionic/angular';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-misrutas-list',
  templateUrl: './misrutas-list.page.html',
  styleUrls: ['./misrutas-list.page.scss'],
})
export class MisrutasListPage implements OnInit {

  isAdmin: boolean;
  registroList = [];
  userUid: string;

  constructor(
    private authService: AuthService,
    public registroService: RegistroService,
    private alertController: AlertController,
    private chartService: ChartService
  ) { }

  fontAwesome = FontAwesome;
  filterRegistro = '';

  ngOnInit() {
    this.getRole();

    this.registroService.getRegistros()
      .subscribe(list => {
        this.registroList = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
  }

  prueba() {
    console.log('prueba');
  }

  // onDelete($key: string) {

  //   // if (confirm('¿Estas seguro de que quieres elimnarlo?')){
  //     this.registroService.deleteRegistro($key);
  //   // }
  // }

  async onDelete(ruta: Registro) {
    const alert = await this.alertController.create({
      cssClass: 'alert_submit',
      header: '¿Seguro de que quieres eliminar esta ruta?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'yes',
          handler: () => {
            this.registroService.deleteRegistro(ruta.$key);
            this.chartService.deletePoint(ruta.fecha);

          }
        }
      ]
    });

    await alert.present();
  }

  getRole() {
    this.authService.isAuth2().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUser(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole).server.admin;
        });
      }
    });
  }

  newForm() {
    this.registroService.form.reset();
    this.registroService.selectedRegistro = new Registro();
  }

  getCurrentUser() {
    this.authService.isAuth2().subscribe(auth => {

      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUser(this.userUid).subscribe(user => {
          this.userUid = user.uid;
        });
      }
    });
  }

  doReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    this.registroList = ev.detail.complete(this.registroList);
  }

}
