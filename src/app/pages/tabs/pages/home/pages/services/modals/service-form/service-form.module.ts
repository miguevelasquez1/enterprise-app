import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { ServiceFormPage } from './service-form.page';
import { ServiceFormPageRoutingModule } from './service-form-routing.module';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceFormPageRoutingModule,
  ],
  declarations: [ServiceFormPage],
})
export class ServiceFormPageModule {}
