import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-enterprise-name',
  templateUrl: './enterprise-name.page.html',
  styleUrls: ['./enterprise-name.page.scss'],
})
export class EnterpriseNamePage implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

}
