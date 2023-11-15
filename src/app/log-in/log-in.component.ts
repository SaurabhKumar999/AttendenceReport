import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SupabaseService } from '../service/supabase.service';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  loginForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder,private router: Router, private auth: SupabaseService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9a-zA-Z]).{6,}$/)
      ]]   
     });
  }
  
  onSubmit() {
    debugger
      this.auth.signIn(this.loginForm.value.email,this.loginForm.value.password)
      .then((res) => {
       console.log(res);
       if(res.data.user!.role==="authenticated"){
        this.router.navigate(["/Dashboard"])
       }
      })
      .catch((err) =>{
       console.log(err);
      //  alert('Something went wrong!please try again.');
      });
     }
 } 
  


