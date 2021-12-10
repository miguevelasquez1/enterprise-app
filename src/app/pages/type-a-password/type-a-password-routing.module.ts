import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TypeAPasswordPage } from './type-a-password.page';

const routes: Routes = [
  {
    path: '',
    component: TypeAPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypeAPasswordPageRoutingModule {}
