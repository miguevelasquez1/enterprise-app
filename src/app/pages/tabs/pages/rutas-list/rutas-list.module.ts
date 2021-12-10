import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RutasListPageRoutingModule } from './rutas-list-routing.module';

import { RutasListPage } from './rutas-list.page';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    Ng2SearchPipeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RutasListPageRoutingModule,
  ],
  declarations: [RutasListPage],
})
export class RutasListPageModule {}
