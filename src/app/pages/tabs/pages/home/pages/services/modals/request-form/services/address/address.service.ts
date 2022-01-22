import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

import { Address } from '../../../../../../../../../../shared/models/customer';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  addressesRef: AngularFireList<Address>;

  constructor(private _db: AngularFireDatabase, private _authService: AuthService) {
    this.setAddressRef();
  }

  deleteAddress($key: string): Promise<void> {
    console.log($key, 'avr');
    return this.addressesRef.remove($key);
  }

  async getAddresses(): Promise<Observable<Address[]>> {
    await this.setAddressRef();
    console.log('2', this.addressesRef);
    return this.addressesRef
      .snapshotChanges()
      .pipe(map(changes => changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))));
  }

  async setAddressRef(): Promise<void> {
    console.log('1');
    const user = await this._authService.getUser();
    console.log(user.uid, 'uid');
    this.addressesRef = this._db.list(`customers/${user.uid}/addresses`);
    console.log(this.addressesRef);
  }

  insertAddress(address) {
    return this.addressesRef.push({
      address,
    });
  }
}
