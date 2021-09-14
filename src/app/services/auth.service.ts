import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/models/user';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _emitNumber: EventEmitter<object>;

  public employees;

  public userData$: Observable<User>;
  authForm: FormGroup;

  public loginResponse$ = new EventEmitter<any>();

  public currentUser: User;

  constructor(
    private angularFirestore: AngularFirestore,
    private formBuilder: FormBuilder,
    private firebaseAuth: AngularFireAuth,
    ) {
      this._emitNumber = new EventEmitter<object>();
      this.userData$ = this.firebaseAuth.authState;
      this.buildForm();
  }

  private buildForm() {
    this.authForm = this.formBuilder.group ({
      $key: [null, []],
      name: [''],
      email: [''],
      phoneNumber: [],
      password: [''],
      customer: [true],
      server: this.formBuilder.group({
        name: [''],
        employee: [false],
        admin: [false]
      }),
      urlImage: ['']
    });
  }

  getUsers() {
    return this.angularFirestore.collection('Servers').doc(this.currentUser.server.name).collection('Users').snapshotChanges();
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
    return this.angularFirestore.collection('Servers').doc(user.server.name).collection('Users').valueChanges();
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
    return new Promise((resolve, rejected) => {
    this.firebaseAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userData => {
        const uid = userData.user.uid;
        this.angularFirestore.collection('Servers').doc('Miguel').collection('Users').doc(uid).set({
          server: {
            name: user.server.name,
            employee: user.server.employee,
            admin: user.server.admin
          },
          customer: user.customer,
          email: user.email,
          name: user.name,
          uid
        });
        resolve(userData);
      }).catch(err => rejected(err));
    });
  }

  isAuth() {
    return this.firebaseAuth.authState;
  }

  isAuth2() {
    return this.firebaseAuth.authState.pipe(map(auth => auth));
  }

  isUser(userUid) {
    return this.angularFirestore.doc<User>(`Servers/Miguel/Users/${userUid}`).valueChanges();
  }

  public get emitNumber(): EventEmitter<object> {
    return this._emitNumber;
  }

  public set emitNumber(emitNumber: EventEmitter<object>) {
    this._emitNumber = emitNumber;
  }

}
