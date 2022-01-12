import { CommonModule } from '@angular/common';
import { CouponComponent } from './components/coupon/coupon.component';
import { CouponsPage } from './coupons.page';
import { CouponsPageRoutingModule } from './coupons-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, CouponsPageRoutingModule],
  declarations: [CouponComponent, CouponsPage],
})
export class CouponsPageModule {}
