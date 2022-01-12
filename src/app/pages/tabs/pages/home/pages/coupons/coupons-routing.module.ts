import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CouponsPage } from './coupons.page';

const routes: Routes = [
  {
    path: '',
    component: CouponsPage
  },
  {
    path: 'coupon-form',
    loadChildren: () => import('./modals/coupon-form/coupon-form.module').then( m => m.CouponFormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CouponsPageRoutingModule {}
