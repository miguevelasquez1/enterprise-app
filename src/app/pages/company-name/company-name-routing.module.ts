import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyNamePage } from './company-name.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyNamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyNamePageRoutingModule {}
