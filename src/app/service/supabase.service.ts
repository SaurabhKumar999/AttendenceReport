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

  // async signOut() {
  
  // }

  // getAuthState() {
  //   return this.supabase.auth.session();
  // }
}
