import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { UsersService } from '../../../../services/users.service';

import { CameraResultType, Plugins } from '@capacitor/core';
import { DomSanitizer } from '@angular/platform-browser';
const { Camera } = Plugins;


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

  constructor(
    public usersService: UsersService,
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getCurrentUser();
    this.getRole();
  }

  private getRole() {
    this.authService.isAuth2().subscribe(auth => {
    });
  }

  private getCurrentUser() {
    this.authService.isAuth2().subscribe(auth => {
      if (auth === null) {
        this.usersService.userForm.setValue({
          $key: '',
          name: '',
          email: '',
          urlImage: ''
        });
        this.photoUrl = '';
      } else {
        const { displayName, email, uid } = auth;
        let { photoURL } = auth;
        if (!photoURL) {
          photoURL = '../../../../../assets/images/user.png';
        }
        this.usersService.userForm.setValue({
          $key: uid,
          name: displayName,
          email,
          urlImage: photoURL
        });
        this.name = displayName;
        this.photoUrl = photoURL;
      }
    });
  }

  public async doRefresh(event) {
    await this.getCurrentUser();
    setTimeout(() => {
      event.target.complete();
    }, 200);
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });

    this.photoUrl = image.webPath;
  }

  getImgContent() {
    return this.sanitizer.bypassSecurityTrustUrl(this.photoUrl);
  }

}
