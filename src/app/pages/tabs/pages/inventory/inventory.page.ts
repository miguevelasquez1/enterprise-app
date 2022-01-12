import { Component, OnDestroy, OnInit } from '@angular/core';

import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { IItem } from 'src/app/shared/models/item';
import { InventoryService } from 'src/app/shared/services/inventory/inventory.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {
  isAdmin: boolean;
  inventoryList = null;
  userData$: Observable<any>;
  userUid: string;

  constructor(
    private alertCtrl: AlertController,
    private authService: AuthService,
    public inventoryService: InventoryService,
  ) {
    console.log('pasa 1');
  }

  filterRegistro = '';

  ngOnInit(): void {
    console.log('pasa 2');
  }

  async ionViewWillEnter(): Promise<void> {
    console.log('pasa 3');
    (await this.inventoryService.getInventory())
      .snapshotChanges()
      .pipe(map(changes => changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))))
      .subscribe(data => {
        console.log('pasaaaaaa');
        this.inventoryList = data;
      });
  }

  public async onDelete($key: string): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: '¿Seguro de que quieres eliminarlo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.inventoryService.deleteInventario($key);
          },
        },
      ],
    });

    await alert.present();
  }

  newInventario(): void {
    this.inventoryService.inventarioForm.reset();
    this.inventoryService.imageList = [];
    this.inventoryService.selectedInventario = new IItem();
  }

  ionViewDidLeave(): void {
    console.log('destory');
    this.inventoryList = null;
  }
}
