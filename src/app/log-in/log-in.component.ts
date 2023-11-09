import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit{
 public loginForm!: FormGroup;
  formBuilder: any;

   
  constructor(private router: Router ,private fb:FormBuilder, private http :HttpClient) {}
  ngOnInit(): void {
   this.loginForm=this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
   })
  }
  logIn()
  {
this.http.get<any>("http://localhost:4200/").subscribe(res=>{
  const user= res.find((a:any)=>{
    return a.email === this.loginForm.value.email && this.loginForm.value.password
  });
  if(user){
    alert("Login Successfully");
    this.loginForm.reset();
    this.router.navigate(['/Dashboard'])
  }else{
    alert("User not found");
  }
  },err=>{
    alert("Somthing went wrong");
  })
 
  }
}
