import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationsPage } from './notifications.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationsPage
  },
  {
    path: 'service-detail',
    loadChildren: () => import('./pages/service-detail/service-detail.module').then( m => m.ServiceDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationsPageRoutingModule {}
