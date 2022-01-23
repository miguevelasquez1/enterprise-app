import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Inventory } from '../models/inventory';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class InventarioService {
  inventarioList: AngularFireList<any>;
  selectedInventario: Inventory = new Inventory();
  inventarioForm: FormGroup;
  imageList = [];
  private userData$ = new Subject<any>();
  public userDataObsevable$: Observable<any>;
  public userData;

  constructor(
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
    this.authService.isAuth2().subscribe(auth => {
      this.userData$.next(auth);
    });
  }

  private buildForm() {
    this.inventarioForm = this.formBuilder.group({
      id: [null, []],
      fecha: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      imagen: this.formBuilder.array([]),
    });
  }

  addImagenField() {
    this.imagenField.push(this.createImagenField());
  }

  createImagenField() {
    const imageField = this.formBuilder.group({
      urlImage: ['', []],
      dateImage: ['', []],
    });

    return imageField;
  }

  removeImagenField(i) {
    this.imagenField.removeAt(i);
  }

  removeAllImagenField() {
    this.imagenField.clear();
  }

  get imagenField() {
    return this.inventarioForm.get('imagen') as FormArray;
  }

  getUserData$() {
    return this.userData$.asObservable();
  }

  getInventario() {
    return this.angularFirestore
      .collection('UsersEnterprise')
      .doc(this.userData.uid)
      .collection('inventory')
      .get();
  }

  insertInventario(inventario: Inventory) {
    this.authService.isAuth2().subscribe(auth => {
      if (auth) {
        this.angularFirestore
          .collection('UsersEnterprise')
          .doc(auth.uid)
          .collection('inventory')
          .doc('id' + new Date().getTime())
          .set({
            name: inventario.name,
            brand: inventario.brand,
            amount: inventario.amount,
            date: inventario.date,
            image: inventario.image,
          });
      }
    });
  }

  updateInventario(inventario: Inventory) {
    console.log(inventario, 'inventario');
    this.authService.isAuth2().subscribe(auth => {
      if (auth) {
        console.log(auth.uid, 'uid');
        this.angularFirestore
          .collection('UsersEnterprise')
          .doc(auth.uid)
          .collection('inventory')
          .doc(inventario.id)
          .set({
            name: inventario.name,
            brand: inventario.brand,
            amount: inventario.amount,
            date: inventario.date,
            image: inventario.image,
          });
      }
    });
  }

  deleteInventario($key: string) {
    this.inventarioList.remove($key);
  }

  public populateForm(producto) {
    this.inventarioForm.patchValue(producto);
    producto.imagen.forEach(() => {
      this.addImagenField();
    });
    this.inventarioForm.get('imagen').setValue(producto.imagen);
    if (producto.imagen) {
      this.imageList = producto.imagen;
      return this.formBuilder.group({
        urlImage: [producto.imagen.urlImage, []],
        dateImage: [producto.imagen.dateImage, []],
      });
    }
  }

  resetForm(form?: FormGroup) {
    if (form != null) {
      form.reset();
      this.selectedInventario = new Inventory();
    }
    this.imageList = [];
    this.removeAllImagenField();
  }
}
