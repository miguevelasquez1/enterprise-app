import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  darkMode = true;

  constructor(private menu: MenuController, private authService: AuthService) {}

  public isAdmin: boolean;
  public isEmployee: boolean;
  public userUid: string = null;

  ngOnInit(): void {
    this.getRole();
  }

  getRole(): void {
    this.authService.isAuth2().subscribe(auth => {});
  }

  cambio(): void {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark');
  }
}
