import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddressesPage } from './addresses.page';
import { AddressesPageRoutingModule } from './addresses-routing.module';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    AddressesPageRoutingModule,
  ],
  declarations: [AddressesPage],
})
export class AddressesPageModule {}
