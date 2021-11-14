import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  showPrincipal = true;
  showDomesticos = false;
  showComerciales = false;
  showIndustriales = false;

  miniChat = false;

  chatKey = 'no te funciono cruck';

  public userUid: string;

  public isEmployee: boolean;

  constructor(
    // private chatService: ChatService,
    private menu: MenuController,
    private authService: AuthService
  ) { }

  ionViewWillEnter() {
    this.getRole();
    this.menu.enable(true);
  }

  private getRole() {
    setTimeout(() => {
      this.authService.isAuth2().subscribe(auth => {
        if (auth) {
          this.userUid = auth.uid;
        }
      });
    }, 1000);
  }

  onSubmitSignOut() {
    this.authService.signOut();
    this.menu.close('first');
  }

  onSubmit() {
    this.menu.close('first');
  }

  onSubmitDomestico() {
    this.menu.close('first');
    this.showPrincipal = false;
    this.showDomesticos = true;
    this.showComerciales = false;
    this.showIndustriales = false;
  }

  onSubmitComercial() {
    this.menu.close('first');
    this.showPrincipal = false;
    this.showDomesticos = false;
    this.showComerciales = true;
    this.showIndustriales = false;
  }

  onSubmitIndustrial() {
    this.menu.close('first');
    this.showPrincipal = false;
    this.showDomesticos = false;
    this.showComerciales = false;
    this.showIndustriales = true;
  }

  onSubmitPrincipal() {
    this.menu.close('first');
    this.showPrincipal = true;
    this.showDomesticos = false;
    this.showComerciales = false;
    this.showIndustriales = false;
  }

}


