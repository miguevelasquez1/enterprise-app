import { RouterModule, Routes } from '@angular/router';

import { HomePage } from './home.page';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'change-name-modal',
    loadChildren: () =>
      import('./modals/change-name-modal/change-name-modal.module').then(
        m => m.ChangeNameModalPageModule,
      ),
  },
  {
    path: 'service-modal',
    loadChildren: () =>
      import('./modals/service-modal/service-modal.module').then(m => m.ServiceModalPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
