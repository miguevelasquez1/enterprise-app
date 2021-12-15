import { Component, OnInit } from '@angular/core';

import { AlertController } from '@ionic/angular';
import { AngularFireList } from '@angular/fire/compat/database';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ChartService } from 'src/app/shared/services/chart/chart.service';
import { IRecord } from 'src/app/shared/interfaces/record.interface';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { ItemReorderEventDetail } from '@ionic/core';
import { RecordsService } from 'src/app/shared/services/records/records.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-my-routes',
  templateUrl: './my-routes.page.html',
  styleUrls: ['./my-routes.page.scss'],
})
export class MyRoutesPage implements OnInit {
  isAdmin: boolean;
  recordList = [];
  userUid: string;

  constructor(
    public recordsService: RecordsService,
    private authService: AuthService,
    private alertController: AlertController,
    private chartService: ChartService,
  ) {}

  filterRegistro = '';

  ngOnInit(): void {}

  async ionViewWillEnter(): Promise<void> {
    (await this.recordsService.getRecords())
      .snapshotChanges()
      .pipe(map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))))
      .subscribe(data => {
        console.log(data, 'dataaa');
        this.recordList = data;
      });
  }

  async onDelete(ruta: IRecord): Promise<void> {
    const alert = await this.alertController.create({
      header: '¿Seguro de que quieres eliminar esta ruta?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'yes',
          handler: () => {
            this.recordsService.deleteRecord(ruta.$key);
            // this.registroService.deleteRegistro(ruta.$key);
            // this.chartService.deletePoint(ruta.fecha);
          },
        },
      ],
    });

    await alert.present();
  }

  newForm(): void {
    this.recordsService.recordForm.reset();
  }

  getCurrentUser(): void {
    this.authService.isAuth().subscribe((auth: IUser) => {
      if (auth) {
        this.userUid = auth.uid;
      }
    });
  }

  doReorder(ev: CustomEvent<ItemReorderEventDetail>): void {
    this.recordList = ev.detail.complete(this.recordList);
  }

  ionViewDidLeave(): void {
    console.log('destory');
    this.recordList = [];
  }
}
