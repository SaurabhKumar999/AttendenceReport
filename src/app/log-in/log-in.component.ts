import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { createClient, PostgrestError} from '@supabase/supabase-js';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  loginForm: FormGroup;
  errorMessage = ''
  invalidCredentials: boolean = false;


  constructor(private formBuilder: FormBuilder,private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, this.customEmailValidator()]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9a-zA-Z]).{6,}$/)
      ]]   
     });
  }
  customEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailPattern = /^[a-zA-Z][a-zA-Z0-9]*@[a-zA-Z]+\.[a-zA-Z]+$/;
      const isValid = emailPattern.test(control.value);
      return isValid ? null : { 'emailFormat': true };
    };
  }
  async onSubmit() {
    debugger
    // Supabase configuration
    const supabaseUrl = 'https://euwxylmgbqnxgkcsmwpd.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1d3h5bG1nYnFueGdrY3Ntd3BkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5ODA2ODQsImV4cCI6MjAxNTU1NjY4NH0.KPPvqTb39L0xHA7G0kqf9yknLKfNH7OwDfXeQ3fENXI';
    const supabase = createClient(supabaseUrl, supabaseKey);
 
    const { data, error } = await supabase.auth.signInWithPassword({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });

    if (data) {
      const { data, error } = await supabase
        .from('Attendence')
        .select()
        .eq('email', this.loginForm.value.email)
        .single();

      if (error && (error as PostgrestError).code !== '23505') {
        this.errorMessage = 'Invalid credentials. Please try again.';
      } else {
       // Store user information in local storage
       localStorage.setItem('firstName', data.firstName);
       localStorage.setItem('email', data.email);
        this.router.navigate(['/Dashboard']);
      }
    } else {
      this.errorMessage = 'Invalid credentials. Please try again.';
    }
  }
  
  
 } 
  


