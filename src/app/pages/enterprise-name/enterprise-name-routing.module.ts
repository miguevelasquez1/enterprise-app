import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnterpriseNamePage } from './enterprise-name.page';

const routes: Routes = [
  {
    path: '',
    component: EnterpriseNamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterpriseNamePageRoutingModule {}
