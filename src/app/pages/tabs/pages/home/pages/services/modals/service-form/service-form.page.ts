import { Camera, CameraResultType } from '@capacitor/camera';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';

import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ServicesService } from '../../services/services/services.service';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.page.html',
  styleUrls: ['./service-form.page.scss'],
})
export class ServiceFormPage implements OnInit {
  imageExample: string | ArrayBuffer = '../../../../../../../../../assets/img/washing-machine.jpg';

  image: Blob;

  isEdit = false;

  constructor(
    private _authService: AuthService,
    private _modalCtrl: ModalController,
    public servicesService: ServicesService,
    private _loadingCtrl: LoadingController,
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    if (this.servicesService.serviceForm.get('$key').value) {
      this.isEdit = true;
    }
  }

  async setImage() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
      });
      const rawData = atob(image.base64String);
      const bytes = new Array(rawData.length);
      for (let x = 0; x < rawData.length; x++) {
        bytes[x] = rawData.charCodeAt(x);
      }
      const arr = new Uint8Array(bytes);
      this.image = new Blob([arr], { type: 'image/png' });
      const reader = new FileReader();
      reader.readAsDataURL(this.image);
      reader.onloadend = () => {
        this.imageExample = reader.result;
      };
    } catch (err) {
      console.log(err, 'err');
    }
  }

  async submitForm() {
    const loading = await this._loadingCtrl.create({
      spinner: 'bubbles',
      translucent: true,
    });
    await await loading.present();
    await this._setValues();
    return new Promise(resolve => {
      if (!this.servicesService.serviceForm.get('$key').value) {
        resolve(this.servicesService.insertService(this.servicesService.serviceForm.value));
      } else {
        resolve(this.servicesService.updateService(this.servicesService.serviceForm.value));
      }
    }).then(async (res: string) => {
      if (this.image) {
        const url = await this.servicesService.uploadPhotoToFirebase(res, this.image);
        this.servicesService.serviceForm.get('image').setValue(url);
      } else {
        this.servicesService.serviceForm
          .get('image')
          .setValue('../../../../../../../../../assets/img/washing-machine.jpg');
      }
      await this.servicesService.updateService({
        ...this.servicesService.serviceForm.value,
        $key: res,
      });
      this._modalCtrl.dismiss();
      this.servicesService.serviceForm.reset();
      this._loadingCtrl.dismiss();
    });
  }

  private async _setValues() {
    const user = await this._authService.getUser();
    this.servicesService.serviceForm.get('author').setValue(user.displayName);
    const isCompany = await this._authService.isCompany();
    this.servicesService.serviceForm.get('isCompany').setValue(isCompany);
    this.servicesService.serviceForm.get('hostUid').setValue(user.uid);
  }
}
