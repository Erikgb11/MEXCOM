import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder) { }

  register(event: Event) {
    event.preventDefault();
    
    if (this.form.valid && this.checkPasswordMatch()) {
      // Aquí puedes enviar los datos de registro al servidor
      // Por ejemplo, puedes llamar a un servicio de registro:
      // this.authService.register(this.form.value);
    }
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
