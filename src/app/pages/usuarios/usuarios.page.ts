import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/interfaces/user.interface';
import { AuthService } from '../../shared/services/auth/auth.service';
import { UsersService } from './services/users/users.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  list = [];

  tecnico: boolean;

  filterRegistro = '';

  constructor(public authService: AuthService, public usersService: UsersService) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(): void {
    this.authService.isAuth2().subscribe((auth: User) => {
      console.log(auth);
    });
  }
}
