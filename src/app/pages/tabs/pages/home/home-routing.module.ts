import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home.page';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'change-name-modal',
    loadChildren: () =>
      import('./modals/change-name-modal/change-name-modal.module').then(
        m => m.ChangeNameModalPageModule,
      ),
  },
  {
    path: 'service-modal',
    loadChildren: () =>
      import('./modals/service-modal/service-modal.module').then(m => m.ServiceModalPageModule),
  },
  {
    path: 'services',
    loadChildren: () => import('./pages/services/services.module').then(m => m.ServicesPageModule),
  },
  {
    path: 'coupons',
    loadChildren: () => import('./pages/coupons/coupons.module').then(m => m.CouponsPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
