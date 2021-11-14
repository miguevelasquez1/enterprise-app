import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChooseCategoryPageRoutingModule } from './choose-category-routing.module';

import { ChooseCategoryPage } from './choose-category.page';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ChooseCategoryPageRoutingModule
  ],
  declarations: [ChooseCategoryPage]
})
export class ChooseCategoryPageModule {}
