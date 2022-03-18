import { Address, Customer } from '../../../../../../../../../../shared/models/customer';
import { AlertController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { AddressService } from '../../services/address/address.service';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.page.html',
  styleUrls: ['./addresses.page.scss'],
})
export class AddressesPage implements OnInit {
  address = new FormControl('');
  addresses: Address[];
  addressSelected: string;

  constructor(
    private _authService: AuthService,
    private _alertCtrl: AlertController,
    private _modalCtrl: ModalController,
    private _addressService: AddressService,
  ) {}

  async ngOnInit() {
    const getAddresses = await this._addressService.getAddresses();
    getAddresses.subscribe(async addresses => {
      this.addresses = addresses;
      if (this.addresses.length === 1) {
        const user = await this._authService.getUser();
        await this._authService.updateCustomer({
          $key: user.uid,
          name: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          addressSelected: this.addresses[0].address,
        });
      }
      const customer = await this._authService.getCurrentCustomer();
      this.addressSelected = customer.addressSelected;
    });
  }

  dismissModal() {
    this._modalCtrl.dismiss();
  }

  addAddress() {
    this._addressService.insertAddress(this.address.value).then(async () => {
      if (this.addresses.length === 1) {
        const user = await this._authService.getUser();
        await this._authService.updateCustomer({
          $key: user.uid,
          name: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          addressSelected: this.addresses[0].address,
        });
        this.dismissModal();
      }
    });
  }

  async presentDeleteAlert($key: string) {
    const alert = await this._alertCtrl.create({
      header: 'Are you sure that you want delete it?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Yes',
          handler: () => {
            this._addressService.deleteAddress($key).then(async () => {
              if (this.addresses.length === 0) {
                const user = await this._authService.getUser();
                await this._authService.updateCustomer({
                  $key: user.uid,
                  name: user.displayName,
                  email: user.email,
                  phoneNumber: user.phoneNumber,
                  addressSelected: '',
                });
              }
            });
          },
        },
      ],
    });

    await alert.present();
  }

  async setAddress(e: any, address: string) {
    if (e.detail.checked) {
      const user = await this._authService.getUser();
      await this._authService.updateCustomer({
        $key: user.uid,
        name: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        addressSelected: address,
      });
    }
  }
}
