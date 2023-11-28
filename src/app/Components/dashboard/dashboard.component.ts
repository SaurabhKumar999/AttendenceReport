import { Component, OnInit, ViewChild } from '@angular/core';
import { AttendenceService } from '../../Services/service/attendence.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from '../../Services/service/supabase.service';
import { AttendenceRecord } from '../../model';
import { createClient } from '@supabase/supabase-js';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({

  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  // standalone: true,
})
export class DashboardComponent implements OnInit {
  months: string[] = [];
  employeeNames: string[] = [];
  selectedEmployee: string = '';
  showTable: boolean = false;
  showDropdown: boolean = false;
  selectedMonth: string = '';
  gridData: any[] = [];
  attendanceForm: FormGroup | any;
  email: string | null = null;
  firstName: string | null = null;

  constructor(private formBuilder: FormBuilder, private routes: Router,   private snackBar: MatSnackBar, private serve: AttendenceService, private auth: SupabaseService) {
    this.attendanceForm = this.formBuilder.group({
      selectedMonth: [''],
      selectedEmployee: ['']
    });
   
  }

  async ngOnInit(): Promise<void> {
   
    // this.fetchFirstName();
    // Populate employee dropdown with unique names
    this.serve.getAllData().subscribe((result) => {
      if (Array.isArray(result)) {
        this.employeeNames = Array.from(new Set(result.map(record => record['empName'])));
        this.months = Array.from(new Set(result.map(record => record['month'])));
      }
    });
    this.getMonths();
  }

  showSnackBar(message: string, panelClass: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: [panelClass],
    });
  }

  
  // Fetch months and employees data during component initialization
  getMonths() {
    this.serve.getMonths().subscribe(
      (result) => {
        this.months = result as any;
      },
      error => {
        console.error('Error fetching months:', error);
      }
    );
  }
  // Inside your component class
  getShortName(email: string): string {
    const atIndex = email.indexOf('@');
    if (atIndex !== -1) {
      return email.substring(0, atIndex);
    }
    return email;
  }

  // Function to generate report based on the selected month
  generateMonthReport() {
    if (this.selectedMonth) {
      this.serve.getAllData().subscribe((result) => {
        if (Array.isArray(result)) {
          const orderedMonths = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];

          this.gridData = result.filter((record) => {
            return record['month'].toLowerCase().trim() === this.selectedMonth.toLowerCase().trim();
          }).sort((a, b) => {
            return orderedMonths.indexOf(a['month']) - orderedMonths.indexOf(b['month']);
          });

          this.showTable = true;
          this.selectedEmployee = '';
        }
      });
    }
  }

  generateEmpReport() {
    if (this.selectedEmployee) {
      this.serve.getAllData().subscribe((result) => {
        if (Array.isArray(result)) {
          this.gridData = result.filter((record) => {
            return record['empName'] === this.selectedEmployee;
          });
          this.showTable = true;
          this.selectedMonth = '';
        }
      });
    }
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  onClick() {
    this.showTable = true;
  }

  logout() {
    const confirmLogout = confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      this.routes.navigate(['/HomePage']);
    }
  }


}

