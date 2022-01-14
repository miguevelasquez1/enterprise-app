import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyRoutesPage } from './my-routes.page';

const routes: Routes = [
  {
    path: '',
    component: MyRoutesPage
  },
  {
    path: 'routes-form',
    loadChildren: () => import('./pages/routes-form/routes-form.module').then( m => m.RoutesFormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyRoutesPageRoutingModule {}
