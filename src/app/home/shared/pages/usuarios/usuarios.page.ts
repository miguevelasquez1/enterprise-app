import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { User } from 'src/app/models/user';
import { FormGroup } from '@angular/forms';
import { UsersService } from '../../../../services/users.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  list = [];
  tecnico;

  constructor(
    private angularFirestore: AngularFirestore,
    public authService: AuthService,
    public usersService: UsersService
  ) { }

  filterRegistro = '';

  ngOnInit() {
    this.getCurrentUser();
    this.authService.getUsers()
    .subscribe(users => {
      this.list = users.map(user => {
        return {
          id: user.payload.doc.id,
          ...user.payload.doc.data() as User
        };
      });
    });
  }

  getCurrentUser() {
    this.authService.isAuth2().subscribe(auth => {
      if (auth !== null) {
        this.authService.isUser(auth.uid).subscribe(user => this.authService.currentUser = user);
      }
    });
  }

  isEmployee() {
    for (const user of this.list) {
      this.angularFirestore.collection('Servers').doc(this.authService.currentUser.server.name).collection('Users').doc(user.id).update({
        server: {
          admin: user.server.admin,
          employee: user.server.employee,
          name: user.server.name
        }
      });
    }
  }

}
