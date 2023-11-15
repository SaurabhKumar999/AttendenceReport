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
  // onSubmit() {
  //   this.auth.signUp(this.signupForm.value.email, this.signupForm.value.password)
  //     .then((res) => {
  //       console.log(res);
  //       if (res.data.user && res.data.user.role === "authenticated") {
  //         // User successfully signed up
  //         this.router.navigate(["/log-in"]);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       if (error.message && error.message.includes('Unique')) {
  //         // User already exists, handle the error accordingly
  //         alert('User already exists. Please choose a different email.');
  //       } else {
  //         // Handle other errors here
  //       }
  //     });
  // }
  onSubmit() {
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;
  
    // Check if the user already exists before attempting to sign up
    this.auth.checkUserExistence(email)
      .then((exists) => {
        if (exists) {
          // User already exists, show an error or take appropriate action
          alert("User already exists. Please choose a different email.");
        } else {
          // User doesn't exist, proceed with sign-up
          this.auth.signUp(email, password)
            .then((res) => {
              console.log(res);
              if (res.data.user && res.data.user.role === "authenticated") {
                // User successfully signed up
                this.router.navigate(["/log-in"]);
              }
            })
            .catch((error) => {
              // Handle sign-up error
              console.error("Sign-up failed:", error);
            });
        }
      })
      .catch((error) => {
        // Handle user existence check error
        console.error("Error checking user existence:", error);
        alert('user is already registered');

      });
  }
  
}
