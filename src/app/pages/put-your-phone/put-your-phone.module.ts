import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PutYourPhonePageRoutingModule } from './put-your-phone-routing.module';

import { PutYourPhonePage } from './put-your-phone.page';
import { SMS } from '@ionic-native/sms/ngx';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    PutYourPhonePageRoutingModule
  ],
  declarations: [PutYourPhonePage],
})
export class PutYourPhonePageModule {}
