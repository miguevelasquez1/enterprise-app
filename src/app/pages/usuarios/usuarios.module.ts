import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuariosPageRoutingModule } from './usuarios-routing.module';

import { UsuariosPage } from './usuarios.page';

import { FilterPipe } from '../../shared/pipes/filter/filter.pipe';

@NgModule({
  imports: [ReactiveFormsModule, CommonModule, FormsModule, IonicModule, UsuariosPageRoutingModule],
  declarations: [FilterPipe, UsuariosPage],
})
export class UsuariosPageModule {}
