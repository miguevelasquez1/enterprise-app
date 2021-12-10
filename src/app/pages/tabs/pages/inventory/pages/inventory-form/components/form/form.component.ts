import { AlertController, IonRouterOutlet, ModalController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Component, OnInit } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { IItem } from 'src/app/shared/models/item';
import { InventoryService } from '../../../../../../../../shared/services/inventory/inventory.service';
import { Router } from '@angular/router';
import { ShowImagesPage } from '../show-images/show-images.page';
import { finalize } from 'rxjs/operators';

/**
 * Form Component
 */
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  /**
   * Temporal photos
   */
  private files: Array<Blob>;

  /**
   * count the number of times you press the add images button
   */
  public buttonCount: number;

  /**
   * number of times available to press the add images button
   */
  public limitCount: number;

  /**
   * Image list of the inventory form
   */
  private imageList: Array<any>;

  /**
   * Image list temporal.
   */
  public imageListTemp: Array<any>;

  /**
   * Object list in the form
   */
  private inventarioList: Array<any>;

  /**
   * Disabled or enabled button to send form.
   */
  public button: boolean;

  /**
   * @param inventarioService Inventory secction service
   * @param storage help to add images
   * @param router navigate between images
   * @param alertCtrl Alerts
   */
  constructor(
    public inventoryService: InventoryService,
    private storage: AngularFireStorage,
    private router: Router,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet,
  ) {
    this.files = [];
    this.imageList = [];
    this.imageListTemp = [];
    this.disableButtonImage();
    this.button = false;
  }

  /**
   * Inicializa pagina con el ngOninit de Angular.
   * Trae el inventario de la base de datos.
   * Asigna la lista de Imágenes.
   *
   * @author Miguel Velásquez
   */
  ngOnInit(): void {
    this.disableButtonImage();
    this.imageListTemp = [...this.inventoryService.imageList];
    this.imageList = [...this.inventoryService.imageList];
  }

  /**
   * Inicializa pagina con el Método de Ionic.
   *
   * @author Miguel Velásquez
   */
  ionViewWillEnter(): void {
    this.imageListTemp = [...this.inventoryService.imageList];
    this.imageList = [...this.inventoryService.imageList];
  }

  /**
   * Define Número de veces que se puede oprimir Botón de agregar Imágenes.
   *
   * @author Miguel Velásquez
   */
  private disableButtonImage() {
    this.limitCount = 10;
    this.buttonCount = this.inventoryService.imageList.length;
  }

  /**
   * Retorna fecha para mostrarla en el html.
   *
   * @author Miguel Velásquez
   * @param e $event
   * @returns Fecha
   */
  public getDate(e: any): number {
    return new Date(e.target.value).getMonth();
  }

  /**
   * Send data.
   *
   * @author Miguel Velásquez
   */
  public onSubmit(): void {
    if (this.inventoryService.inventarioForm.valid) {
      if (this.files.length > 0) {
        this.uploadPhotosToFirebase();
      } else {
        this.sendData();
      }
    }
  }

  /**
   * Upload photos to firebase.
   *
   * @author Miguel Velásquez
   */
  private async uploadPhotosToFirebase() {
    this.button = true;
    for (const file of this.files) {
      const id = Math.random().toString(36).substring(2);
      const filePath = `uploads/${id}`;
      const ref = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      task
        .snapshotChanges()
        .pipe(
          finalize(async () => {
            await ref.getDownloadURL().subscribe(url => {
              const date = new Date();
              const monthNames = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
              ];

              const month = monthNames[date.getMonth()];
              const day = date.getDate();
              const year = date.getFullYear();
              this.inventoryService.addImagenField();
              this.imageList.push({
                urlImage: url.toString(),
                dateImage: `${day} ${month} / ${year}`,
              });
              this.inventoryService.inventarioForm.get('imagen').setValue(this.imageList);
              if (file === this.files[this.files.length - 1]) {
                this.sendData();
              }
            });
          }),
        )
        .subscribe();
    }
  }

  /**
   * send form data to the data bases.
   *
   * @author Miguel Velásquez
   */
  private sendData() {
    if (this.inventoryService.inventarioForm.get('id').value === null) {
      this.inventoryService.insertItem(this.inventoryService.inventarioForm.value);
    } else {
      this.inventoryService.updateInventory(this.inventoryService.inventarioForm.value);
    }

    this.inventoryService.resetForm(this.inventoryService.inventarioForm);
    this.router.navigate(['/inventory']);
  }

  /**
   * add field to add image.
   *
   * @author Miguel Velásquez
   */
  public addField(): void {
    this.buttonCount++;
  }

  /**
   * Quit field to add image.
   *
   * @author Miguel Velásquez
   */
  public removeField(): void {
    this.buttonCount--;
  }

  /**
   * take photo with the camera.
   *
   * @author Miguel Velásquez
   */
  public async takePicture(): Promise<void> {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64,
    });

    const rawData = atob(image.base64String);
    const bytes = new Array(rawData.length);
    for (let x = 0; x < rawData.length; x++) {
      bytes[x] = rawData.charCodeAt(x);
    }
    const arr = new Uint8Array(bytes);
    this.files.push(new Blob([arr], { type: 'image/png' }));

    const reader = new FileReader();
    reader.onloadend = () => {
      const date = new Date();
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

      const month = monthNames[date.getMonth()];
      const day = date.getDate();
      const year = date.getFullYear();
      this.imageListTemp.push({
        urlImage: reader.result,
        dateImage: `${day} ${month} / ${year}`,
      });
    };
    reader.readAsDataURL(this.files[this.files.length - 1]);
  }

  /**
   * Remove image.
   *
   * @author Miguel Velásquez
   * @param image Imagen que va a remover
   */
  public async removeImage(image: string): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: '¿Seguro de que quieres eliminar esta imagen?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'accept',
          handler: () => {
            // no esta funcionando como se espera
            const index = this.imageList.indexOf(image);
            this.imageList.splice(index, 1);
            this.imageListTemp.splice(index, 1);
            this.inventoryService.removeImagenField(index);
          },
        },
      ],
    });

    alert.present();
  }

  /**
   * Método para ir a la lista de inventarios sin guardar el formulario.
   *
   * @author Miguel Velásquez
   */
  public exitWithouthSave(): void {
    this.alertCtrl.create({
      header: '¿Deseas salir sin guardar los cambios?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'accept',
          handler: () => {
            this.router.navigate(['/home/inventario']);
          },
        },
      ],
    });
  }

  public async showImage(index: number): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: ShowImagesPage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      componentProps: {
        images: this.imageListTemp,
        index,
      },
      presentingElement: this.routerOutlet.nativeEl,
    });

    return await modal.present();
  }
}
