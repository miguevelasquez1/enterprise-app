import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeNameModalPageRoutingModule } from './change-name-modal-routing.module';

import { ChangeNameModalPage } from './change-name-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeNameModalPageRoutingModule
  ],
  declarations: [ChangeNameModalPage]
})
export class ChangeNameModalPageModule {}
