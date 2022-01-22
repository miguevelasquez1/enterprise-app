import { Component, OnInit } from '@angular/core';

import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  constructor(public globals: Globals) { }

  ngOnInit() {
  }

}
