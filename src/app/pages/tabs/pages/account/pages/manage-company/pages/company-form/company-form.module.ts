import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { CompanyFormPage } from './company-form.page';
import { CompanyFormPageRoutingModule } from './company-form-routing.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyFormPageRoutingModule,
  ],
  declarations: [CompanyFormPage],
})
export class CompanyFormPageModule {}
