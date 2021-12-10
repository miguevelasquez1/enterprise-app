import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { RoutesFormPage } from './routes-form.page';
import { RoutesFormPageRoutingModule } from './routes-form-routing.module';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RoutesFormPageRoutingModule,
  ],
  declarations: [RoutesFormPage],
})
export class RoutesFormPageModule {}
