import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CouponFormPage } from './coupon-form.page';

const routes: Routes = [
  {
    path: '',
    component: CouponFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CouponFormPageRoutingModule {}
