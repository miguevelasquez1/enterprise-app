import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-choose-category',
  templateUrl: './choose-category.page.html',
  styleUrls: ['./choose-category.page.scss'],
})
export class ChooseCategoryPage implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

  public selectOne(e, option) {
    if (option === 'company' && e) {
      this.authService.authForm.get('person').setValue(false);
    } else if (option === 'person' && e) {
      this.authService.authForm.get('company').setValue(false);
    }
  }

  public selectForm() {
    this.authService.authForm.get('person').value ? this.authService.isPersonForm = true : this.authService.isPersonForm = false;
  }

}
