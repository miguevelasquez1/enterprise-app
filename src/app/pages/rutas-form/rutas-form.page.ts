import { Component, OnInit } from '@angular/core';

// import { CurrencyPipe } from '@angular/common';
import { AuthService } from '../../shared/services/auth/auth.service';
// import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

// import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';

// import { ChartService } from '../../../../shared/services/chart/chart.service';

@Component({
  selector: 'app-rutas-form',
  templateUrl: './rutas-form.page.html',
  styleUrls: ['./rutas-form.page.scss'],
})
export class RutasFormPage implements OnInit {
  // @ViewChild('placesRef') placesRef: GooglePlaceDirective;

  // Registro = [];
  userUid: string;
  userName: string;
  // public techniciansList: Array<any>;
  private month: number;
  private year: number;
  // private serverName: string;

  constructor(
    private authService: AuthService,
  ) // private router: Router, // private chartService: ChartService, // private currencyPipe: CurrencyPipe,
  {}

  submitted: boolean;
  // formControls = this.registroService.form.controls;

  ngOnInit(): void {
    this.getCurrentUser();

    // this.registroService.form.valueChanges.subscribe(form => {
    //     if (form.precio) {
    //         this.registroService.form.patchValue(
    //             {
    //                 precio: this.currencyPipe.transform(
    //                     form.precio.replace(/\D/g, '').replace(/^0+/, ''),
    //                     'USD',
    //                     'symbol-narrow',
    //                     '1.0-0',
    //                 ),
    //             },
    //             { emitEvent: false },
    //         );
    //     }
    // });

    // this.registroService.getRegistros().subscribe(list => {
    //     this.Registro = list.map(item => {
    //         return {
    //             $key: item.key,
    //             ...item.payload.val(),
    //         };
    //     });
    // });
  }

  onSubmit(): void {
    this.submitted = true;
    // if (this.registroService.form.valid) {
    //     if (this.registroService.form.get('$key').value == null) {
    //         this.registroService.insertRegistro(this.registroService.form.value);
    //         if (new Date().getFullYear() === this.year) {
    //             this.chartService.addPoint(this.month);
    //         }
    //     } else {
    //         this.registroService.updateRegistro(this.registroService.form.value);
    //         // if (new Date().getFullYear() === this.year) {
    //         //   if (this.month) {
    //         //     this.chartService.addPoint(this.month);
    //         //   }
    //         // }
    //     }
    //     this.submitted = false;
    //     this.registroService.form.reset();
    //     this.router.navigate(['/home/rutas']);
    // } else {
    //     this.registroService.form.markAllAsTouched();
    // }
  }

  getCurrentUser(): void {
    this.authService.isAuth().subscribe();
  }

  resetForm(form?: FormGroup): void {
    if (form != null) {
      form.reset();
      // this.registroService.selectedRegistro = new Registro();
    }
  }

  public getDate(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.month = new Date(target.value).getMonth();
    this.year = new Date(target.value).getFullYear();
  }
}
