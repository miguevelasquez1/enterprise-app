import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { ShowImagesPage } from './show-images.page';
import { ShowImagesPageRoutingModule } from './show-images-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ShowImagesPageRoutingModule],
  declarations: [ShowImagesPage],
})
export class ShowImagesPageModule {}
