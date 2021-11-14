import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-set-email',
  templateUrl: './set-email.page.html',
  styleUrls: ['./set-email.page.scss'],
})
export class SetEmailPage implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

  testMethod() {
    console.log(this.authService.authForm.value, 'authValue');
  }

}
