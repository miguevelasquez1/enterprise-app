import { Component } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { HomeService } from '../../services/home.service';
import { PopoverImagesComponent } from './components/popover-images/popover-images.component';

@Component({
  selector: 'app-service-modal',
  templateUrl: './service-modal.page.html',
  styleUrls: ['./service-modal.page.scss'],
})
export class ServiceModalPage {
  public image = true;
  public description: string;

  constructor(
    public homeService: HomeService,
    private popoverController: PopoverController,
    private modalController: ModalController,
  ) {}

  async presentPopoverImages(ev: any): Promise<void> {
    const popover = await this.popoverController.create({
      component: PopoverImagesComponent,
      cssClass: 'my-custom-class',
      mode: 'ios',
      event: ev,
      translucent: true,
    });
    await popover.present();
  }

  dismiss(): void {
    this.modalController.dismiss({
      dissmised: true,
    });
  }

  public noImage(): void {
    this.image = false;
  }
}
