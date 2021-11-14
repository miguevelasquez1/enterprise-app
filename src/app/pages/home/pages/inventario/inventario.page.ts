import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { AuthService } from '../../../../services/auth.service';
import { InventarioService } from '../../../../services/inventario.service';
import { Inventory } from '../../../../models/inventory';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {
  isAdmin: boolean;
  inventarioList = [];
  userData$: Observable<any>;
  userUid: string;

  constructor(
    private alertCtrl: AlertController,
    private authService: AuthService,
    public inventarioService: InventarioService
  ) { }

  filterRegistro = '';

  ngOnInit() {
    this.getRole();

    this.inventarioService.userDataObsevable$.subscribe(() => {
      this.inventarioService.getInventario().subscribe(xd => {
        xd.docs.map(alo => {
          this.inventarioList.push({ id: alo.id, ...alo.data() });
        });
      });
    });
  }

  public async onDelete($key: string) {
    const alert = await this.alertCtrl.create({
      header: '¿Seguro de que quieres eliminarlo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Aceptar',
          handler: () => {
            this.inventarioService.deleteInventario($key);
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
      }
    });
  }

  newInventario() {
    this.inventarioService.inventarioForm.reset();
    this.inventarioService.imageList = [];
    this.inventarioService.selectedInventario = new Inventory();
  }
}
