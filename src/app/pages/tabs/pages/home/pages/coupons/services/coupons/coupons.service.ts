import { FormBuilder, FormGroup } from '@angular/forms';

import { AngularFireList } from '@angular/fire/compat/database';
import { Coupon } from '../../models/coupon.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CouponsService {
  couponsListRef: AngularFireList<Coupon>;

  couponForm: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.buildCouponForm();
  }

  buildCouponForm() {
    this.couponForm = this._fb.group({
      $key: ['', []],
    });
  }
}
