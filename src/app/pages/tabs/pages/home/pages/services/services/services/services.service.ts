import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { Service } from '../../models/service';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  servicesRef: AngularFireList<Service>;

  serviceForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _afAuth: AngularFireAuth,
    private _aFDB: AngularFireDatabase,
  ) {
    this._buildServiceForm();
  }

  public getServices(): Promise<AngularFireList<Service>> {
    return new Promise(resolve => {
      this._afAuth.authState.subscribe(res => {
        this._aFDB
          .object(`persons/${res.uid}`)
          .snapshotChanges()
          .subscribe(data => {
            if (data.key === res.uid) {
              console.log('persons');
              this.servicesRef = this._aFDB.list(`persons/${res.uid}/services`);
              resolve(this.servicesRef);
            } else {
              console.log('companies');
              this.servicesRef = this._aFDB.list(`companies/${res.uid}/services`);
              resolve(this.servicesRef);
            }
          });
      });
    });
  }

  public insertService(service: Service) {
    this.servicesRef.push({
      title: service.title,
      description: service.description,
      image: service.image,
    });
  }

  public updateService(service: Service): void {
    this.servicesRef.update(service.$key, {
      title: service.title,
      description: service.description,
      image: service.image,
    });
  }

  public populateForm(service: Service) {
    this.serviceForm.patchValue(service);
  }

  public removeService($key) {
    this.servicesRef.remove($key);
  }

  private _buildServiceForm() {
    this.serviceForm = this._fb.group({
      $key: ['', []],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', []],
    });
  }
}
