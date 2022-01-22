import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonRouterOutlet, IonicModule } from '@ionic/angular';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RequestFormPageModule } from '../request-form/request-form.module';
import { ServiceFormPage } from './service-form.page';
import { ServiceFormPageRoutingModule } from './service-form-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceFormPageRoutingModule,
  ],
  declarations: [ServiceFormPage],
})
export class ServiceFormPageModule {}
