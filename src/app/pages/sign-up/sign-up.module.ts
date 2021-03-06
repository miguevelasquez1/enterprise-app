import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Globals } from 'src/app/globals';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { SignUpPage } from './sign-up.page';
import { SignUpPageRoutingModule } from './sign-up-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpPageRoutingModule,
  ],
  declarations: [SignUpPage],
  providers: [Globals]
})
export class SignUpPageModule {}
