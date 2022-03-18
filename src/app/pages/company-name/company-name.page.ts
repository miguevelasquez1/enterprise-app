import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-company-name',
  templateUrl: './company-name.page.html',
  styleUrls: ['./company-name.page.scss'],
})
export class CompanyNamePage implements OnInit {

  constructor(public globals: Globals, public authService: AuthService) { }

  ngOnInit() {
  }

}
