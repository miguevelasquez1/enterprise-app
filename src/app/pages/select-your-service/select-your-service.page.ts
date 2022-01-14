import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
<<<<<<< HEAD
import { IonCard } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
=======

import { AuthService } from '../../shared/services/auth/auth.service';
import { IonCard } from '@ionic/angular';
>>>>>>> intento

@Component({
  selector: 'app-select-your-service',
  templateUrl: './select-your-service.page.html',
  styleUrls: ['./select-your-service.page.scss'],
})
export class SelectYourServicePage implements OnInit {
<<<<<<< HEAD

=======
>>>>>>> intento
  public services = [
    'Technical Service',
    'Laundry Service',
    'Cleaning Service',
    'Electrician Service',
    'Babysitting Service',
<<<<<<< HEAD
    'Gardener Service'
=======
    'Gardener Service',
>>>>>>> intento
  ];

  public selectedCard = '';

  @ViewChild(IonCard) ionCards: QueryList<IonCard>;

<<<<<<< HEAD
  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
  }
=======
  constructor(public authService: AuthService) {}

  ngOnInit() {}
>>>>>>> intento

  selectCard(service) {
    this.selectedCard = service;
  }
<<<<<<< HEAD

=======
>>>>>>> intento
}
