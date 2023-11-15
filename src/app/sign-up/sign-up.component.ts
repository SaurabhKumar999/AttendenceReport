import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from '../service/supabase.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private auth: SupabaseService) {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9a-zA-Z]).{6,}$/)
      ]],
      confirmPassword: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9a-zA-Z]).{6,}$/),
      ]]    });
  }
  onSubmit() {
   this.auth.signIn(this.signupForm.value.email,this.signupForm.value.password)
   .then((res) => {
    console.log(res);
   })
   .catch((err) =>{
    console.log(err);
   });
  }
}
