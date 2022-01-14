import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { ServicesService } from '../../services/services/services.service';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.page.html',
  styleUrls: ['./service-form.page.scss'],
})
export class ServiceFormPage implements OnInit {
  defaultImage = '../../../../../../../../../assets/img/washing-machine.jpg';

  isEdit = false;

  constructor(private _modalCtrl: ModalController, public servicesService: ServicesService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    console.log(this.servicesService.serviceForm.value, 'valorrr');
    if (this.servicesService.serviceForm.get('$key').value) {
      this.isEdit = true;
    }
  }

  submitForm() {
    if (!this.servicesService.serviceForm.get('image').value) {
      this.servicesService.serviceForm
        .get('image')
        .setValue('../../../../../../../../../assets/img/washing-machine.jpg');
    }
    if (!this.servicesService.serviceForm.get('$key').value) {
      this.servicesService.insertService(this.servicesService.serviceForm.value);
    } else {
      this.servicesService.updateService(this.servicesService.serviceForm.value);
    }
    this._modalCtrl.dismiss();
  }
}
