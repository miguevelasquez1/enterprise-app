import { Component, OnInit } from '@angular/core';

import { NotificationsService } from './services/notifications/notifications.service';
import { Request } from '../../modals/request-form/models/request/request';
import { Router } from '@angular/router';
import { ServicesService } from '../../services/services/services.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  notifications: Request[];

  constructor(
    private _notificationsService: NotificationsService,
    private _servicesService: ServicesService,
    private _router: Router,
  ) {}

  async ngOnInit() {
    const getNotifications = await this._notificationsService.getNotifications();
    getNotifications.subscribe(notifications => {
      console.log(notifications, 'notifications');
      this.notifications = notifications;
    });
  }

  removeNotification($key: string) {
    console.log('pasaa');
    if ($key !== undefined) {
      this._notificationsService.removeNotification($key);
    }
    this._router.navigate(['/home/services/notifications']);
  }
}
