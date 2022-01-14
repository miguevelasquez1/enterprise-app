import { RouterModule, Routes } from '@angular/router';

import { InventoryFormPage } from './inventory-form.page';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: InventoryFormPage,
  },
  {
    path: 'show-images',
    loadChildren: () =>
      import('./components/show-images/show-images.module').then(m => m.ShowImagesPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryFormPageRoutingModule {}
