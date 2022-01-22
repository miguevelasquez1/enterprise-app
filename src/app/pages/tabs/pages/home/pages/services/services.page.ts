import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';

import { Globals } from 'src/app/globals';
import { NotificationsService } from './pages/notifications/services/notifications/notifications.service';
import { Service } from './models/service';
import { ServiceFormPage } from './modals/service-form/service-form.page';
import { ServicesService } from './services/services/services.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {
  services: Service[] = [];
  notificationsLength = 0;

  constructor(
    public globals: Globals,
    private _servicesService: ServicesService,
    private _notificationsService: NotificationsService,
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet,
  ) {
    console.log(this.services, 'services');
  }

  async ngOnInit() {
    (await this._notificationsService.getNotifications()).subscribe(notifications => {
      this.notificationsLength = notifications.length;
    });
  }

  async ionViewWillEnter() {
    (await this._servicesService.getServices())
      .snapshotChanges()
      .pipe(map(changes => changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))))
      .subscribe(data => {
        console.log(data, 'data');
        this.services = data;
      });
  }

  async presentServiceFormModal(): Promise<void> {
    this._servicesService.serviceForm.reset();
    const modal = await this.modalCtrl.create({
      component: ServiceFormPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      cssClass: 'service-form-modal',
    });

    return await modal.present();
  }
}
