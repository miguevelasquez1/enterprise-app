import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';

import { Coupon } from './models/coupon.model';
import { CouponFormPage } from './modals/coupon-form/coupon-form.page';
import { CouponsService } from './services/coupons/coupons.service';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.page.html',
  styleUrls: ['./coupons.page.scss'],
})
export class CouponsPage implements OnInit {
  coupons: Coupon[] = [];

  constructor(
    public globals: Globals,
    private _routerOutlet: IonRouterOutlet,
    private _couponsService: CouponsService,
    private _modalCtrl: ModalController,
  ) {}

  ngOnInit() {}

  async presentCouponFormModal(): Promise<void> {
    this._couponsService.couponForm.reset();
    const modal = await this._modalCtrl.create({
      component: CouponFormPage,
      swipeToClose: true,
      presentingElement: this._routerOutlet.nativeEl,
      cssClass: 'coupon-form-modal',
    });

    return await modal.present();
  }
}
