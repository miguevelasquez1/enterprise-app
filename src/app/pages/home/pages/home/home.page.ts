import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalController, IonSegment, IonSegmentButton, IonRouterOutlet, AlertController } from '@ionic/angular';
import { debounceTime, tap } from 'rxjs/operators';
import { ServiceModalComponent } from 'src/app/modals/service-modal/service-modal.component';
import { HomeService } from '../../../../services/home.service';
import { ChangeNameModalPage } from './modal/change-name-modal/change-name-modal.page';

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
    private modalController: ModalController
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

  ngOnInit() {
    this.homeService.getSections()
      .subscribe(async sections => {
        this.sections = sections.map(section => {
          console.log({
            $key: section.key,
            ...section.payload.val()
          }, 'hola');
          return {
            $key: section.key,
            ...section.payload.val()
          };
        });

        if (this.sections[0]) {
          console.log(this.sections, 'aaaaa');
          this.homeService.sectionsForm.patchValue(this.sections);
        }

        console.log(this.sections[0], 'sections[0]');

        // this.homeService.


        if (this.sections.length > 0) {
          setTimeout(() => {
            this.selected = {...this.sections[0]};
          });
        }
      });

    setTimeout(() => {
        console.log(this.sections[0], 'a');
        if (this.sections[0]) {
          // this.homeService.insertSection(this.sections[0]);
          this.sections[0].section.forEach(section => {
            this.homeService.createSection();
            console.log(section, 'section');
          });
        }

        console.log(this.homeService.sectionsForm.value, 'sectionsFoorm');

        // this.homeService.sectionsForm.get('section').setValue(this.sections[0].section);
    }, 1000);

    this.selected = {value: ''};


  }

  async openModalChangeName() {
    const modal = await this.modalCtrl.create({
      component: ChangeNameModalPage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });

    return await modal.present();
  }

  public valueChanged(e) {
    if (this.indexSection) {
      this.sections[this.indexSection].value = e.detail.value;
    }
  }

  public segmentChanged(e) {

    if (e.detail.value === 'add') {
      this.selected = this.sections[this.sections.length - 1];
    } else {
      for ( const section of this.sections ) {
        if (section.$key === e.detail.value) {
          // this.homeService.segmentForm.get('value').setValue(section.value);
          this.selected = {...section};
          this.indexSection = this.sections.map(item => item.value).indexOf(this.selected.value);
        }
      }
    }
  }

  public updateNameSection(e, section) {
    this.spinner = true;
    section.value = e;
    setTimeout(() => {
      // this.homeService.updateSegment(section).finally(() => {
      //   this.spinner = false;
      // });
    }, 2000);
  }

  public addFirstSection() {
    const firstSection = {
      value: this.titleSection,
      section: [{
        value: '',
        services: [
          {bla: ''}
        ]
      }],
      key: ''
    };
    const section = this.homeService.insertSection(firstSection);
    this.selected = {...firstSection, key: section.key};
    this.presentAlertRadio(0);
  }

  public addSection(index: number) {
    this.sections.push({
      value: 'hola',
      section: {
        value: '',
        services: []
      }
    });
    console.log(this.sections, 'sections aa');
    console.log(this.homeService.sectionsForm.value, 'value a');
    this.homeService.insertSection(this.homeService.sectionsForm.value);
    // this.presentAlertRadio(index);
    // this.homeService.sectionsForm.get('value').setValue(this.sections[this.sections.length - 1].value);
    // this.homeService.sectionsForm.get('section').setValue(this.sections[this.sections.length - 1].section);
  }

  async presentAlertRadio(index: number) {
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
          checked: true
        },
        {
          name: 'Limpieza',
          type: 'radio',
          label: 'Limpieza',
          value: 'value2',
          handler: () => {
            this.sections[index].value = 'Limpieza';
          }
        },
        {
          name: 'Domicilio',
          type: 'radio',
          label: 'Domicilio',
          value: 'value3',
          handler: () => {
            this.sections[index].value = 'Domicilio';

          }
        },
        {
          name: 'Favor',
          type: 'radio',
          label: 'Favor',
          value: 'value4',
          handler: () => {
            this.sections[index].value = 'Favor';
          }
        },
        {
          name: 'Arreglo de jardin',
          type: 'radio',
          label: 'Arreglo de jardin',
          value: 'value5',
          handler: () => {
            this.sections[index].value = 'Arreglo de jardin';
          }
        },
        {
          name: 'Clases',
          type: 'radio',
          label: 'Clases',
          value: 'value6',
          handler: () => {
            this.sections[index].value = 'Clases';
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.homeService.updateSections(this.sections[index]);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentServiceModal() {
    const modal = await this.modalController.create({
      component: ServiceModalComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true
    });
    return await modal.present();
  }

  public addService() {
    // this.homeService.addServiceField();
  }

}
