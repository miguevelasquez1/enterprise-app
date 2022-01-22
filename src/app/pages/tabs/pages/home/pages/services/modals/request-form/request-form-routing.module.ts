import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestFormPage } from './request-form.page';

const routes: Routes = [
  {
    path: '',
    component: RequestFormPage
  },
  {
    path: 'addresses',
    loadChildren: () => import('./modals/addresses/addresses.module').then( m => m.AddressesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestFormPageRoutingModule {}
