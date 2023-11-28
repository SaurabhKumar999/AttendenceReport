import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient';
@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabaseUrl = 'https://euwxylmgbqnxgkcsmwpd.supabase.co';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1d3h5bG1nYnFueGdrY3Ntd3BkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5ODA2ODQsImV4cCI6MjAxNTU1NjY4NH0.KPPvqTb39L0xHA7G0kqf9yknLKfNH7OwDfXeQ3fENXI';
  private supabase: SupabaseClient;
  public supabaseAuth: SupabaseAuthClient;

  constructor() {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
    this.supabaseAuth = this.supabase.auth;
  }
  
   }



