import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { FormComponent } from './components/form/form.component';
import { InventoryFormPage } from './inventory-form.page';
import { InventoryFormPageRoutingModule } from './inventory-form-routing.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    TranslateModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    InventoryFormPageRoutingModule,
  ],
  declarations: [FormComponent, InventoryFormPage],
})
export class InventoryFormPageModule {}
