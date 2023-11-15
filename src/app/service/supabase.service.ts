import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabaseUrl = 'https://euwxylmgbqnxgkcsmwpd.supabase.co';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1d3h5bG1nYnFueGdrY3Ntd3BkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5ODA2ODQsImV4cCI6MjAxNTU1NjY4NH0.KPPvqTb39L0xHA7G0kqf9yknLKfNH7OwDfXeQ3fENXI';
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  //for signup 
  async signUp(email: string, password: string) {
  return this.supabase.auth.signUp({email,password})
  }

  async signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({email,password})
  }
  async checkUserExistence(email: string): Promise<boolean> {
    try {
      const { data, error } = await this.supabase
        .from('Users')
        .select('id')
        .eq('email', email);
  
      if (error) {
        console.error('Error checking user existence:', error);
  
        // alert('An error occurred while checking user existence. Please try again.');
        // throw error;
      }
      if (data && data.length > 0) {
        // User with the given email already exists
        alert('User is already registered.');
        return true;
      } else {
        // User with the given email does not exist
        return false;
      }
    } catch (error) {
      console.error('Unexpected error checking user existence:', error);
  
      alert('An unexpected error occurred. Please try again.');
      throw error;
    }
  }
}


