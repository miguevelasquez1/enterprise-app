import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowImagesPageRoutingModule } from './show-images-routing.module';

import { ShowImagesPage } from './show-images.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ShowImagesPageRoutingModule],
  declarations: [ShowImagesPage],
})
export class ShowImagesPageModule {}
