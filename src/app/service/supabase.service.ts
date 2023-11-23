import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {  AuthChangeEvent, User, AuthError } from '@supabase/supabase-js';
import { Observable, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  
//   private authState$: Subject<AuthChangeEvent | null> = new Subject<AuthChangeEvent | null>();
 
//   private supabaseUrl = 'https://euwxylmgbqnxgkcsmwpd.supabase.co';
//   private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1d3h5bG1nYnFueGdrY3Ntd3BkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5ODA2ODQsImV4cCI6MjAxNTU1NjY4NH0.KPPvqTb39L0xHA7G0kqf9yknLKfNH7OwDfXeQ3fENXI';
//   private supabase: SupabaseClient;

//   constructor(private snackBar: MatSnackBar) {
//     this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
//     this.supabase.auth.onAuthStateChange((event, session) => {
//       this.authState$.next(event);
//     });
//   }

// extractUserId(user?: User | null): string | null {
//   return user?.id ?? null;
// }
// extractemail(user?: User | null): string | null {
//   return user?.email ?? null;
// }

   
//    async signUp(email: string, password: string) {
//     return this.supabase.auth.signUp({email,password})
//     }


//   async signIn(email: string, password: string) {
//     return this.supabase.auth.signInWithPassword({email,password})
//   }
//   async checkUserExistence(email: string): Promise<boolean> {
//     debugger
//     try {
//       const { data, error } = await this.supabase
//         .from('Users')
//         .select('id')
//         .eq('email', email);
  
//       if (error) {
//         console.error('Error checking user existence:', error);
  
    
//       }
//       if (data && data.length > 0) {
      
//         alert('User is already registered.');
//         return true;
//       } else {
    
//         return false;
//       }
//     } catch (error) {
//       console.error('Unexpected error checking user existence:', error);
  
//       alert('An unexpected error occurred. Please try again.');
//       throw error;
//     }
//   }

 
//     async getUserDetails(): Promise<User | null> {
//       try {
//         const { data, error } = await this.supabase.auth.getUser();
   
//         if (error) {
//           console.error('Error fetching user details:', error.message);
//           return null;
//         }
   
//         if (data) {
//           const userId = this.extractUserId(data.user);
     
//           const email = this.extractemail(data.user);
//           return data.user as User;
//         }
   
//         return null;
//       } catch (error) {
//         console.error('Error fetching user details:', (error as Error).message);
//         return null;
//       }
//     }
   }



