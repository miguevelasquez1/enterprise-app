import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { ServicesPage } from './services.page';

const routes: Routes = [
  {
    path: '',
    component: ServicesPage,
  },
  {
    path: 'service-form',
    loadChildren: () =>
      import('./modals/service-form/service-form.module').then(m => m.ServiceFormPageModule),
  },
  {
    path: 'request-form',
    loadChildren: () =>
      import('./modals/request-form/request-form.module').then(m => m.RequestFormPageModule),
  },
  {
    path: 'notifications',
    loadChildren: () =>
      import('./pages/notifications/notifications.module').then(m => m.NotificationsPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesPageRoutingModule {}
