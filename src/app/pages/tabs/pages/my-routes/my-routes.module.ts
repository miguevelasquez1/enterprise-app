import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MyRoutesPage } from './my-routes.page';
import { MyRoutesPageRoutingModule } from './my-routes-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    TranslateModule,
    Ng2SearchPipeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    MyRoutesPageRoutingModule,
  ],
  declarations: [MyRoutesPage],
})
export class MyRoutesPageModule {}
