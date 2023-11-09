import { Component } from '@angular/core';
import{Router} from '@angular/router'
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  firstname: any;
  lastname: any;
  email: string = '';
  password: string = '';
  confirmpassword:string='';
  
 
  constructor(private router: Router) {}
 
  onSubmit() {
    // Access the signup form data here
    console.log('First Name:', this.firstname);
    console.log('Last Name:', this.lastname);
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    console.log('confirmpassword:', this.confirmpassword);
 
}
onLoginClick() {
  this.router.navigate(['/log-in']);
}
}
