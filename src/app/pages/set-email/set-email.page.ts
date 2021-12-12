import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-set-email',
  templateUrl: './set-email.page.html',
  styleUrls: ['./set-email.page.scss'],
})
export class SetEmailPage implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  testMethod(): void {}
}
