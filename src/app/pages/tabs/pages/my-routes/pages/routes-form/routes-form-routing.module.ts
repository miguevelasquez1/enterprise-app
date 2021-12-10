import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoutesFormPage } from './routes-form.page';

const routes: Routes = [
  {
    path: '',
    component: RoutesFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutesFormPageRoutingModule {}
