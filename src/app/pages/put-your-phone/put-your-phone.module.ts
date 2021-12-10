import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { PutYourPhonePage } from './put-your-phone.page';
import { PutYourPhonePageRoutingModule } from './put-your-phone-routing.module';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    PutYourPhonePageRoutingModule,
  ],
  declarations: [PutYourPhonePage],
})
export class PutYourPhonePageModule {}
