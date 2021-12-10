import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectYourServicePage } from './select-your-service.page';

const routes: Routes = [
  {
    path: '',
    component: SelectYourServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectYourServicePageRoutingModule {}
