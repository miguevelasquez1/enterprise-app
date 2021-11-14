import { Injectable, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Person } from '../models/person';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _emitNumber: EventEmitter<object>;

  public employees;

  public userData$: Observable<User>;

  public authForm: FormGroup;

  public companyForm: FormGroup;

  public personForm: FormGroup;

  public personsList: AngularFireList<Person>;

  public companyList: AngularFireList<Company>;

  public loginResponse$ = new EventEmitter<any>();

  public currentUser: User;

  public isPersonForm: boolean;

  constructor(
    private angularFirestore: AngularFirestore,
    private formBuilder: FormBuilder,
    private firebaseAuth: AngularFireAuth,
    private aFDB: AngularFireDatabase
    ) {
      this._emitNumber = new EventEmitter<object>();
      this.userData$ = this.firebaseAuth.authState;
      this.isPersonForm = true;
      this.buildFormAuth();
      this.buildFormPerson();
      this.buildFormCompany();

      this.personsList = this.aFDB.list('persons');
  }

  private buildFormAuth() {
    this.authForm = this.formBuilder.group({
      $key: [null, []],
      name: ['', []],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phoneNumber: ['', []],
      password: ['', [Validators.required, Validators.minLength(8)]],
      urlImage: ['', []],
      company: [false, []],
      person: [false, []]
    });
  }

  private buildFormCompany() {
    this.companyForm = this.formBuilder.group({
      $key: [null, []],
      name: ['', []],
      email: ['', []],
      phoneNumber: ['', []],
      employees: this.formBuilder.array([])
    });
  }

  private buildFormPerson() {
    this.personForm = this.formBuilder.group({
      $key: [null, []],
      name: ['', []],
      email: ['', []],
      phoneNumber: ['', []],
      records: this.formBuilder.array([]),
      inventory: this.formBuilder.array([])
    });
  }

  getPersons() {
    this.personsList = this.aFDB.list('persons');
    return this.personsList.snapshotChanges();
  }

  insertPerson(person: Person) {
      this.personsList.push({
        name: person.name,
        email: person.email,
        phoneNumber: person.phoneNumber,
        records: person.records,
        inventory: person.inventory
      });
  }

  updatePerson(person: Person) {
    this.personsList.update(person.$key, {
      name: person.name,
      email: person.email,
      phoneNumber: person.phoneNumber,
      records: person.records,
      inventory: person.inventory
    });
  }

  getCompany() {
    this.personsList = this.aFDB.list('persons');
    return this.personsList.snapshotChanges();
  }

  insertCompany(company: Company) {
    this.companyList.push({
      name: company.name,
      email: company.email,
      phoneNumber: company.phoneNumber,
      employees: company.employees
    });
  }

  updateCompany(company: Company) {
    this.companyList.update(company.$key, {
      name: company.name,
      email: company.email,
      phoneNumber: company.phoneNumber,
      employees: company.employees
    });
  }

  addEmployeeField() {
    this.employeeField.push(this.personForm);
  }

  get employeeField() {
    return this.companyForm.get('employees') as FormArray;
  }

  get inventory() {
    return this.companyForm.get('inventory') as FormArray;
  }

  getUsers() {
    // return this.angularFirestore.collection('Servers').doc(this.currentUser.server.name).collection('Users').snapshotChanges();
  }

  getUsersByServerName(name: string) {
    return this.angularFirestore.collection('Servers').doc(name).collection('Users').snapshotChanges();
  }

  populateForm(user) {
    this.authForm.setValue(user);
  }

  public loginFirebase(user) {
    return new Promise((resolve, rejected) => {
      this.firebaseAuth.signInWithEmailAndPassword(user.email, user.password).then(login => {
        resolve(login);
      }).catch(err => rejected(err));
    });
  }

  public getUsersFromServer(user: User) {
    // return this.angularFirestore.collection('Servers').doc(user.server.name).collection('Users').valueChanges();
  }

  otro(userExist, user) {
    if (userExist) {
      return this.loginFirebase(user);
    } else {
      return Promise.reject({message: 'hola'});
    }
  }

  signOut() {
    this.firebaseAuth.signOut();
  }

  register(user: User) {
    return new Promise((resolve, reject) => {
    this.firebaseAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userData => {
        const uid = userData.user.uid;
        const data = {
          email: user.email,
          name: user.name,
          phoneNumber: user.phoneNumber
        };
        if (this.isPersonForm) {
          this.insertPerson({...data, records: [], inventory: []});
        } else {
          this.insertCompany({...data, employees: []});
        }
        resolve(userData);
      })
      .catch(err => reject(err));
    });
  }

  isAuth() {
    return this.firebaseAuth.authState;
  }

  isAuth2() {
    return this.firebaseAuth.authState.pipe(map(auth => auth));
  }

  public get emitNumber(): EventEmitter<object> {
    return this._emitNumber;
  }

  public set emitNumber(emitNumber: EventEmitter<object>) {
    this._emitNumber = emitNumber;
  }

}
