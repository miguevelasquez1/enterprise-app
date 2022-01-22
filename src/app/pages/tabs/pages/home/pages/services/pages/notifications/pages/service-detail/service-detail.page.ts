import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Request } from '../../../../modals/request-form/models/request/request';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.page.html',
  styleUrls: ['./service-detail.page.scss'],
})
export class ServiceDetailPage implements OnInit {
  service: Request;

  constructor(private _route: ActivatedRoute) {}

  ngOnInit() {
    this._route.params.subscribe((params: Request) => {
      this.service = params;
      console.log(this.service, 'yrah');
    });
  }
}
