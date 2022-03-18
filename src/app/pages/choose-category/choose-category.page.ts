import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-category',
  templateUrl: './choose-category.page.html',
  styleUrls: ['./choose-category.page.scss'],
})
export class ChooseCategoryPage implements OnInit {
  option = '';

  constructor(public authService: AuthService, private _router: Router) {}

  ngOnInit(): void {}

  public selectOne(e: any, option: string): void {
    this.option = option;
    if (this.option === 'company' && e.detail.checked) {
      this.authService.authForm.get('person').setValue(false);
      this.authService.authForm.get('employee').setValue(false);
    } else if (this.option === 'person' && e.detail.checked) {
      this.authService.authForm.get('company').setValue(false);
      this.authService.authForm.get('employee').setValue(false);
    } else if (this.option === 'employee' && e.detail.checked) {
      this.authService.authForm.get('company').setValue(false);
      this.authService.authForm.get('person').setValue(false);
    }
  }

  public selectForm(): void {
    this.authService.isPersonForm = this.authService.authForm.get('person').value;
    if (this.authService.isPersonForm) {
      this._router.navigate(['/sign-up']);
    } else if (this.option === 'employee') {
      this._router.navigate(['/sign-up'], {
        queryParams: {
          type: 'employee',
        },
      });
    } else {
      this._router.navigate(['/company-name']);
    }
  }
}
