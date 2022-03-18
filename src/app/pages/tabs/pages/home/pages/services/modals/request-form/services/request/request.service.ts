import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Request, RequestDto } from '../../models/request/request';

import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  requestForm: FormGroup;

  requestRef: AngularFireList<Request>;

  requestDtoRef: AngularFireList<RequestDto>;

  constructor(
    private _authService: AuthService,
    private _aFDB: AngularFireDatabase,
    private _fb: FormBuilder,
  ) {
    this._buildRequestForm();
  }

  sendRequestToHost(request: Request, isCompany: boolean): void {
    if (isCompany) {
      this.requestDtoRef = this._aFDB.list(`companies/${request.hostUid}/requests`);
    } else {
      this.requestDtoRef = this._aFDB.list(`persons/${request.hostUid}/requests`);
    }

    console.log(request, 'request');

    this.requestDtoRef.push({
      name: request.name,
      address: request.address,
      conditionDescription: request.conditionDescription,
      phoneNumber: request.phoneNumber,
      hostUid: request.hostUid,
      serviceTitle: request.serviceTitle,
    });
  }

  public async insertRequest(request: Request): Promise<void> {
    console.log(request, 'request 2');
    const user = await this._authService.getUser();
    this.requestDtoRef = this._aFDB.list(`customers/${user.uid}/requests`);
    this.requestDtoRef.push({
      name: request.name,
      address: request.address,
      conditionDescription: request.conditionDescription,
      hostUid: request.hostUid,
      phoneNumber: request.phoneNumber,
      serviceTitle: request.serviceTitle,
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
