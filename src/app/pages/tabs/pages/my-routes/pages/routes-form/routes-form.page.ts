import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-routes-form',
  templateUrl: './routes-form.page.html',
  styleUrls: ['./routes-form.page.scss'],
})
export class RoutesFormPage implements OnInit {
  // @ViewChild('placesRef') placesRef: GooglePlaceDirective;

  // Registro = [];
  userUid: string;
  userName: string;
  // public techniciansList: Array<any>;
  private month: number;
  private year: number;
  // private serverName: string;

  constructor(
    private authService: AuthService, // public recordService: Record
  ) {}

  submitted: boolean;
  // formControls = this.registroService.form.controls;

  ngOnInit(): void {
    this.getCurrentUser();
  }

  onSubmit(): void {
    this.submitted = true;
  }

  getCurrentUser(): void {
    this.authService.isAuth2().subscribe();
  }

  resetForm(form?: FormGroup): void {
    if (form != null) {
      form.reset();
    }
  }

  public getDate(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.month = new Date(target.value).getMonth();
    this.year = new Date(target.value).getFullYear();
  }
}
