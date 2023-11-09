import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
 public signupForm !: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private http : HttpClient) {  }
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
    throw new Error('Method not implemented.');
  }
  signUp(): void {
    if (this.signupForm.valid) {
      this.http.post<any>("http://localhost:4200/", this.signupForm.value);
      // console.log(this.signupForm.value);
      alert("Sign up Successfully");
      this.signupForm.reset();
      this.router.navigate(['/log-in']);
    }
  }
  passwordMatchValidator(form: FormGroup): null | object {
    const password = form.get('password');
    const confirmpassword = form.get('confirmpassword');

    return password && confirmpassword && password.value === confirmpassword.value
      ? null
      : { passwordMismatch: true };
  }

}
