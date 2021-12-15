import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { SettingsPage } from './settings.page';
import { SettingsPageRoutingModule } from './settings-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [TranslateModule, CommonModule, FormsModule, IonicModule, SettingsPageRoutingModule],
  declarations: [SettingsPage],
})
export class SettingsPageModule {}
