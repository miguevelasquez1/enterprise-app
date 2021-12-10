import {
  AngularFireDatabase,
  AngularFireList,
  SnapshotAction,
} from '@angular/fire/compat/database';
import { EventEmitter, Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Company } from '../../interfaces/company.interface';
import { IUser } from '../../interfaces/user.interface';
// import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Person } from '../../interfaces/person.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public employees: Person[];

  public authForm: FormGroup;

  public companyForm: FormGroup;

  public personForm: FormGroup;

  public personsList: AngularFireList<Person>;

  public companyList: AngularFireList<Company>;

  public currentUser: IUser;

  public userData$: Observable<IUser>;

  public loginResponse$ = new EventEmitter<unknown>();

  public isPersonForm: boolean;

  private _emitNumber: EventEmitter<unknown>;

  uid: string;

  constructor(
    // private angularFirestore: AngularFirestore,
    private formBuilder: FormBuilder,
    private firebaseAuth: AngularFireAuth,
    private aFDB: AngularFireDatabase,
  ) {
    this._emitNumber = new EventEmitter<unknown>();
    this.userData$ = this.firebaseAuth.authState;
    this.isPersonForm = true;
    this.buildFormAuth();
    this.buildFormPerson();
    this.buildFormCompany();

    this.personsList = this.aFDB.list('persons');
    this.companyList = this.aFDB.list('companies');
  }

  private buildFormAuth() {
    this.authForm = this.formBuilder.group({
      $key: [null, []],
      displayName: ['', []],
      email: [
        '',
        [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
      ],
      phoneNumber: ['', []],
      password: ['', [Validators.required, Validators.minLength(8)]],
      urlImage: ['', []],
      company: [false, []],
      person: [false, []],
    });
  }

  private buildFormCompany() {
    this.companyForm = this.formBuilder.group({
      $key: [null, []],
      name: ['', []],
      email: ['', []],
      phoneNumber: ['', []],
      employees: this.formBuilder.array([]),
    });
  }

  private buildFormPerson() {
    this.personForm = this.formBuilder.group({
      $key: [null, []],
      name: ['', []],
      email: ['', []],
      phoneNumber: ['', []],
      records: this.formBuilder.array([]),
      inventory: this.formBuilder.array([]),
    });
  }

  getPersons(): Observable<SnapshotAction<Person>[]> {
    return this.personsList.snapshotChanges();
  }

  insertPerson(person: Person): void {
    const ref = this.aFDB.database.ref('persons');

    ref.child(person.uid).set({
      name: person.name,
      email: person.email,
      phoneNumber: person.phoneNumber,
    });

    console.log(this.personsList, 'personlist');
  }

  updatePerson(person: Person): void {
    this.personsList.update(person.$key, {
      name: person.name,
      email: person.email,
      phoneNumber: person.phoneNumber,
    });
  }

  getCompany() {
    // return this.companyList.snapshotChanges();
  }

  insertCompany(company: Company): void {
    this.companyList.push({
      name: company.name,
      email: company.email,
      phoneNumber: company.phoneNumber,
      employees: company.employees,
    });
  }

  updateCompany(company: Company): void {
    this.companyList.update(company.$key, {
      name: company.name,
      email: company.email,
      phoneNumber: company.phoneNumber,
      employees: company.employees,
    });
  }

  addEmployeeField(): void {
    this.employeeField.push(this.personForm);
  }

  get employeeField(): FormArray {
    return this.companyForm.get('employees') as FormArray;
  }

  get inventory(): FormArray {
    return this.companyForm.get('inventory') as FormArray;
  }

  // getUsersByServerName(name: string): Observable<DocumentChangeAction<unknown>[]> {
  //   return this.angularFirestore
  //     .collection('Servers')
  //     .doc(name)
  //     .collection('Users')
  //     .snapshotChanges();
  // }

  populateForm(user: IUser): void {
    this.authForm.setValue(user);
  }

  public loginFirebase(user: IUser): Promise<unknown> {
    return new Promise((resolve, rejected) => {
      this.firebaseAuth
        .signInWithEmailAndPassword(user.email, user.password)
        .then(login => {
          resolve(login);
        })
        .catch(err => rejected(err));
    });
  }

  otro(userExist: boolean, user: IUser): Promise<unknown> {
    if (userExist) {
      return this.loginFirebase(user);
    } else {
      return Promise.reject({ message: 'hola' });
    }
  }

  signOut(): void {
    this.firebaseAuth.signOut();
  }

  register(user: IUser): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this.firebaseAuth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(userData => {
          this.uid = user.uid;
          console.log(userData.user.uid, 'user');
          const data = {
            email: user.email,
            name: user.displayName,
            phoneNumber: user.phoneNumber,
            uid: userData.user.uid,
          };
          userData.user.updateProfile({ displayName: user.displayName });
          if (this.isPersonForm) {
            console.log('person');
            this.insertPerson(data);
          } else {
            console.log('company');
            this.insertCompany({ ...data, employees: [] });
          }
          resolve(userData);
        })
        .catch(err => {
          console.log(err, 'errrrrrr');
          reject(err);
        });
    });
  }

  isAuth(): Observable<unknown> {
    return this.firebaseAuth.authState;
  }

  isAuth2(): Observable<unknown> {
    return this.firebaseAuth.authState.pipe(map(auth => auth));
  }

  public get emitNumber(): EventEmitter<unknown> {
    return this._emitNumber;
  }

  public set emitNumber(emitNumber: EventEmitter<unknown>) {
    this._emitNumber = emitNumber;
  }
}
