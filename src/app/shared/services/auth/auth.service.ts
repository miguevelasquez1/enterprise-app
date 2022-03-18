/* eslint-disable max-len */
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
import { Observable, Observer, Subject, Subscription } from 'rxjs';
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

  authErrors = {
    'admin-restricted-operation': 'This operation is restricted to administrators only.',
    'argument-error': '',
    'app-not-authorized': `This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.`,
    'app-not-installed':
      'The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.',
    'captcha-check-failed':
      'The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains.',
    'code-expired': 'The SMS code has expired. Please re-send the verification code to try again.',
    'cordova-not-ready': 'Cordova framework is not ready.',
    'cors-unsupported': 'This browser is not supported.',
    'credential-already-in-use':
      'This credential is already associated with a different user account.',
    'custom-token-mismatch': 'The custom token corresponds to a different audience.',
    'requires-recent-login':
      'This operation is sensitive and requires recent authentication. Log in again before retrying this request.',
    'dynamic-link-not-activated':
      'Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.',
    'email-change-needs-verification': 'Multi-factor users must always have a verified email.',
    'email-already-in-use': 'The email address is already in use by another account.',
    'expired-action-code': 'The action code has expired. ',
    'cancelled-popup-request':
      'This operation has been cancelled due to another conflicting popup being opened.',
    'internal-error': 'An internal error has occurred.',
    'invalid-app-credential':
      'The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.',
    'invalid-app-id': 'The mobile app identifier is not registed for the current project.',
    'invalid-user-token': `This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.`,
    'invalid-auth-event': 'An internal error has occurred.',
    'invalid-verification-code':
      'The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure use the verification code provided by the user.',
    'invalid-continue-uri': 'The continue URL provided in the request is invalid.',
    'invalid-cordova-configuration':
      'The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.',
    'invalid-custom-token': 'The custom token format is incorrect. Please check the documentation.',
    'invalid-dynamic-link-domain':
      'The provided dynamic link domain is not configured or authorized for the current project.',
    'invalid-email': 'The email address is badly formatted.',
    'invalid-api-key': 'Your API key is invalid, please check you have copied it correctly.',
    'invalid-cert-hash': 'The SHA-1 certificate hash provided is invalid.',
    'invalid-credential': 'The supplied auth credential is malformed or has expired.',
    'invalid-message-payload':
      'The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.',
    'invalid-multi-factor-session':
      'The request does not contain a valid proof of first factor successful sign-in.',
    'invalid-oauth-provider':
      'EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.',
    'invalid-oauth-client-id':
      'The OAuth client ID provided is either invalid or does not match the specified API key.',
    'unauthorized-domain':
      'This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.',
    'invalid-action-code':
      'The action code is invalid. This can happen if the code is malformed, expired, or has already been used.',
    'wrong-password': 'The password is invalid or the user does not have a password.',
    'invalid-persistence-type':
      'The specified persistence type is invalid. It can only be local, session or none.',
    'invalid-phone-number':
      'The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].',
    'invalid-provider-id': 'The specified provider ID is invalid.',
    'invalid-recipient-email':
      'The email corresponding to this action failed to send as the provided recipient email address is invalid.',
    'invalid-sender':
      'The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.',
    'invalid-verification-id':
      'The verification ID used to create the phone auth credential is invalid.',
    'invalid-tenant-id': `The Auth instance's tenant ID is invalid.`,
    'multi-factor-info-not-found':
      'The user does not have a second factor matching the identifier provided.',
    'multi-factor-auth-required':
      'Proof of ownership of a second factor is required to complete sign-in.',
    'missing-android-pkg-name':
      'An Android Package Name must be provided if the Android App is required to be installed.',
    'auth-domain-config-required':
      'Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.',
    'missing-app-credential':
      'The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.',
    'missing-verification-code':
      'The phone auth credential was created with an empty SMS verification code.',
    'missing-continue-uri': 'A continue URL must be provided in the request.',
    'missing-iframe-start': 'An internal error has occurred.',
    'missing-ios-bundle-id': 'An iOS Bundle ID must be provided if an App Store ID is provided.',
    'missing-multi-factor-info': 'No second factor identifier is provided.',
    'missing-multi-factor-session':
      'The request is missing proof of first factor successful sign-in.',
    'missing-or-invalid-nonce':
      'The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.',
    'missing-phone-number': 'To send verification codes, provide a phone number for the recipient.',
    'missing-verification-id':
      'The phone auth credential was created with an empty verification ID.',
    'app-deleted': 'This instance of FirebaseApp has been deleted.',
    'account-exists-with-different-credential':
      'An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.',
    'network-request-failed':
      'A network error (such as timeout, interrupted connection or unreachable host) has occurred.',
    'no-auth-event': 'An internal error has occurred.',
    'no-such-provider': 'User was not linked to an account with the given provider.',
    'null-user':
      'A null user object was provided as the argument for an operation which requires a non-null user object.',
    'operation-not-allowed':
      'The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.',
    'operation-not-supported-in-this-environment':
      'This operation is not supported in the environment this application is running on. `location.protocol` must be http, https or chrome-extension and web storage must be enabled.',
    'popup-blocked':
      'Unable to establish a connection with the popup. It may have been blocked by the browser.',
    'popup-closed-by-user':
      'The popup has been closed by the user before finalizing the operation.',
    'provider-already-linked': 'User can only be linked to one identity for the given provider.',
    'quota-exceeded': `The project's quota for this operation has been exceeded.`,
    'redirect-cancelled-by-user':
      'The redirect operation has been cancelled by the user before finalizing.',
    'redirect-operation-pending': 'A redirect sign-in operation is already pending.',
    'rejected-credential': 'The request contains malformed or mismatching credentials.',
    'second-factor-already-in-use': 'The second factor is already enrolled on this account.',
    'maximum-second-factor-count-exceeded':
      'The maximum allowed number of second factors on a user has been exceeded.',
    'tenant-id-mismatch': `The provided tenant ID does not match the Auth instance's tenant ID`,
    // eslint-disable-next-line quote-props
    'timeout': 'The operation has timed out.',
    'user-token-expired': `The user's credential is no longer valid. The user must sign in again.`,
    'too-many-requests':
      'We have blocked all requests from this device due to unusual activity. Try again later.',
    'unauthorized-continue-uri':
      'The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.',
    'unsupported-first-factor':
      'Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.',
    'unsupported-persistence-type':
      'The current environment does not support the specified persistence type.',
    'unsupported-tenant-operation': 'This operation is not supported in a multi-tenant context.',
    'unverified-email': 'The operation requires a verified email.',
    'user-cancelled': 'The user did not grant your application the permissions it requested.',
    'user-not-found':
      'There is no user record corresponding to this identifier. The user may have been deleted.',
    'user-disabled': 'The user account has been disabled by an administrator.',
    'user-mismatch': 'The supplied credentials do not correspond to the previously signed in user.',
    'user-signed-out': '',
    'weak-password': 'The password must be 6 characters long or more.',
    'web-storage-unsupported':
      'This browser is not supported or 3rd party cookies and data may be disabled.',
    'is-an-enterprise': 'This account is an enterprise, try with another account please.',
    'is-not-an-enterprise': `This account doesn't have access to enterprise app.`,
  };

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true };
  };

  constructor(
    // private angularFirestore: AngularFirestore,
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private aFDB: AngularFireDatabase,
    private _globals: Globals,
  ) {
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
        companyKey: [null, []],
        companyName: ['', Validators.required],
        displayName: ['', [Validators.required]],
        email: [
          '',
          [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
        ],
        companyEmail: [
          '',
          [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
          this.companyEmailExists.bind(this),
        ],
        phoneNumber: ['', []],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
        urlImage: ['', []],
        company: [false, []],
        employee: [false, []],
        person: [false, []],
        idiom: ['', []],
      },
      { validators: this.checkPasswords },
    );
  }

  private buildCompanyForm() {
    this.companyForm = this.formBuilder.group({
      $key: [null, []],
      name: ['', [Validators.required]],
      email: ['', []],
      phoneNumber: ['', []],
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
      idiom: ['', []],
      isAdmin: [true, []],
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
      idiom: ['', []],
    });
  }

  getUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  getCompanies(): Observable<SnapshotAction<Company>[]> {
    return this.companyList.snapshotChanges();
  }

  getPersons(): Observable<SnapshotAction<Person>[]> {
    return this.personList.snapshotChanges();
  }

  getCustomers(): Observable<Customer[]> {
    return this.customerList
      .snapshotChanges()
      .pipe(map(changes => changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))));
  }

  companyEmailExists(control: AbstractControl): Promise<{ noExists: boolean } | null> {
    const noExists: Promise<{ noExists: boolean } | null> = new Promise(resolve => {
      const ref = this.aFDB.database.ref('companies');
      ref
        .orderByChild('email')
        .equalTo(control.value)
        .on('value', snapshot => {
          if (snapshot.exists()) {
            this.authForm.get('companyKey').setValue(Object.keys(snapshot.val())[0]);
          }
          console.log(snapshot.exists(), 'existe?');
          resolve(snapshot.exists() ? null : { noExists: true });
        });
    });
    return noExists;
  }

  async getCurrentCustomer(): Promise<Customer> {
    const user = await this.getUser();

    const promise: Promise<Customer> = new Promise(resolve => {
      this.getCustomers().subscribe(customers => {
        customers.forEach(customer => {
          if (user.uid === customer.$key) {
            resolve(customer);
          }
        });
      });
    });

    return promise;
  }

  async getCurrentCompanyByKey(userKey: string): Promise<Company> {
    const ref = this.aFDB.database.ref('companies');
    const companyPromise: Promise<Company> = new Promise((resolve, reject) => {
      ref
        .orderByKey()
        .equalTo(userKey)
        .on('value', snapshot => {
          if (!snapshot.exists()) {
            reject({});
          }
          console.log(snapshot.val(), 'AAAAAAAAAAAAAA');
          snapshot.forEach(child => {
            const company: Company = { $key: child.key, ...child.val() };
            resolve(company);
          });
        });
    });

    return companyPromise;
  }

  getCurrentCompanyByEmail(userKey: string, userEmail: string): Promise<Company> {
    const ref = this.aFDB.database.ref('companies');
    const companyPromise: Promise<Company> = new Promise((resolve, reject) => {
      ref
        .orderByChild(`employees/${userKey}/email`)
        .equalTo(userEmail)
        .on('value', snapshot => {
          console.log('entra');
          if (!snapshot.exists()) {
            reject({});
          }
          snapshot.forEach(child => {
            const company: Company = { $key: child.key, ...child.val() };
            resolve(company);
          });
        });
    });

    return companyPromise;
  }

  async getCurrentPerson(): Promise<Person> {
    const user = await this.getUser();
    const personPromise: Promise<Person> = new Promise(resolve =>
      (async () => {
        try {
          const company = await this.getCurrentCompanyByEmail(user.uid, user.email);
          if (company?.$key) {
            this.aFDB.database
              .ref(`companies/${company.$key}/employees`)
              .orderByKey()
              .on('value', snapshot => {
                snapshot.forEach(child => {
                  (async () => {
                    if ((await this.getUser()).uid === child.key) {
                      resolve({ $key: child.key, ...child.val() });
                    }
                  })();
                });
              });
          }
        } catch {
          this.aFDB.database
            .ref('persons')
            .orderByKey()
            .equalTo(user.uid)
            .on('value', snapshot => {
              snapshot.forEach(child => {
                resolve({ $key: child.key, ...child.val() });
              });
            });
        }
      })(),
    );
    return personPromise;
  }

  isCompany(): Promise<boolean> {
    return new Promise(resolve => {
      this.afAuth.authState.subscribe(res => {
        console.log(res, 'response');
        if (res) {
          this.aFDB
            .object(`persons/${res.uid}`)
            .snapshotChanges()
            .subscribe(person => {
              if (person.key === res.uid) {
                resolve(false);
              } else {
                this.aFDB
                  .object(`companies/${res.uid}`)
                  .snapshotChanges()
                  .subscribe(company => {
                    if (company.key === res.uid) {
                      resolve(true);
                    } else {
                      resolve(undefined);
                    }
                  });
              }
            });
        }
      });
    });
  }

  async insertPerson(person: Person): Promise<void> {
    const ref = this.aFDB.database.ref('persons');

    ref.child(person.uid).set({
      name: person.name,
      email: person.email,
      phoneNumber: person.phoneNumber,
      idiom: person.idiom,
    });
  }

  updatePerson(person: Person): void {
    this.personList.update(person.$key, {
      name: person.name,
      email: person.email,
      phoneNumber: person.phoneNumber,
      idiom: person.idiom,
    });
  }

  async insertCompany(company: Company) {
    const ref = this.aFDB.database.ref('companies');

    return await ref.child(company.uid).set({
      name: company.name,
    });
  }

  updateCompany(company: Company): void {
    this.companyList.update(company.$key, {
      name: company.name,
      email: company.email,
      phoneNumber: company.phoneNumber,
    });
  }

  async insertEmployee(newCompany: boolean, employee: Person, companyKey?: string): Promise<void> {
    if (newCompany && employee.uid) {
      const ref = this.aFDB.database.ref(`companies/${employee.uid}/employees`);
      ref.child(employee.uid).set({
        name: employee.name,
        email: employee.email,
        phoneNumber: employee.phoneNumber,
        idiom: employee.idiom,
        isAdmin: true,
      });
    } else {
      console.log('eh');
      const ref = this.aFDB.database.ref(`companies/${companyKey}/employees`);
      ref.child(employee.uid).set({
        name: employee.name,
        email: employee.email,
        phoneNumber: employee.phoneNumber,
        idiom: employee.idiom,
        isAdmin: false,
      });
    }
  }

  insertCustomer(customer: Customer): void {
    const ref = this.aFDB.database.ref('customers');

    ref.child(customer.uid).set({
      name: customer.name,
      email: customer.email,
      phoneNumber: customer.phoneNumber,
      idiom: customer.idiom,
    });
  }

  async updateCustomer(customer: Customer): Promise<void> {
    return await this.customerList.update(customer.$key, {
      name: customer.name,
      email: customer.email,
      phoneNumber: customer.phoneNumber,
      addressSelected: customer.addressSelected ? customer.addressSelected : '',
      idiom: customer.idiom,
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

  populateForm(user: IUser): void {
    this.authForm.setValue(user);
  }

  public loginFirebase(user: IUser): Promise<unknown> {
    return new Promise((resolve, rejected) => {
      this.afAuth
        .signInWithEmailAndPassword(user.email, user.password)
        .then(async login => {
          const isCompany = await this.isCompany();
          if (this._globals.isEnterprise && isCompany !== undefined) {
            resolve(login);
          } else if (!this._globals.isEnterprise && isCompany === undefined) {
            resolve(login);
          } else {
            if (this._globals.isEnterprise) {
              rejected({ code: 'auth/is-not-an-enterprise' });
            } else {
              rejected({ code: 'auth/is-an-enterprise' });
            }
            await this.signOut();
          }
        })
        .catch(err => {
          rejected(err);
        });
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

  public async googleAuth(): Promise<void> {
    return await this.afAuth
      .signInWithPopup(new firebase.GoogleAuthProvider())
      .then(async (user: any) => {
        const displayName = `${user.additionalUserInfo.profile.given_name?.split(' ')[0]} ${
          user.additionalUserInfo.profile.family_name?.split(' ')[0]
        }`;
        user.user.updateProfile({ displayName });
        const data = {
          email: user.additionalUserInfo.profile.email,
          name: displayName,
          phoneNumber: '',
          uid: user.additionalUserInfo.profile.id,
          idiom: user.idiom,
        };
        if (this.isPersonForm) {
          await this.insertPerson(data);
        } else {
          const res = await this.insertCompany({ ...data, employees: [] });
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
          this.uid = user.uid;
          const data = {
            email: user.email,
            name: user.displayName,
            phoneNumber: user.phoneNumber,
            uid: userData.user.uid,
            idiom: user.idiom,
          };
          userData.user.updateProfile({ displayName: user.displayName });
          if (this._globals.isEnterprise) {
            if (this.isPersonForm) {
              this.insertPerson(data);
            } else if (user.companyKey && user.companyKey !== '') {
              this.insertEmployee(false, data, user.companyKey);
            } else {
              await this.insertCompany({ ...data, employees: [] });
              this.insertEmployee(true, data);
            }
          } else {
            this.insertCustomer(data);
          }

          resolve(userData);
        })
        .catch(err => {
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
