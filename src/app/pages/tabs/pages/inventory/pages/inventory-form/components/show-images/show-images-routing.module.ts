import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowImagesPage } from './show-images.page';

const routes: Routes = [
  {
    path: '',
    component: ShowImagesPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowImagesPageRoutingModule {}
