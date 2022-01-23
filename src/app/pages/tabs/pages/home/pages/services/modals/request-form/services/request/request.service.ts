import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Injectable } from '@angular/core';
import { Request } from '../../models/request/request';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  requestForm: FormGroup;

  requestRef: AngularFireList<Request>;

  constructor(
    private _authService: AuthService,
    private _aFDB: AngularFireDatabase,
    private _fb: FormBuilder,
  ) {
    this._buildRequestForm();
  }

  sendRequestToHost(request: Request, isCompany: boolean) {
    console.log(request, isCompany, 'avr q');
    if (isCompany) {
      this.requestRef = this._aFDB.list(`companies/${request.hostUid}/requests`);
    } else {
      this.requestRef = this._aFDB.list(`persons/${request.hostUid}/requests`);
    }

    this.requestRef.push({
      address: request.address,
      conditionDescription: request.conditionDescription,
      phoneNumber: request.phoneNumber,
      hostUid: request.hostUid,
      serviceTitle: request.serviceTitle,
    });
  }

  public async insertRequest(request: Request) {
    const user = await this._authService.getUser();
    this.requestRef = this._aFDB.list(`customers/${user.uid}/requests`);
    console.log(`customers/${user.uid}/requests`, request, 'request');
    this.requestRef.push({
      address: request.address,
      conditionDescription: request.conditionDescription,
      phoneNumber: request.phoneNumber,
    });
  }

  private _buildRequestForm() {
    this.requestForm = this._fb.group({
      $key: ['', Validators.required],
      address: ['', Validators.required],
      conditionDescription: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      hostUid: ['', Validators.required],
      serviceTitle: ['', Validators.required],
    });
  }
}
