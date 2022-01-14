import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rutas-list',
  templateUrl: './rutas-list.page.html',
  styleUrls: ['./rutas-list.page.scss'],
})
export class RutasListPage implements OnInit {
  isAdmin: boolean;
  registroList = [];
  userList = [];
  userUid: string;
  userName: string;
  filterRegistro = '';

  constructor() {}

  ngOnInit(): void {
    // this.registroService.getRegistros().subscribe(list => {
    //     this.registroList = list.map(item => ({
    //         $key: item.key,
    //         ...item.payload.val(),
    //     }));
    // });
  }

  onDelete(): void {
    // if (confirm('¿Estas seguro de que quieres eliminarlo?')) {
    //     this.registroService.deleteRegistro($key);
    // }
  }

  newForm(): void {
    // this.registroService.form.reset();
    // this.registroService.selectedRegistro = new Registro();
  }
}
