import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { WelcomeSlidePage } from './welcome-slide.page';
import { WelcomeSlidePageRoutingModule } from './welcome-slide-routing.module';

@NgModule({
  imports: [TranslateModule, CommonModule, FormsModule, IonicModule, WelcomeSlidePageRoutingModule],
  declarations: [WelcomeSlidePage],
})
export class WelcomeSlidePageModule {}
