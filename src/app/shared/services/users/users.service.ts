import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFireList } from '@angular/fire/compat/database';
import { IUser } from '../../interfaces/user.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  userList: AngularFireList<IUser>;
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  private buildForm() {
    this.userForm = this.formBuilder.group({
      $key: [null, []],
      name: ['', [Validators.required]],
      email: [{ value: '', disabled: true }, [Validators.required]],
      urlImage: ['', [Validators.required]],
    });
  }
}
