import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

import { AuthService } from '../../shared/services/auth/auth.service';
import { IonCard } from '@ionic/angular';

@Component({
  selector: 'app-select-your-service',
  templateUrl: './select-your-service.page.html',
  styleUrls: ['./select-your-service.page.scss'],
})
export class SelectYourServicePage implements OnInit {
  public services = [
    'Technical Service',
    'Laundry Service',
    'Cleaning Service',
    'Electrician Service',
    'Babysitting Service',
    'Gardener Service',
  ];

  public selectedCard = '';

  @ViewChild(IonCard) ionCards: QueryList<IonCard>;

  constructor(public authService: AuthService) {}

  ngOnInit() {}

  selectCard(service) {
    this.selectedCard = service;
  }
}
