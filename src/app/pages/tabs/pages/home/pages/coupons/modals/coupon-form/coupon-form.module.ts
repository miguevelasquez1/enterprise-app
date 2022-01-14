import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CouponFormPageRoutingModule } from './coupon-form-routing.module';

import { CouponFormPage } from './coupon-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CouponFormPageRoutingModule
  ],
  declarations: [CouponFormPage]
})
export class CouponFormPageModule {}
