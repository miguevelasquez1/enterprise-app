import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectYourServicePageRoutingModule } from './select-your-service-routing.module';

import { SelectYourServicePage } from './select-your-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectYourServicePageRoutingModule
  ],
  declarations: [SelectYourServicePage]
})
export class SelectYourServicePageModule {}
