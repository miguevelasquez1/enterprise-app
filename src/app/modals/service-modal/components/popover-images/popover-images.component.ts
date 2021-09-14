import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HomeService } from 'src/app/services/home.service';
import { InternetImagesModalComponent } from '../internet-images-modal/internet-images-modal.component';

@Component({
  selector: 'app-popover-images',
  templateUrl: './popover-images.component.html',
  styleUrls: ['./popover-images.component.scss'],
})
export class PopoverImagesComponent implements OnInit {

  public result: string;

  constructor(
    private homeService: HomeService,
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  nose() {
    const options = {
      // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
      // selection of a single image, the plugin will return it.
      maximumImagesCount: 1,
      // max width and height to allow the images to be.  Will keep aspect
      // ratio no matter what.  So if both are 800, the returned image
      // will be at most 800 pixels wide and 800 pixels tall.  If the width is
      // 800 and height 0 the image will be 800 pixels wide if the source
      // is at least that wide.
      width: 800,
      height: 800,
      // quality of resized image, defaults to 100
      quality: 100
  };
    // this.imagePicker.getPictures(options).then((results) => {
    //   for (const result of results) {
    //     this.homeService.image = result;
    //       console.log('Image URI: ' + result);
    //   }
    // }, (err) => { });
  }

  async presentServiceModal() {
    const modal = await this.modalController.create({
      component: InternetImagesModalComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true
    });
    return await modal.present();
  }

}
