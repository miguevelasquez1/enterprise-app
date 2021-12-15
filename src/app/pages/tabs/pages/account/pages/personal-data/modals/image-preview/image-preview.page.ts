import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.page.html',
  styleUrls: ['./image-preview.page.scss'],
})
export class ImagePreviewPage implements OnInit {
  @Input() imgUrl: string;

  constructor() {}

  ngOnInit() {}
}
