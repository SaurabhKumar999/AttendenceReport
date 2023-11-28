import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { createClient, PostgrestError} from '@supabase/supabase-js';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent  implements OnInit{
  loginForm: FormGroup;
  errorMessage = ''
  invalidCredentials: boolean = false;
  firstName: string | null = null;
  email: string | null = null;

  constructor(private formBuilder: FormBuilder,  private snackBar: MatSnackBar,private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, this.customEmailValidator()]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9a-zA-Z]).{6,}$/)
      ]]   
     });
  }
  async ngOnInit(): Promise<void> {
    // // Fetch user's first name from Supabase
    // if (this.email) {
    //   const supabaseUrl = 'https://euwxylmgbqnxgkcsmwpd.supabase.co';
    //   const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1d3h5bG1nYnFueGdrY3Ntd3BkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5ODA2ODQsImV4cCI6MjAxNTU1NjY4NH0.KPPvqTb39L0xHA7G0kqf9yknLKfNH7OwDfXeQ3fENXI';
    //   const supabase = createClient(supabaseUrl, supabaseKey);

    //   const { data, error } = await supabase
    //     .from('Attendence')
    //     .select('firstName')
    //     .eq('email', this.email)
    //     .single();

    //   if (data) {
    //     this.firstName = data.firstName;
    //   }
    // }
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
 
   
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      });

      if (data) {
        // Fetch user's first name from Supabase
        const user = await supabase
          .from('Attendence')
          .select('firstName')
          .eq('email', this.loginForm.value.email)
          .eq('password', this.loginForm.value.password)
          .single();

        if (user.data) {
          this.firstName = user.data.firstName;

          // Show snackbar on successful login
          console.log(`Login Successfully! Welcome to Dashboard, ${this.firstName}!`);
          this.snackBar.open(`Login Successfully! Welcome to Dashboard, ${this.firstName}!`, 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['snackbar-success'],
          });

          this.router.navigate(['/Dashboard']);
        } else {
          // Handle case where user data (including first name) is not available
          console.error('User data not found in Supabase');
          this.errorMessage = 'An error occurred during login. Please try again.';
          this.showErrorMessage();
        }
      } else {
        this.errorMessage = 'Invalid credentials. Please try again.';
        this.showErrorMessage();
      }
    } catch (error) {
      console.error('Error during login:', error);
      this.errorMessage = 'An error occurred during login. Please try again.';
      this.showErrorMessage();
    }
  }

  showErrorMessage() {
    this.snackBar.open(this.errorMessage, 'Close', {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: ['snackbar-error'],
    });
  }
}
  

  


