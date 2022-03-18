import {
  AngularFireDatabase,
  AngularFireList,
  SnapshotAction,
} from '@angular/fire/compat/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, forkJoin } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Globals } from 'src/app/globals';
import { Injectable } from '@angular/core';
import { Person } from 'src/app/shared/interfaces/person.interface';
import { Service } from '../../models/service';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  servicesRef: AngularFireList<Service>;

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
  }

  public async uploadPhotoToFirebase(serviceKey: string, file: Blob): Promise<string> {
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

  public getServices(): Promise<Observable<Service[]>> {
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
                resolve(this.getAllServices());
              }
            });
        }
      });
    });
  }

  public getServicesForEnterprises(key: string, uid: string): Observable<Service[]> {
    if (key === uid) {
      this.servicesRef = this._aFDB.list(`persons/${uid}/services`);
    } else {
      this.servicesRef = this._aFDB.list(`companies/${uid}/services`);
    }
    return this.servicesRef
      .snapshotChanges()
      .pipe(map(changes => changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))));
  }

  getAllServices(): Observable<Service[]> {
    const services$ = new Subject<Service[]>();
    this.getPersonsServices().subscribe(data => {
      services$.next(data);
    });
    this.getCompaniesServices().subscribe(data => {
      services$.next(data);
    });
    return services$;
  }

  public getPersonsServices(): Observable<Service[]> {
    const services = new Subject<Service[]>();
    this._authService
      .getPersons()
      .pipe(map(changes => changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))))
      .subscribe(persons =>
        persons.map(person =>
          this._aFDB
            .list(`persons/${person.$key}/services`)
            .snapshotChanges()
            .pipe(
              map(changes =>
                changes.map(c => ({ $key: c.payload.key, ...(c.payload.val() as Service) })),
              ),
            )
            .subscribe(data => {
              if (data.length !== 0) {
                services.next(data);
              }
            }),
        ),
      );
    return services;
  }

  public getCompaniesServices(): Observable<Service[]> {
    const services = new Subject<Service[]>();
    this._authService
      .getCompanies()
      .pipe(map(changes => changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))))
      .subscribe(companies =>
        companies.map(company =>
          this._aFDB
            .list(`companies/${company.$key}/services`)
            .snapshotChanges()
            .pipe(
              map(changes =>
                changes.map(c => ({ $key: c.payload.key, ...(c.payload.val() as Service) })),
              ),
            )
            .subscribe(data => {
              if (data.length !== 0) {
                services.next(data);
              }
            }),
        ),
      );
    return services;
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

    return ref.key;
  }

  public updateService(service: Service): string {
    this.servicesRef.update(service.$key, {
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
  }

  private _buildServiceForm(): void {
    this.serviceForm = this._fb.group({
      $key: ['', []],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', []],
      price: ['0', Validators.required],
      author: ['', Validators.required],
      hostUid: ['', Validators.required],
      isCompany: [false, Validators.required],
    });
  }
}
