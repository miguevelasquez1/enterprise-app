import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceModalPageRoutingModule } from './service-modal-routing.module';

import { ServiceModalPage } from './service-modal.page';
import { InternetImagesModalComponent } from './components/internet-images-modal/internet-images-modal.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ServiceModalPageRoutingModule],
  declarations: [InternetImagesModalComponent, ServiceModalPage],
})
export class ServiceModalPageModule {}
