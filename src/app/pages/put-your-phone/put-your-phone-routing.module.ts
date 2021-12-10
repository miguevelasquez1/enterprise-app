import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PutYourPhonePage } from './put-your-phone.page';

const routes: Routes = [
  {
    path: '',
    component: PutYourPhonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PutYourPhonePageRoutingModule {}
