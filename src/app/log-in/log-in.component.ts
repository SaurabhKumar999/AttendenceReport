import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  loginForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder,private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9a-zA-Z]).{6,}$/)
      ]]   
     });
  }
  
  onSubmit(): void {
    if (this.loginForm.valid) {
    
      console.log('Login successfully!', this.loginForm.value);
    } else {
      
      this.loginForm.markAllAsTouched();
    }
  }
}
