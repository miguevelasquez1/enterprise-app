import { IonRouterOutlet, IonicModule } from '@ionic/angular';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RequestFormPageModule } from './modals/request-form/request-form.module';
import { ServiceComponent } from './components/service/service.component';
import { ServicesPage } from './services.page';
import { ServicesPageRoutingModule } from './services-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [TranslateModule, CommonModule, FormsModule, IonicModule, ServicesPageRoutingModule],
  declarations: [ServiceComponent, ServicesPage],
  providers: [IonRouterOutlet],
})
export class ServicesPageModule {}
