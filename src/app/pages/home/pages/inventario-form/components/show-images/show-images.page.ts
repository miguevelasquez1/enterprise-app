import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-show-images',
  templateUrl: './show-images.page.html',
  styleUrls: ['./show-images.page.scss'],
})
export class ShowImagesPage implements OnInit {

  @Input() images;
  @Input() index: number;


  @ViewChild('slides', { static: false }) slider: IonSlides;

  public slideOpts;

  public arrayX = ['sapo', 'sapo', 'sapo'];

  imageListTemp = ['ey', 'eyy ey'];

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.slideOpts = {
      initialSlide: this.index,
      speed: 400
    };
  }

  public slidePrev(slide) {
    slide.slidePrev();
  }

  public slideNext(slide) {
    slide.slideNext();
  }

  dismiss() {
    this.modalController.dismiss({
      dissmised: true
    })
  }

}
