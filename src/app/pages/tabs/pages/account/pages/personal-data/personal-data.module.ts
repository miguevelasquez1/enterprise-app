import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { PersonalDataPage } from './personal-data.page';
import { PersonalDataPageRoutingModule } from './personal-data-routing.module';
import { PopoverProfileImageComponent } from './components/popover-profile-image/popover-profile-image.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PersonalDataPageRoutingModule,
  ],
  declarations: [PopoverProfileImageComponent, PersonalDataPage],
})
export class PersonalDataPageModule {}
