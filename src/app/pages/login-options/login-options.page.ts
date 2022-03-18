import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login-options',
  templateUrl: './login-options.page.html',
  styleUrls: ['./login-options.page.scss'],
})
export class LoginOptionsPage implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {}
}
