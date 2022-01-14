import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  darkMode = true;

  constructor(
    private menu: MenuController,
    private authService: AuthService,
    private router: Router,
  ) {}

  public isAdmin: boolean;
  public isEmployee: boolean;
  public userUid: string = null;

  ngOnInit(): void {
    this.getRole();
  }

  getRole(): void {
    this.authService.isAuth().subscribe(auth => {});
  }

  cambio(): void {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark');
  }

  async signOut(): Promise<void> {
    try {
      console.log('pasa');
      await this.authService.signOut();
      console.log('a');
      this.router.navigate(['/welcome-slide']);
    } catch (err) {
      console.log(err, 'errorsillow -----------');
    }
  }
}
