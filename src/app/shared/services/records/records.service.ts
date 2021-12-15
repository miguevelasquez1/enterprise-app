import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IRecord } from '../../models/record';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecordsService {
  recordsRef: AngularFireList<IRecord>;

  recordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private aFDB: AngularFireDatabase,
  ) {
    this.buildRecordForm();
    this.getRecords();
  }

  buildRecordForm(): void {
    this.recordForm = this.fb.group({
      $key: [null, []],
      date: [null, [Validators.required]],
      employeeUid: [null, [Validators.required]],
      employee: [null, []],
      client: ['', [Validators.required]],
      clientID: [null, []],
      service: ['', [Validators.required]],
      product: ['', []],
      address: ['', []],
      price: [null, []],
      state: [null, []],
    });
  }

  getRecords(): Promise<AngularFireList<IRecord>> {
    return new Promise(resolve => {
      this.afAuth.authState.subscribe(res => {
        console.log(res, 'res');
        if (res) {
          this.aFDB
            .object(`persons/${res.uid}`)
            .snapshotChanges()
            .subscribe(data => {
              console.log(data.key, res.uid, 'data.key, res.uid');
              if (data.key === res.uid) {
                console.log('persons');
                this.recordsRef = this.aFDB.list(`persons/${res.uid}/records`);
                resolve(this.recordsRef);
              } else {
                console.log('companies');
                this.recordsRef = this.aFDB.list(`companies/${res.uid}/records`);
                resolve(this.recordsRef);
              }
            });
        }
      });
    });
  }

  insertRecord({
    date,
    employee,
    client,
    clientID,
    service,
    product,
    address,
    price,
    state,
  }: IRecord): void {
    this.recordsRef.push({
      date,
      employee,
      client,
      clientID,
      service,
      product,
      address,
      price,
      state,
    });
  }

  updateRecord({
    $key,
    date,
    employee,
    client,
    clientID,
    service,
    product,
    address,
    price,
    state,
  }: IRecord): void {
    this.recordsRef.update($key, {
      date,
      employee,
      client,
      clientID,
      service,
      product,
      address,
      price,
      state,
    });
  }

  deleteRecord($key: string): void {
    this.recordsRef.remove($key);
  }

  populateForm(record: IRecord): void {
    this.recordForm.patchValue(record);
  }
}
