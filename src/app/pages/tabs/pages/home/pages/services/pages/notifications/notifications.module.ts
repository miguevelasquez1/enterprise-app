import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { NotificationsPage } from './notifications.page';
import { NotificationsPageRoutingModule } from './notifications-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationsPageRoutingModule,
  ],
  declarations: [NotificationsPage],
})
export class NotificationsPageModule {}
