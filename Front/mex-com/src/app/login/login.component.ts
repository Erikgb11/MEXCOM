import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  showRegistration = false;
  title = 'MEX-COM';
  form: FormGroup;
  styleImage = 'maps';

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      email: new FormControl('', Validators.required)
    });
  }

  goToHome($myParam: string = ''): void {
    const navigationDetails: string[] = ['/Home'];
    if($myParam.length) {
      navigationDetails.push($myParam);
    }
    this.router.navigate(navigationDetails);
  }
  ngOnInit(): void {
    this.buildForm();
  }
  private buildForm(): any {
    this.form = this.formBuilder.group({email:['',[Validators.required, Validators.email]],password:['',[Validators.required,Validators.minLength(6)]]});
  }

  unsplashClass() {
    return {
      'min-height': '100%',
      background: `url(https://source.unsplash.com/random/1200x900?"${this.styleImage}") no-repeat center center`,
      'background-size': 'cover',
      position: 'relative'
    };
  }

  login(event: Event): any {
    event?.preventDefault();
    if (this.form.valid){
      const value = this.form.value;
      console.log(`'%CUSER: '${value.email} - PASSWORD: ${value.password}`,'background: #222; color: #bada55');
    }
  }
  
  checkRequiredError(): boolean {
    return this.form.controls['email'].hasError('required');
  }

  toggleRegistration() {
    this.showRegistration = !this.showRegistration;
  }
}
