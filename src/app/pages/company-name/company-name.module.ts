import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { CompanyNamePage } from './company-name.page';
import { CompanyNamePageRoutingModule } from './company-name-routing.module';
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
    CompanyNamePageRoutingModule
  ],
  declarations: [CompanyNamePage]
})
export class CompanyNamePageModule {}
