import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuariosPageRoutingModule } from './usuarios-routing.module';

import { UsuariosPage } from './usuarios.page';

import { FilterPipe } from '../../../../pipes/filter.pipe';
import { ReversePipe } from '../../../../pipes/reverse.pipe';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    UsuariosPageRoutingModule
  ],
  declarations: [FilterPipe, ReversePipe, UsuariosPage]
})
export class UsuariosPageModule {}
