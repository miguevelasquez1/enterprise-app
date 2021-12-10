import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TypeAPasswordPageRoutingModule } from './type-a-password-routing.module';

import { TypeAPasswordPage } from './type-a-password.page';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    TypeAPasswordPageRoutingModule
  ],
  declarations: [TypeAPasswordPage]
})
export class TypeAPasswordPageModule {}
