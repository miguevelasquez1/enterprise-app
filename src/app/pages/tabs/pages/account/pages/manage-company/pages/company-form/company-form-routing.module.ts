import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyFormPage } from './company-form.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyFormPageRoutingModule {}
