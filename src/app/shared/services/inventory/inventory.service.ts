import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IImage, IItem } from '../../models/item';
import { Observable, Subject } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../auth/auth.service';
import { IUser } from '../../interfaces/user.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  inventoryRef: AngularFireList<IItem>;
  selectedInventario: IItem = new IItem();
  inventarioForm: FormGroup;
  imageList = [];
  private userData$ = new Subject<IUser>();
  public userDataObsevable$: Observable<IUser>;
  public userData;
  uid: string;

  constructor(
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private angularFirestore: AngularFirestore,
    private formBuilder: FormBuilder,
    private aFDB: AngularFireDatabase,
  ) {
    this.buildForm();
    this.userDataObsevable$ = this.getUserData$();
    this.userDataObsevable$.subscribe(user => {
      this.userData = user;
    });
    this.authService.isAuth().subscribe(auth => {
      this.userData$.next(auth);
    });
    this.afAuth.authState.subscribe(data => (this.uid = data.uid));
  }

  private buildForm() {
    this.inventarioForm = this.formBuilder.group({
      id: [null, []],
      date: ['', [Validators.required]],
      name: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      images: this.formBuilder.array([]),
    });
  }

  addImageField(): void {
    this.imagenField.push(this.createImageField());
  }

  createImageField(): FormGroup {
    const imageField = this.formBuilder.group({
      urlImage: ['', []],
      dateImage: ['', []],
    });

    return imageField;
  }

  removeImagenField(i): void {
    this.imagenField.removeAt(i);
  }

  removeAllImagenField(): void {
    this.imagenField.clear();
  }

  get imagenField(): FormArray {
    return this.inventarioForm.get('images') as FormArray;
  }

  getUserData$(): Observable<IUser> {
    return this.userData$.asObservable();
  }

  getInventory(): Promise<AngularFireList<IItem>> {
    return new Promise(resolve => {
      this.afAuth.authState.subscribe(res => {
        this.aFDB
          .object(`persons/${res.uid}`)
          .snapshotChanges()
          .subscribe(data => {
            if (data.key === res.uid) {
              console.log('persons');
              this.inventoryRef = this.aFDB.list(`persons/${res.uid}/inventory`);
              resolve(this.inventoryRef);
            } else {
              console.log('companies');
              this.inventoryRef = this.aFDB.list(`companies/${res.uid}/inventory`);
              resolve(this.inventoryRef);
            }
          });
      });
    });
  }

  insertItem({ name, brand, amount, date, images }: IItem) {
    return this.inventoryRef.push({ name, brand, amount, date, images, employeeUid: this.uid });
  }

  updateInventory({ $key, name, brand, amount, date, images }: IItem): void {
    this.inventoryRef.update($key, { name, brand, amount, date, images, employeeUid: this.uid });
  }

  deleteInventario($key: string): void {
    this.inventoryRef.remove($key);
  }

  public populateForm(item: IItem): void {
    this.inventarioForm.patchValue(item);

    if (item.images) {
      item.images.forEach(() => {
        this.addImageField();
      });
      this.inventarioForm.get('images').setValue(item.images);
      this.imageList = item.images;
    }
  }

  resetForm(form?: FormGroup): void {
    if (form != null) {
      form.reset();
      this.selectedInventario = new IItem();
    }
    this.imageList = [];
    if (this.imagenField !== null) {
      this.removeAllImagenField();
    }
  }
}
