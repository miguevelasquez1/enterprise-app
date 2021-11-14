import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetEmailPageRoutingModule } from './set-email-routing.module';

import { SetEmailPage } from './set-email.page';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SetEmailPageRoutingModule
  ],
  declarations: [SetEmailPage]
})
export class SetEmailPageModule {}
