import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChooseCategoryPage } from './choose-category.page';
import { ChooseCategoryPageRoutingModule } from './choose-category-routing.module';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ChooseCategoryPageRoutingModule,
  ],
  declarations: [ChooseCategoryPage],
})
export class ChooseCategoryPageModule {}
