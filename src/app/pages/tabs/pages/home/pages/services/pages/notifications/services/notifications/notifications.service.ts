import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from 'src/app/pages/tabs/pages/home/pages/services/modals/request-form/models/request/request';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  notificationsRef: AngularFireList<Request>;

  constructor(private _authService: AuthService, private _aFDB: AngularFireDatabase) {}

  async getNotifications(): Promise<Observable<Request[]>> {
    const type = (await this._authService.isCompany()) ? 'companies' : 'persons';
    const user = await this._authService.getUser();
    console.log(`${type}/${user.uid}/requests`, 'avrrr');
    this.notificationsRef = this._aFDB.list(`${type}/${user.uid}/requests`);

    return this.notificationsRef
      .snapshotChanges()
      .pipe(map(changes => changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }))));
  }
}
