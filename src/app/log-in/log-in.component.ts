import { Component } from '@angular/core';
import{Router} from '@angular/router'
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  email: string = '';
  password: string = '';
   
  constructor(private router: Router) {}
 
  onSubmit() {
 
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }
onSignupClick(){
  this.router.navigate(['/sign-up']);
}
onDashboardClick(){
 
  this.router.navigate(['/Dashboard']);
}
}
