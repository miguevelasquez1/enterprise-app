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
import { first, map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Company } from '../../interfaces/company.interface';
import { IUser } from '../../interfaces/user.interface';
// import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Person } from '../../interfaces/person.interface';

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
  ) {
    this._emitNumber = new EventEmitter<unknown>();
    this.userData$ = this.afAuth.authState;
    this.isPersonForm = true;
    this.buildFormAuth();
    this.buildFormPerson();
    this.buildFormCompany();

    this.personsList = this.aFDB.list('persons');
    this.companyList = this.aFDB.list('companies');
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

  getUser(): Promise<unknown> {
    return this.afAuth.authState.pipe(first()).toPromise();
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
          if (this.isPersonForm) {
            this.insertPerson(data);
          } else {
            this.insertCompany({ ...data, employees: [] });
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
