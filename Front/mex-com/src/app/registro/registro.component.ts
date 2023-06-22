import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent {
  form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  });
  @ViewChild('nombre')
  nombre!: ElementRef<HTMLInputElement>;
  @ViewChild('apPat')
  apPat!: ElementRef<HTMLInputElement>;
  @ViewChild('apMat')
  apMat!: ElementRef<HTMLInputElement>;
  @ViewChild('email')
  email!: ElementRef<HTMLInputElement>;
  @ViewChild('password')
  password!: ElementRef<HTMLInputElement>;
  constructor(private formBuilder: FormBuilder, private _http:HttpClient) { }

  register(event: Event) {
      console.log("hOLA");
      this.registrarVendedor();
  }
  registrarVendedor() {
      let datos={
        nombre: this.nombre.nativeElement.value,
        apMat: this.apMat.nativeElement.value,
        apPat: this.apPat.nativeElement.value,
        email: this.email.nativeElement.value,
        password: this.password.nativeElement.value
      }
      console.log(datos)
      this._http.post("https://localhost:7136/Altas/GuardarDatos", datos);
  }

  checkRequiredError(controlName: string) {
    const control = this.form.get(controlName);
    return control?.hasError('required') && control.touched;
  }

  checkPasswordMatch() {
    const passwordControl = this.form.get('password');
  const confirmPasswordControl = this.form.get('confirmPassword');
  
  if (passwordControl && confirmPasswordControl) {
    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;
    return password === confirmPassword;
  }
  
  return false;
  }

  checkPasswordMismatchError() {
    const confirmPasswordControl = this.form.get('confirmPassword');
    return confirmPasswordControl?.dirty && !this.checkPasswordMatch();
  }
}
