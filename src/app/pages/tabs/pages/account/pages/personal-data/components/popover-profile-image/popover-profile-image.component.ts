import { Camera, CameraResultType } from '@capacitor/camera';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';

import { ImagePreviewPage } from '../../modals/image-preview/image-preview.page';

@Component({
  selector: 'app-popover-profile-image',
  templateUrl: './popover-profile-image.component.html',
  styleUrls: ['./popover-profile-image.component.scss'],
})
export class PopoverProfileImageComponent implements OnInit {
  @Input() imgUrl: string | ArrayBuffer;

  private photoFile: Blob;

  constructor(private modalCtrl: ModalController, private popoverCtrl: PopoverController) {}

  ngOnInit(): void {}

  async presentImagePreviewModal(): Promise<void> {
    const modal = await this.modalCtrl.create({
      componentProps: { imgUrl: this.imgUrl },
      component: ImagePreviewPage,
      cssClass: 'image-preview-modal',
    });
    return await modal.present();
  }

  async takePicture(): Promise<void> {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
    });

    const rawData = atob(image.base64String);
    const bytes = new Array(rawData.length);
    for (let x = 0; x < rawData.length; x++) {
      bytes[x] = rawData.charCodeAt(x);
    }
    const arr = new Uint8Array(bytes);
    this.photoFile = new Blob([arr], { type: 'image/png' });

    const reader = new FileReader();
    reader.onloadend = () => {
      this.imgUrl = reader.result;
      this.popoverCtrl.dismiss({ imgUrl: this.imgUrl, photoFile: this.photoFile });
    };
    reader.readAsDataURL(this.photoFile);
  }
}
