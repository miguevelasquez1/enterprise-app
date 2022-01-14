import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';

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

  constructor(
    private _servicesService: ServicesService,
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet,
  ) {
    console.log(this.services, 'services');
  }

  ngOnInit() {}

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
