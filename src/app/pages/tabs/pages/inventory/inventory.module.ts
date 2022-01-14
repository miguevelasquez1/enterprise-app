import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryPage } from './inventory.page';
import { InventoryPageRoutingModule } from './inventory-routing.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [TranslateModule, CommonModule, FormsModule, IonicModule, InventoryPageRoutingModule],
  declarations: [InventoryPage],
})
export class InventoryPageModule {}
