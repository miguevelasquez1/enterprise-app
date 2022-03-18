import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginOptionsPage } from './login-options.page';
import { LoginOptionsPageRoutingModule } from './login-options-routing.module';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    IonicModule,
    LoginOptionsPageRoutingModule
  ],
  declarations: [LoginOptionsPage]
})
export class LoginOptionsPageModule {}
