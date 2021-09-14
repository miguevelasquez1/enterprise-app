import { Component, OnInit } from '@angular/core';
import { InventarioService } from 'src/app/services/inventario.service';

/**
 * Page for inventory form
 */
@Component({
  selector: 'app-inventario-form',
  templateUrl: './inventario-form.page.html',
  styleUrls: ['./inventario-form.page.scss'],
})
export class InventarioFormPage implements OnInit {

  /**
   * @param inventarioService service
   */
  constructor(
    public inventarioService: InventarioService
  ) {}

  ngOnInit() {}
}
