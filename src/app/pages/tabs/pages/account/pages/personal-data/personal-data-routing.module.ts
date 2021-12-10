import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { PersonalDataPage } from './personal-data.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalDataPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalDataPageRoutingModule {}
