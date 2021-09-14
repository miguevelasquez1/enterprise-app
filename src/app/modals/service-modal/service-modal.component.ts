import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { HomeService } from 'src/app/services/home.service';
import { PopoverImagesComponent } from './components/popover-images/popover-images.component';

@Component({
  selector: 'app-service-modal',
  templateUrl: './service-modal.component.html',
  styleUrls: ['./service-modal.component.scss'],
})
export class ServiceModalComponent implements OnInit {

  public image = true;
  public description: string;

  constructor(
    public homeService: HomeService,
    private popoverController: PopoverController,
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  async presentPopoverImages(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverImagesComponent,
      cssClass: 'my-custom-class',
      mode: 'ios',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
  }

  dismiss() {
    this.modalController.dismiss({
      dissmised: true
    })
  }

  public noImage() {
    this.image = false;
  }

}
