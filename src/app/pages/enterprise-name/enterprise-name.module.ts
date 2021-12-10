import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnterpriseNamePageRoutingModule } from './enterprise-name-routing.module';

import { EnterpriseNamePage } from './enterprise-name.page';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    EnterpriseNamePageRoutingModule
  ],
  declarations: [EnterpriseNamePage]
})
export class EnterpriseNamePageModule {}
