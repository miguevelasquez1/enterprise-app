import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, LoadingController, ModalController } from '@ionic/angular';

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
    private _loadingCtrl: LoadingController,
  ) {}

  async ngOnInit() {
    const loading = await this._loadingCtrl.create({
      spinner: 'bubbles',
      translucent: true,
      duration: 3000,
    });
    await loading.present();
    (await this._notificationsService.getNotifications()).subscribe(notifications => {
      this.notificationsLength = notifications.length;
    });
    (await this._servicesService.getServices()).subscribe(async services => {
      if (this.globals.isEnterprise) {
        this.services = services;
      } else {
        services.forEach(service => {
          this.services.push(service);
        });
      }
      await loading.dismiss();
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
