import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ManageCompanyPage } from './manage-company.page';
import { ManageCompanyPageRoutingModule } from './manage-company-routing.module';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ManageCompanyPageRoutingModule,
  ],
  declarations: [ManageCompanyPage],
})
export class ManageCompanyPageModule {}
