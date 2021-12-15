import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-choose-category',
  templateUrl: './choose-category.page.html',
  styleUrls: ['./choose-category.page.scss'],
})
export class ChooseCategoryPage implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit() {}

  public selectOne(e: any, option: string) {
    if (option === 'company' && e.detail.checked) {
      this.authService.authForm.get('person').setValue(false);
    } else if (option === 'person' && e.detail.checked) {
      this.authService.authForm.get('company').setValue(false);
    }
  }

  public selectForm(): void {
    this.authService.isPersonForm = this.authService.authForm.get('person').value;
  }
}
