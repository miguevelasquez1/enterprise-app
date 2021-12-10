import { Component, OnInit } from '@angular/core';

import { InventoryService } from 'src/app/shared/services/inventory/inventory.service';

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.page.html',
  styleUrls: ['./inventory-form.page.scss'],
})
export class InventoryFormPage implements OnInit {
  /**
   * @param inventarioService service
   */
  constructor(public inventarioService: InventoryService) {}

  ngOnInit(): void {}
}
