import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  addRecordField() {
    this.records.push(this.createRecordField());
  }

  private createRecordField() {
    const recordField = this.formBuilder.group({
      $key: [null, []],
      userUid: [''],
      userName: [''],
      date: ['', []],
      employee: ['', [Validators.required]],
      client: ['', [Validators.required]],
      clientID: ['', [Validators.required]],
      service: ['', [Validators.required]],
      product: ['', [Validators.required]],
      address: ['', [Validators.required]],
      price: ['', [Validators.required]],
      state: ['']
    });

    return recordField;
  }

  get records() {
    return this.authService.companyForm.get('records') as FormArray;
  }
}
