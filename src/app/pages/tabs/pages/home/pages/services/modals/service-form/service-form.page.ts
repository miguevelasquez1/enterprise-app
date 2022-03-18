import { Camera, CameraResultType } from '@capacitor/camera';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';

import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ServicesService } from '../../services/services/services.service';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./service-form.page.scss'],
})
export class ServiceFormPage implements OnInit {
  imageExample: string | ArrayBuffer = '../../../../../../../../../assets/img/tools.jpg';

  image: Blob;

  isCompany: boolean;

  constructor(
    private _authService: AuthService,
    private _cdRef: ChangeDetectorRef,
    private _modalCtrl: ModalController,
    public servicesService: ServicesService,
    private _loadingCtrl: LoadingController,
  ) {}

  async ngOnInit(): Promise<void> {
    await this._setValues();
    this.isCompany = await this._authService.isCompany();
  }

  async setImage(): Promise<void> {
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
        this.servicesService.serviceForm.get('image').setValue(reader.result);
        this._cdRef.markForCheck();
      };
    } catch (err) {
      console.log(err, 'err');
    }
  }

  async submitForm(): Promise<void> {
    const loading = await this._loadingCtrl.create({
      spinner: 'bubbles',
      translucent: true,
    });
    await loading.present();
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
      } else if (!this.servicesService.serviceForm.get('$key').value) {
        this.servicesService.serviceForm
          .get('image')
          .setValue('../../../../../../../../../assets/img/tools.jpg');
      }
      console.log(this.servicesService.serviceForm.value, 'valor');
      this.servicesService.updateService({
        ...this.servicesService.serviceForm.value,
        $key: res,
      });
      this._modalCtrl.dismiss();
      this.servicesService.serviceForm.reset();
      this._loadingCtrl.dismiss();
    });
  }

  changePrice(): void {
    if (this.servicesService.serviceForm.get('price').value === '0') {
      this.servicesService.serviceForm.get('price').setValue('');
    } else {
      this.servicesService.serviceForm.get('price').setValue('0');
    }
  }

  private async _setValues() {
    const user = await this._authService.getUser();
    console.log(user, 'user');
    this.servicesService.serviceForm.get('author').setValue(user.displayName);
    const isCompany = await this._authService.isCompany();
    this.servicesService.serviceForm.get('isCompany').setValue(isCompany);
    console.log(isCompany, 'isCompany');
    if (isCompany) {
      const company = await this._authService.getCurrentCompanyByEmail(user.uid, user.email);
      this.servicesService.serviceForm.get('hostUid').setValue(company.$key);
    } else {
      this.servicesService.serviceForm.get('hostUid').setValue(user.uid);
    }
  }
}
