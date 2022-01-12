import {
  AlertController,
  IonRouterOutlet,
  IonSegment,
  IonSegmentButton,
  ModalController,
} from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ChangeNameModalPage } from './modals/change-name-modal/change-name-modal.page';
import { FormControl } from '@angular/forms';
import { HomeService } from './services/home.service';
import { Router } from '@angular/router';
import { ServiceModalPage } from './modals/service-modal/service-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public sections: any;

  public selected: any;

  private indexSection: number;

  private titleSection = 'primero';

  public slideOpts = {
    slidesPerView: 2.6,
  };

  image = true;

  sliderOpts = {
    zoom: false,
    slidesPerView: 3,
    spaceBetween: 100,
  };

  spinner = false;

  public sectionName: FormControl = new FormControl('');

  @ViewChild(IonSegment) segment: IonSegment[];
  @ViewChild(IonSegmentButton) segmentButtons: IonSegmentButton[];
  constructor(
    public modalCtrl: ModalController,
    public homeService: HomeService,
    private routerOutlet: IonRouterOutlet,
    private alertController: AlertController,
    private modalController: ModalController,
    private _router: Router,
  ) {
    this.sections = [];
    // this.sectionName.valueChanges
    //     .pipe(
    //       tap(() => {
    //         this. spinner = true;
    //       }),
    //       debounceTime(500)
    //     )
    //     .subscribe(value => {
    //       this.sections[0].value = value;
    //       this.homeService.updateSections(this.sections[0]);
    //       this.spinner = false;
    //    });
  }

  ngOnInit(): void {
    this.homeService.getSections().subscribe(async sections => {
      this.sections = sections.map(section => ({
        $key: section.key,
        ...section.payload.val(),
      }));

      if (this.sections[0]) {
        this.homeService.sectionsForm.patchValue(this.sections);
      }

      if (this.sections.length > 0) {
        setTimeout(() => {
          this.selected = { ...this.sections[0] };
        });
      }
    });

    setTimeout(() => {
      if (this.sections[0]) {
        // this.homeService.insertSection(this.sections[0]);
        this.sections[0].section.forEach(section => {
          this.homeService.createSection();
        });
      }
    }, 1000);

    this.selected = { value: '' };
  }

  async openModalChangeName(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: ChangeNameModalPage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });

    return await modal.present();
  }

  public valueChanged(e: any): void {
    if (this.indexSection) {
      this.sections[this.indexSection].value = e.detail.value;
    }
  }

  public segmentChanged(e: any): void {
    if (e.detail.value === 'add') {
      this.selected = this.sections[this.sections.length - 1];
    } else {
      for (const section of this.sections) {
        if (section.$key === e.detail.value) {
          // this.homeService.segmentForm.get('value').setValue(section.value);
          this.selected = { ...section };
          this.indexSection = this.sections.map(item => item.value).indexOf(this.selected.value);
        }
      }
    }
  }

  public updateNameSection(e: Event, section: any): void {
    this.spinner = true;
    section.value = e;
    setTimeout(() => {
      // this.homeService.updateSegment(section).finally(() => {
      //   this.spinner = false;
      // });
    }, 2000);
  }

  public addFirstSection(): void {
    const firstSection = {
      value: this.titleSection,
      section: [
        {
          value: '',
          services: [{ bla: '' }],
        },
      ],
      key: '',
    };
    const section = this.homeService.insertSection(firstSection);
    this.selected = { ...firstSection, key: section.key };
    this.presentAlertRadio(0);
  }

  public addSection(index: number): void {
    this.sections.push({
      value: 'hola',
      section: {
        value: '',
        services: [],
      },
    });
    this.homeService.insertSection(this.homeService.sectionsForm.value);
    // this.presentAlertRadio(index);
    // this.homeService.sectionsForm.get('value').setValue(this.sections[this.sections.length - 1].value);
    // this.homeService.sectionsForm.get('section').setValue(this.sections[this.sections.length - 1].section);
  }

  async presentAlertRadio(index: number): Promise<void> {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Section Title',
      inputs: [
        {
          name: 'Mantenimiento',
          type: 'radio',
          label: 'Mantenimiento',
          value: 'value1',
          handler: () => {
            this.sections[index].value = 'Mantenimiento';
          },
          checked: true,
        },
        {
          name: 'Limpieza',
          type: 'radio',
          label: 'Limpieza',
          value: 'value2',
          handler: () => {
            this.sections[index].value = 'Limpieza';
          },
        },
        {
          name: 'Domicilio',
          type: 'radio',
          label: 'Domicilio',
          value: 'value3',
          handler: () => {
            this.sections[index].value = 'Domicilio';
          },
        },
        {
          name: 'Favor',
          type: 'radio',
          label: 'Favor',
          value: 'value4',
          handler: () => {
            this.sections[index].value = 'Favor';
          },
        },
        {
          name: 'Arreglo de jardin',
          type: 'radio',
          label: 'Arreglo de jardin',
          value: 'value5',
          handler: () => {
            this.sections[index].value = 'Arreglo de jardin';
          },
        },
        {
          name: 'Clases',
          type: 'radio',
          label: 'Clases',
          value: 'value6',
          handler: () => {
            this.sections[index].value = 'Clases';
          },
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {},
        },
        {
          text: 'Ok',
          handler: () => {
            this.homeService.updateSections(this.sections[index]);
          },
        },
      ],
    });

    await alert.present();
  }

  async presentServiceModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: ServiceModalPage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
    });
    return await modal.present();
  }

  public addService(): void {
    // this.homeService.addServiceField();
  }

  public navigateToServices() {
    this._router.navigate(['home/services']);
  }

  public navigateToCoupons() {
    this._router.navigate(['home/coupons']);
  }
}
