import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Globals } from 'src/app/globals';
import { Injectable } from '@angular/core';
import { Service } from '../../models/service';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  servicesRef: AngularFireList<Service>;

  globalServicesRef;

  serviceForm: FormGroup;

  constructor(
    public globals: Globals,
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _afAuth: AngularFireAuth,
    private _aFDB: AngularFireDatabase,
    private _storage: AngularFireStorage,
  ) {
    this._buildServiceForm();
    this.globalServicesRef = this._aFDB.database.ref('services');
  }

  public async uploadPhotoToFirebase(serviceKey: string, file: Blob) {
    const type = (await this._authService.isCompany()) ? 'companies' : 'persons';
    const user = await this._authService.getUser();
    const filePath = `${type}/${user.uid}/services/${serviceKey}`;
    const ref = this._storage.ref(filePath);
    const task = this._storage.upload(filePath, file);
    return new Promise(resolve => {
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            ref.getDownloadURL().subscribe(url => resolve(url));
          }),
        )
        .subscribe();
    });
  }

  public getServices(): Promise<AngularFireList<Service>> {
    return new Promise(resolve => {
      this._afAuth.authState.subscribe(res => {
        if (res) {
          this._aFDB
            .object(`persons/${res.uid}`)
            .snapshotChanges()
            .subscribe(data => {
              if (this.globals.isEnterprise) {
                resolve(this.getServicesForEnterprises(data.key, res.uid));
              } else {
                resolve(this.getGlobalServices());
              }
            });
        }
      });
    });
  }

  public getServicesForEnterprises(key: string, uid: string): AngularFireList<Service> {
    if (key === uid) {
      this.servicesRef = this._aFDB.list(`persons/${uid}/services`);
    } else {
      this.servicesRef = this._aFDB.list(`companies/${uid}/services`);
    }
    return this.servicesRef;
  }

  public getGlobalServices() {
    this.servicesRef = this._aFDB.list('services');
    return this.servicesRef;
  }

  public insertService(service: Service): string {
    const ref = this.servicesRef.push({
      title: service.title,
      description: service.description,
      image: service.image,
      price: service.price,
      author: service.author,
      hostUid: service.hostUid,
      isCompany: service.isCompany,
    });

    this.globalServicesRef.child(ref.key).set({
      title: service.title,
      description: service.description,
      image: service.image,
      price: service.price,
      author: service.author,
      hostUid: service.hostUid,
      isCompany: service.isCompany,
    });

    return ref.key;
  }

  public updateService(service: Service): string {
    console.log(service, 'service');
    this.servicesRef.update(service.$key, {
      title: service.title,
      description: service.description,
      image: service.image,
      price: service.price,
      author: service.author,
      hostUid: service.hostUid,
      isCompany: service.isCompany,
    });

    this._aFDB.list('services').update(service.$key, {
      title: service.title,
      description: service.description,
      image: service.image,
      price: service.price,
      author: service.author,
      hostUid: service.hostUid,
      isCompany: service.isCompany,
    });

    return service.$key;
  }

  public populateForm(service: Service): void {
    this.serviceForm.patchValue(service);
  }

  public removeService($key: string): void {
    this.servicesRef.remove($key);
    this._aFDB.list('services').remove($key);
  }

  private _buildServiceForm(): void {
    this.serviceForm = this._fb.group({
      $key: ['', []],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', []],
      price: ['', Validators.required],
      author: ['', Validators.required],
      hostUid: ['', Validators.required],
      isCompany: [false, Validators.required],
    });
  }
}
