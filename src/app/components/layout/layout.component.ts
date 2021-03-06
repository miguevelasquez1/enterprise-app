import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { HomePage } from 'src/app/pages/home/home.page';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {

  darkMode = true;

  constructor(
    public homePage: HomePage,
    private menu: MenuController,
    private authService: AuthService
  ) { }

  public isAdmin: boolean;
  public isEmployee: boolean;
  public userUid: string = null;

  ngOnInit() {
    this.getRole();
  }

  getRole() {
    this.authService.isAuth2().subscribe(auth => {
    });
  }

  cambio() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle( 'dark' );
  }


}
