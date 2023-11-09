import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }
  signUp(): void {
    if (this.signupForm.valid) {
      
      console.log(this.signupForm.value);
      
      this.router.navigate(['/log-in']);
    }
  }
  onLoginClick(): void {
    // Handle login button click
    this.router.navigate(['/log-in']);
  }

  passwordMatchValidator(form: FormGroup): null | object {
    const password = form.get('password');
    const confirmpassword = form.get('confirmpassword');

    return password && confirmpassword && password.value === confirmpassword.value
      ? null
      : { passwordMismatch: true };
  }

}
