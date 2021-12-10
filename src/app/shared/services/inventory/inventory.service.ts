import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../auth/auth.service';
import { IItem } from '../../models/item';
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
      console.log(user, 'user');
    });
    this.authService.isAuth2().subscribe(auth => {
      this.userData$.next(auth);
      console.log(this.userData$, 'userDataaaa');
    });
    this.inventoryRef = this.aFDB.list('inventory');
    console.log(this.afAuth.authState.subscribe(data => (this.uid = data.uid)));
  }

  private buildForm() {
    this.inventarioForm = this.formBuilder.group({
      id: [null, []],
      date: ['', [Validators.required]],
      name: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      image: this.formBuilder.array([]),
    });
  }

  addImagenField(): void {
    this.imagenField.push(this.createImagenField());
  }

  createImagenField(): FormGroup {
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
    this.imagenField?.clear();
  }

  get imagenField(): FormArray {
    return this.inventarioForm.get('imagen') as FormArray;
  }

  getUserData$(): Observable<IUser> {
    return this.userData$.asObservable();
  }

  getInventory(): AngularFireList<IItem> {
    console.log('pasa');
    return this.inventoryRef;
  }

  insertItem({ name, brand, amount, date, image }: IItem): void {
    console.log({ name, brand, amount, date, image, employeeUid: this.uid }, 'push');
    this.inventoryRef.push({ name, brand, amount, date, image, employeeUid: this.uid });
  }

  updateInventory(item: IItem): void {
    console.log(item, 'product');
    this.authService.isAuth2().subscribe((auth: IUser) => {
      if (auth) {
        console.log(auth.uid, 'uid');
        this.angularFirestore
          .collection('UsersEnterprise')
          .doc(auth.uid)
          .collection('inventory')
          .doc(item.id)
          .set({
            name: item.name,
            brand: item.brand,
            amount: item.amount,
            date: item.date,
            image: item.image,
          });
      }
    });
  }

  deleteInventario($key: string): void {
    console.log($key, '$key');
    this.inventoryRef.remove($key);
  }

  public populateForm(item: IItem): void {
    this.inventarioForm.patchValue(item);
    item.image?.forEach(() => {
      this.addImagenField();
    });
    // this.inventarioForm.get('imagen').setValue(producto.image);
    // if (producto.image) {
    //   this.imageList = producto.image;
    //   return this.formBuilder.group({
    //     urlImage: [producto.image.urlImage, []],
    //     dateImage: [producto.image.dateImage, []],
    //   });
    // }
  }

  resetForm(form?: FormGroup): void {
    if (form != null) {
      form.reset();
      this.selectedInventario = new IItem();
    }
    this.imageList = [];
    console.log(this.imagenField, 'imagenField');
    if (this.imagenField === null) {
      this.removeAllImagenField();
    }
  }
}
