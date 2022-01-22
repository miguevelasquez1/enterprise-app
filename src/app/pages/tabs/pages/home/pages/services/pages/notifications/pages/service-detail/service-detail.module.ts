import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { ServiceDetailPage } from './service-detail.page';
import { ServiceDetailPageRoutingModule } from './service-detail-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ServiceDetailPageRoutingModule,
  ],
  declarations: [ServiceDetailPage],
})
export class ServiceDetailPageModule {}
