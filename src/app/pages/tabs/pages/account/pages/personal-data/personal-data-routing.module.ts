import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { PersonalDataPage } from './personal-data.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalDataPage,
  },
  {
    path: 'image-preview',
    loadChildren: () => import('./modals/image-preview/image-preview.module').then( m => m.ImagePreviewPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalDataPageRoutingModule {}
