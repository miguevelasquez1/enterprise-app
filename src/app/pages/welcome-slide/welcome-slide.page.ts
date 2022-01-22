import { Component, OnInit } from '@angular/core';

import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-welcome-slide',
  templateUrl: './welcome-slide.page.html',
  styleUrls: ['./welcome-slide.page.scss'],
})
export class WelcomeSlidePage implements OnInit {

  constructor(public globals: Globals) { }

  ngOnInit() {
  }

}
