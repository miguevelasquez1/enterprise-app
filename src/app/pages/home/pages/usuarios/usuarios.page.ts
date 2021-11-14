import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { UsersService } from '../../../../services/users.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  list = [];
  tecnico;

  constructor(
    public authService: AuthService,
    public usersService: UsersService
  ) { }

  filterRegistro = '';

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth2().subscribe(auth => {
    });
  }

  isEmployee() {
  }

}
