import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventarioFormPage } from './inventario-form.page';

const routes: Routes = [
  {
    path: '',
    component: InventarioFormPage
  },
  {
    path: 'show-images',
    loadChildren: () => import('./components/show-images/show-images.module').then( m => m.ShowImagesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventarioFormPageRoutingModule {}
