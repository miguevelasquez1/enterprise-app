import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Company } from 'src/app/models/company';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  companyRef: AngularFireObject<Company>;

  companyForm: FormGroup;

  constructor(
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _aFDB: AngularFireDatabase,
  ) {
    this._buildCompanyForm();
  }

  async updateCompanyData(): Promise<void> {
    const user = await this._authService.getUser();
    const company = await this._authService.getCurrentCompanyByEmail(user.uid, user.email);
    console.log(company, 'company');
    this.companyRef = this._aFDB.object(`companies/${company.$key}`);
    this.companyRef.update(this.companyForm.value);
  }

  private _buildCompanyForm(): void {
    this.companyForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      description: ['', []],
    });
  }
}
