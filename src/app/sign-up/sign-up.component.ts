
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AbstractControl, ValidatorFn,} from '@angular/forms';
import { createClient, SupabaseClient } from '@supabase/supabase-js';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  
  signupForm: FormGroup;
  private supabaseUrl = 'https://euwxylmgbqnxgkcsmwpd.supabase.co';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1d3h5bG1nYnFueGdrY3Ntd3BkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5ODA2ODQsImV4cCI6MjAxNTU1NjY4NH0.KPPvqTb39L0xHA7G0kqf9yknLKfNH7OwDfXeQ3fENXI';
  private supabase: SupabaseClient;

  constructor(private formBuilder: FormBuilder, private router: Router,) {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(25), this.alphanumericValidator()]],
      lastName: ['', [Validators.required, Validators.maxLength(25), this.alphanumericValidator()]],
      email: ['', [Validators.required, Validators.email, this.customEmailValidator()]],
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
      this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }
  alphanumericValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isValid = /^[a-zA-Z]+$/.test(control.value);
      return isValid ? null : { 'alphanumeric': true };
    };
  }
  customEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailPattern = /^[a-zA-Z][a-zA-Z0-9]*@[a-zA-Z]+\.[a-zA-Z]+$/;
      const isValid = emailPattern.test(control.value);
      return isValid ? null : { 'emailFormat': true };
    };
  }
   // Method to handle form submission
   async onSubmit() {
    debugger
    if (this.signupForm.valid) {
      try {
        const emailChecker = await this.supabase
          .from('Attendence')
          .select('*')
          .eq('email', this.signupForm.value.email)
          .single();

        if (emailChecker.data) {
          alert('Email is already registered. Please try again with a different email.');
        } else {
          const { data, error } = await this.supabase.auth.signUp({
            email: this.signupForm.value.email,
            password: this.signupForm.value.password,
          });

          if (error) {
            alert(error.message);
          } else if (data) {
            const { firstName, lastName, email, password } = this.signupForm.value;
            this.signUpToSupabase(firstName, lastName, email, password);
              // Store user information in local storage
          localStorage.setItem('firstName', firstName);
          localStorage.setItem('email', email);
            this.router.navigate(['/log-in']);
          }
        }
      } catch (error) {
        console.error('Error during sign-up:', error);
      }
    }
  }

  async signUpToSupabase(firstName: string, lastName: string, email: string, password: string) {
    try {
      const { data, error } = await this.supabase
        .from('Attendence')
        .insert([{ firstName, lastName, email, password }])
        .select();

      if (error) {
        console.error('Error inserting data into Attendence:', error.message);
      }
    } catch (error) {
      console.error('Error signing up to Supabase:', error);
    }
  }
  
}