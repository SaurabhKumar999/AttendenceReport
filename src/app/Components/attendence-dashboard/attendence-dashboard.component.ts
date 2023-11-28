import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendenceService } from '../../Services/service/attendence.service';
import { AttendenceRecord } from '../../model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-attendence-dashboard',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './attendence-dashboard.component.html',
  styleUrl: './attendence-dashboard.component.css'
})
export class AttendenceDashboardComponent {
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  employeeNames: string[] = ['Saurabh', 'Vivek', 'Sahil', 'Dev'];
  
  showTable: boolean = false;
  showDropdown: boolean = false;
  selectedMonth: string = '';
  selectedEmployee: string = '';
  gridData: any[] = [];


  
  attendanceForm: FormGroup | any;
  result: any[] = [];

  constructor(private router: Router, private formBuilder: FormBuilder, private serve: AttendenceService) {
    serve.getAllData().subscribe((result) => {
      this.gridData = result as any;
      console.log(this.gridData);
    });



    // Initialize your form here
    this.attendanceForm = this.formBuilder.group({
      selectedMonth: [''],
      selectedEmployee: ['']
    });
  }
  generateMReport() {
    if (this.selectedMonth) {
      console.log('Selected Month:', this.selectedMonth);
      this.serve.getAllData().subscribe((result) => {
        console.log('All Data:', result);
        if (Array.isArray(result)) {
          this.gridData = result.filter((record) => {
            console.log('Record Month:', record['month']);
            return record['month'].toLowerCase().trim() === this.selectedMonth.toLowerCase().trim();
          });
          console.log('Filtered Data:', this.gridData);
          this.showTable = true;
          this.selectedEmployee = '';
        }
      });
    }
  }
  generateEReport() {
    debugger;
    if (this.selectedEmployee) {
      console.log('Selected Employee:', this.selectedEmployee);
      this.serve.getAllData().subscribe((result) => {
        console.log('All Data:', result);
        if (Array.isArray(result)) {
          // Assuming 'EmpName' is the correct property in your data structure
          this.gridData = result.filter((record) => {
            return record['empName'] === this.selectedEmployee;
          });


          console.log('Filtered Data for Selected Month:', this.gridData);

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
      this.router.navigate(['/log-in']);
    }
  }
}
