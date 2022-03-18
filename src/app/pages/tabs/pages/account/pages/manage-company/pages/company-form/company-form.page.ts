import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Company } from 'src/app/models/company';
import { CompanyService } from '../../services/company/company.service';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.page.html',
  styleUrls: ['./company-form.page.scss'],
})
export class CompanyFormPage implements OnInit {
  companyInitialValue: Company;

  hasChange = false;

  constructor(
    public companyService: CompanyService,
    private _translate: TranslateService,
    private _authService: AuthService,
    private _toastCtrl: ToastController,
  ) {}

  async ngOnInit() {
    await this._getCompanyData();
  }

  private async _getCompanyData() {
    const user = await this._authService.getUser();
    const company = await this._authService.getCurrentCompanyByEmail(user.uid, user.email);

    this.companyService.companyForm.patchValue({
      name: company.name,
      email: company.email,
      description: company.description,
    });
    this.companyInitialValue = this.companyService.companyForm.value;
    this.companyService.companyForm.valueChanges.subscribe(e => {
      this.hasChange = Object.keys(this.companyInitialValue).some(
        key => e[key] !== this.companyInitialValue[key],
      );
    });
  }

  async updateCompanyData(): Promise<void> {
    await this.companyService.updateCompanyData();
    this.companyInitialValue = this.companyService.companyForm.value;
    this.hasChange = false;
    const toast = await this._toastCtrl.create({
      message: `${this._translate.instant('manage-company.saved-successfully')}`,
      duration: 2000,
      cssClass: 'ion-text-center',
    });
    await toast.present();
  }
}
