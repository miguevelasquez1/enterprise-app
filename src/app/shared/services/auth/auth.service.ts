import * as firebase from 'firebase/auth';

import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  AngularFireDatabase,
  AngularFireList,
  SnapshotAction,
} from '@angular/fire/compat/database';
import { EventEmitter, Injectable } from '@angular/core';
// import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Company } from '../../interfaces/company.interface';
import { Customer } from '../../models/customer';
import { Globals } from 'src/app/globals';
import { IUser } from '../../interfaces/user.interface';
import { Person } from '../../interfaces/person.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public employees: Person[];

  public authForm: FormGroup;

  public companyForm: FormGroup;

  public personForm: FormGroup;

  public personList: AngularFireList<Person>;

  public companyList: AngularFireList<Company>;

  public customerList: AngularFireList<Customer>;

  public currentUser: IUser;

  public userData$: Observable<IUser>;

  public loginResponse$ = new EventEmitter<unknown>();

  public isPersonForm: boolean;

  private _emitNumber: EventEmitter<unknown>;

  uid: string;

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmPassword').value;
    console.log(group.get('password').value, '1', group.get('confirmPassword').value, 'ahh');
    return pass === confirmPass ? null : { notSame: true };
  };

  constructor(
    // private angularFirestore: AngularFirestore,
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private aFDB: AngularFireDatabase,
    private _globals: Globals,
  ) {
    console.log('a', this.aFDB.list('persons'));
    this._emitNumber = new EventEmitter<unknown>();
    this.userData$ = this.afAuth.authState;
    this.isPersonForm = true;
    this.buildFormAuth();
    this.buildPersonForm();
    this.buildCompanyForm();
    this.buildCustomerForm();

    this.personList = this.aFDB.list('persons');
    this.companyList = this.aFDB.list('companies');
    this.customerList = this.aFDB.list('customers');
  }

  private buildFormAuth() {
    this.authForm = this.formBuilder.group(
      {
        $key: [null, []],
        displayName: ['', [Validators.required]],
        email: [
          '',
          [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
        ],
        phoneNumber: ['', []],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
        urlImage: ['', []],
        company: [false, []],
        person: [false, []],
      },
      { validators: this.checkPasswords },
    );
  }

  private buildCompanyForm() {
    this.companyForm = this.formBuilder.group({
      $key: [null, []],
      name: ['', []],
      email: ['', []],
      phoneNumber: ['', []],
      employees: this.formBuilder.array([]),
    });
  }

  private buildPersonForm() {
    this.personForm = this.formBuilder.group({
      $key: [null, []],
      name: ['', []],
      email: ['', []],
      phoneNumber: ['', []],
      records: this.formBuilder.array([]),
      inventory: this.formBuilder.array([]),
    });
  }

  private buildCustomerForm() {
    this.personForm = this.formBuilder.group({
      $key: [null, []],
      name: ['', []],
      email: ['', []],
      phoneNumber: ['', []],
      records: this.formBuilder.array([]),
      inventory: this.formBuilder.array([]),
      selectedAddress: ['', []],
    });
  }

  getUser(): Promise<any> {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  getPersons(): Observable<SnapshotAction<Person>[]> {
    return this.personList.snapshotChanges();
  }

  getCustomers(): Observable<Customer[]> {
    return this.customerList
      .snapshotChanges()
      .pipe(map(changes => changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))));
  }

  async getCurrentCustomer() {
    const customer$ = new Subject<Customer>();
    const user = await this.getUser();
    this.getCustomers().subscribe(customers => {
      customers.forEach(customer => {
        if (user.uid === customer.$key) {
          customer$.next(customer);
        }
      });
    });
    return customer$;
  }

  isCompany(): Promise<boolean> {
    return new Promise(resolve => {
      this.afAuth.authState.subscribe(res => {
        console.log(res, 'ressss');
        if (res) {
          this.aFDB
            .object(`persons/${res.uid}`)
            .snapshotChanges()
            .subscribe(data => {
              if (data.key === res.uid) {
                resolve(false);
              } else {
                resolve(true);
              }
            });
        }
      });
    });
  }

  insertPerson(person: Person): void {
    const ref = this.aFDB.database.ref('persons');

    ref.child(person.uid).set({
      name: person.name,
      email: person.email,
      phoneNumber: person.phoneNumber,
    });
  }

  updatePerson(person: Person): void {
    this.personList.update(person.$key, {
      name: person.name,
      email: person.email,
      phoneNumber: person.phoneNumber,
    });
  }

  getCompany() {
    // return this.companyList.snapshotChanges();
  }

  insertCompany(company: Company): void {
    const ref = this.aFDB.database.ref('companies');

    ref.child(company.uid).set({
      name: company.name,
      email: company.email,
      phoneNumber: company.phoneNumber,
      employees: company.employees,
      uid: company.uid,
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

  insertCustomer(customer: Customer): void {
    const ref = this.aFDB.database.ref('customers');

    ref.child(customer.uid).set({
      name: customer.name,
      email: customer.email,
      phoneNumber: customer.phoneNumber,
    });
  }

  updateCustomer(customer: Customer) {
    console.log(customer, 'customer');
    return this.customerList.update(customer.$key, {
      name: customer.name,
      email: customer.email,
      phoneNumber: customer.phoneNumber,
      addressSelected: customer.addressSelected ? customer.addressSelected : '',
    });
  }

  addEmployeeField(): void {
    this.employeeField.push(this.personForm);
  }

  get employeeField(): FormArray {
    return this.companyForm.get('employees') as FormArray;
  }

  get inventory(): FormArray {
    return this.companyForm.get('Payment') as FormArray;
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
      this.afAuth
        .signInWithEmailAndPassword(user.email, user.password)
        .then(login => {
          console.log(login, 'login');
          console.log('login');
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

  signOut(): Promise<void> {
    return this.afAuth.signOut();
  }

  public async googleAuth() {
    return await this.afAuth
      .signInWithPopup(new firebase.GoogleAuthProvider())
      .then((user: any) => {
        console.log(user, 'reeees');
        console.log(
          user.additionalUserInfo.profile.given_name.split(' ')[0],
          user.additionalUserInfo.profile.family_name.split(' ')[0],
          'hola',
        );
        const displayName = `${user.additionalUserInfo.profile.given_name?.split(' ')[0]} ${
          user.additionalUserInfo.profile.family_name?.split(' ')[0]
        }`;
        user.user.updateProfile({ displayName });
        const data = {
          email: user.additionalUserInfo.profile.email,
          name: displayName,
          phoneNumber: '',
          uid: user.additionalUserInfo.profile.id,
        };
        if (this.isPersonForm) {
          this.insertPerson(data);
        } else {
          this.insertCompany({ ...data, employees: [] });
        }
      });
  }

  sendVerificationMail() {
    return new Promise(resolve => {
      this.afAuth.authState.subscribe(auth => {
        resolve(auth.sendEmailVerification());
      });
    });
  }

  register(user: IUser): Promise<any> {
    console.log('weeeee');
    return new Promise((resolve, reject) => {
      this.afAuth
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(async userData => {
          console.log('register');
          this.uid = user.uid;
          const data = {
            email: user.email,
            name: user.displayName,
            phoneNumber: user.phoneNumber,
            uid: userData.user.uid,
          };
          userData.user.updateProfile({ displayName: user.displayName });
          console.log('hey');
          if (this._globals.isEnterprise) {
            if (this.isPersonForm) {
              this.insertPerson(data);
            } else {
              this.insertCompany({ ...data, employees: [] });
            }
          } else {
            console.log('pasa');
            this.insertCustomer(data);
          }

          resolve(userData);
        })
        .catch(err => {
          console.log('catchhh');
          reject(err);
        });
    });
  }

  isAuth(): Observable<firebase.User> {
    return this.afAuth.authState.pipe(map(auth => auth));
  }

  public get emitNumber(): EventEmitter<unknown> {
    return this._emitNumber;
  }

  public set emitNumber(emitNumber: EventEmitter<unknown>) {
    this._emitNumber = emitNumber;
  }
}
