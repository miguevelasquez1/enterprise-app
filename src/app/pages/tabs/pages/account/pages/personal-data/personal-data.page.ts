import { AlertController, PopoverController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../../../../../../shared/services/auth/auth.service';
import { IUser } from '../../../../../../shared/interfaces/user.interface';
import { Observable } from 'rxjs';
import { PopoverProfileImageComponent } from './components/popover-profile-image/popover-profile-image.component';
import { Router } from '@angular/router';
import { UsersService } from '../../../../../../shared/services/users/users.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.page.html',
  styleUrls: ['./personal-data.page.scss'],
})
export class PersonalDataPage {
  private photoFile: Blob;
  public photoUrl: any;
  public name: string;
  public uploadPercent: Observable<number | undefined>;

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  constructor(
    public usersService: UsersService,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private storage: AngularFireStorage,
    private angularFirestore: AngularFirestore,
    private router: Router,
    private alertController: AlertController,
    private popoverController: PopoverController,
  ) {}

  ionViewWillEnter(): void {
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.authService.isAuth2().subscribe((auth: IUser) => {
      if (auth === null) {
        this.usersService.userForm.setValue({
          $key: '',
          name: '',
          email: '',
          urlImage: '',
        });
        this.photoUrl = '';
      } else {
        const { displayName, email, uid } = auth;
        let { photoUrl } = auth;
        if (!photoUrl) {
          photoUrl = '../../../../../../../assets/img/default-picture.png';
        }
        this.usersService.userForm.setValue({
          $key: uid,
          name: displayName,
          email,
          urlImage: photoUrl,
        });
        this.name = displayName;
        this.photoUrl = photoUrl;
      }
    });
  }

  getImgContent(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(this.photoUrl);
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
      this.photoUrl = reader.result;
    };
    reader.readAsDataURL(this.photoFile);
  }

  onSubmitUpdate(user: IUser): void {
    this.authService.isAuth2().subscribe((auth: any) => {
      if (auth) {
        const filePath = `users/${auth.uid}`;
        const ref = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, this.photoFile);
        this.uploadPercent = task.percentageChanges();
        task
          .snapshotChanges()
          .pipe(
            finalize(() => {
              ref.getDownloadURL().subscribe(url => {
                auth.updateProfile({
                  displayName: user.displayName,
                  photoURL: url,
                });
              });
            }),
          )
          .subscribe();
      }
    });

    this.router.navigate(['/home/account']);
  }

  async presentAlertConfirm(user: IUser): Promise<void> {
    const alert = await this.alertController.create({
      header: '¿Deseas Confirmar?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.getCurrentUser();
          },
        },
        {
          text: 'Okay',
          handler: () => {
            this.onSubmitUpdate(user);
          },
        },
      ],
    });

    await alert.present();
  }

  async presentPopoverProfileImage(ev: Event): Promise<void> {
    const popover = await this.popoverController.create({
      component: PopoverProfileImageComponent,
      cssClass: 'my-custom-class',
      mode: 'ios',
      event: ev,
      translucent: true,
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
  }
}
