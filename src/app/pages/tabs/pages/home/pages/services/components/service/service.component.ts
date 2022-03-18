import { AlertController, IonRouterOutlet, ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Globals } from 'src/app/globals';
import { RequestFormPage } from '../../modals/request-form/request-form.page';
import { Service } from '../../models/service';
import { ServiceFormPage } from '../../modals/service-form/service-form.page';
import { ServicesService } from '../../services/services/services.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
})
export class ServiceComponent implements OnInit {
  @Input() service: Service;

  isCompany = false;

  hostName: string;

  constructor(
    public globals: Globals,
    private _authService: AuthService,
    private _alertCtrl: AlertController,
    private _servicesService: ServicesService,
    private _modalCtrl: ModalController,
    private _routerOutlet: IonRouterOutlet,
  ) {}

  async ngOnInit() {
    console.log(this.service, 'avr');

    if (this.service.isCompany) {
      this.isCompany = await this._authService.isCompany();
      console.log(this.service.hostUid, 'hostUid');
      const company = await this._authService.getCurrentCompanyByKey(this.service.hostUid);
      this.hostName = company.name;
    } else {
      this.hostName = this.service.author;
    }
  }

  editService() {
    this._servicesService.populateForm(this.service);
    this.presentServiceFormModal();
  }

  async presentServiceFormModal(): Promise<void> {
    const modal = await this._modalCtrl.create({
      component: ServiceFormPage,
      swipeToClose: true,
      presentingElement: this._routerOutlet.nativeEl,
      cssClass: 'service-form-modal',
    });

    return await modal.present();
  }

  async presentRequestFormModal(): Promise<void> {
    const modal = await this._modalCtrl.create({
      componentProps: { service: this.service },
      component: RequestFormPage,
      swipeToClose: true,
    });

    return await modal.present();
  }

  async presentDeleteAlert(): Promise<void> {
    const alert = await this._alertCtrl.create({
      header: 'Delete',
      message: 'Are you sure that you want delete it?',
      buttons: [
        'Cancel',
        {
          text: 'Yes',
          handler: () => {
            this._servicesService.removeService(this.service.$key);
          },
        },
      ],
    });

    return await alert.present();
  }
}
