import { Component, Input, OnInit } from '@angular/core';
import {
  IonRouterOutlet,
  ModalController,
  PickerController,
  ToastController,
} from '@ionic/angular';

import { AddressesPage } from './modals/addresses/addresses.page';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { RequestService } from './services/request/request.service';
import { Service } from '../../models/service';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.page.html',
  styleUrls: ['./request-form.page.scss'],
})
export class RequestFormPage implements OnInit {
  @Input() service: Service;

  address: string;

  phoneOrderFocus = false;

  showAddressDanger = false;

  constructor(
    private _authService: AuthService,
    public requestService: RequestService,
    private _modalCtrl: ModalController,
    private _toastCtrl: ToastController,
  ) {}

  async ngOnInit() {
    const user = await this._authService.getUser();
    this._authService.getCustomers().subscribe(data => {
      data.forEach(customer => {
        if (customer.$key === user.uid) {
          this.address = customer.addressSelected;
          this.requestService.requestForm.get('address').setValue(customer.addressSelected);
        }
      });
    });
  }

  async sendRequest() {
    console.log(this.service, 'serviceeee');
    if (this.requestService.requestForm.get('address').invalid) {
      this.showAddressDanger = true;
    } else {
      await this.requestService.insertRequest({
        ...this.requestService.requestForm.value,
        address: this.address,
      });
      this.requestService.requestForm.get('hostUid').setValue(this.service.hostUid);
      this.requestService.requestForm.get('serviceTitle').setValue(this.service.title);

      this.requestService.sendRequestToHost(
        this.requestService.requestForm.value,
        this.service.isCompany,
      );
      this.dismissModal();
      this.requestService.requestForm.reset();
      const toast = await this._toastCtrl.create({
        message: 'Request sent',
        cssClass: 'ion-text-center',
        color: 'tertiary',
        duration: 1000,
        position: 'top',
      });
      console.log(this.requestService.requestForm.value, 'requestForm');
      return await toast.present();
    }
  }

  async presentAddressesModal() {
    const modal = await this._modalCtrl.create({
      component: AddressesPage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
    });
    return await modal.present();
  }

  dismissModal() {
    this._modalCtrl.dismiss();
  }
}
