import { Camera, CameraResultType } from '@capacitor/camera';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { AuthService } from '../../../../shared/services/auth/auth.service';
import { IUser } from '../../../../shared/interfaces/user.interface';
import { UsersService } from '../../../../shared/services/users/users.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  public name: string;
  public email: string;
  public photoUrl: string;
  public occupation: string;
  public isAdmin = false;

  constructor(
    public usersService: UsersService,
    public authService: AuthService,
    private sanitizer: DomSanitizer,
  ) {}

  async ngOnInit() {}

  async ionViewWillEnter() {
    this.getCurrentUser();
    this.getRole();
    console.log(await this.authService.getCurrentPerson(), 'jmm');
    this.isAdmin = (await this.authService.getCurrentPerson()).isAdmin;
  }

  private getRole() {
    this.authService.isAuth().subscribe((auth: IUser) => {});
  }

  private getCurrentUser() {
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
          photoURL = '../../../../../assets/img/default-picture.png';
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

  public async doRefresh(event: any): Promise<void> {
    await this.getCurrentUser();
    setTimeout(() => {
      event.target.complete();
    }, 200);
  }

  async takePicture(): Promise<void> {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });

    this.photoUrl = image.webPath;
  }

  getImgContent(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(this.photoUrl);
  }
}
