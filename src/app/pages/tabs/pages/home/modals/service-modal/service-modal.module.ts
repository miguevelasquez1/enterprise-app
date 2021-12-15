import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InternetImagesModalComponent } from './components/internet-images-modal/internet-images-modal.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { PopoverImagesComponent } from './components/popover-images/popover-images.component';
import { ServiceModalPage } from './service-modal.page';
import { ServiceModalPageRoutingModule } from './service-modal-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ServiceModalPageRoutingModule],
  declarations: [PopoverImagesComponent, InternetImagesModalComponent, ServiceModalPage],
})
export class ServiceModalPageModule {}
