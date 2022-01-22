import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonRouterOutlet, IonicModule } from '@ionic/angular';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RequestFormPage } from './request-form.page';
import { RequestFormPageRoutingModule } from './request-form-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RequestFormPageRoutingModule,
  ],
  declarations: [RequestFormPage],
})
export class RequestFormPageModule {}
