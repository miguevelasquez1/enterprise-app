import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalDataPageRoutingModule } from './personal-data-routing.module';

import { PersonalDataPage } from './personal-data.page';
import { PopoverProfileImageComponent } from './components/popover-profile-image/popover-profile-image.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PersonalDataPageRoutingModule,
  ],
  declarations: [PopoverProfileImageComponent, PersonalDataPage],
})
export class PersonalDataPageModule {}
