import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { ServiceComponent } from './components/service/service.component';
import { ServicesPage } from './services.page';
import { ServicesPageRoutingModule } from './services-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ServicesPageRoutingModule],
  declarations: [ServiceComponent, ServicesPage],
})
export class ServicesPageModule {}
