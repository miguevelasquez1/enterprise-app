import { AlertController, PopoverController } from '@ionic/angular';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { AngularFireAuth } from '@angular/fire/compat/auth';
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
  public photoUrl: any;
  public name: string;
  public uploadPercent: Observable<number | undefined>;
  private photoFile: Blob;

  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  constructor(
    private afAuth: AngularFireAuth,
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
    this.authService.isAuth().subscribe((auth: IUser) => {
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
        let { photoURL } = auth;
        if (!photoURL) {
          photoURL = '../../../../../../../assets/img/default-picture.png';
        }
        this.usersService.userForm.setValue({
          $key: uid,
          name: displayName,
          email,
          urlImage: photoURL,
        });
        this.name = displayName;
        this.photoUrl = photoURL;
      }
    });
  }

  getImgContent(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(this.photoUrl);
  }

  onSubmitUpdate(user: IUser): void {
    this.authService.isAuth().subscribe((auth: any) => {
      if (auth) {
        console.log(auth, 'auth');
        const filePath = `users/${auth.uid}`;
        const ref = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, this.photoFile);
        this.uploadPercent = task.percentageChanges();
        task
          .snapshotChanges()
          .pipe(
            finalize(() => {
              ref.getDownloadURL().subscribe(url => {
                console.log(user, 'user');
                console.log(auth, 'auth');
                auth.updateProfile({
                  displayName: user.name,
                  photoURL: user.urlImage,
                });
              });
            }),
          )
          .subscribe();
      }
    });

    this.router.navigate(['/account']);
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
      componentProps: { imgUrl: this.photoUrl },
      component: PopoverProfileImageComponent,
      cssClass: 'my-custom-class',
      mode: 'ios',
      event: ev,
      translucent: true,
    });

    popover.onWillDismiss().then(dataReturned => {
      console.log(dataReturned, 'xs');
      this.photoUrl = dataReturned.data.imgUrl;
      this.photoFile = dataReturned.data.photoFile;
    });

    return await popover.present();
  }
}
