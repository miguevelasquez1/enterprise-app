import { RouterModule, Routes } from '@angular/router';

import { ManageCompanyPage } from './manage-company.page';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: ManageCompanyPage,
    children: [
      {
        path: '',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./pages/company-form/company-form.module').then(m => m.CompanyFormPageModule),
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageCompanyPageRoutingModule {}
