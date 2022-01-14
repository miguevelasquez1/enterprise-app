import { RouterModule, Routes } from '@angular/router';

import { AccountPage } from './account.page';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: AccountPage,
  },
  {
    path: 'personal-data',
    loadChildren: () =>
      import('./pages/personal-data/personal-data.module').then(m => m.PersonalDataPageModule),
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountPageRoutingModule {}
