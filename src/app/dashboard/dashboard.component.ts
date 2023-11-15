import { Component, OnInit } from '@angular/core';
import { AttendenceService } from '../service/attendence.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  managers: string[] = ['Nishant', 'Amit', 'Anshul'];
  showDropdown: boolean = false;
  showTable: boolean = false;
  selectedMonth: string = '';
  selectedEmployee: number = 0;
  employeeData: any[] = [];
  gridData: any[] = [];
  showRecordOptions: boolean = false;
  employeeName: string = '';
  designation: number = 0;
  date: number = 0;
  status: number = 0;
  loginTime: number = 0;
  logoutTime: number = 0;
  hours: number = 0;
  showReportGrid: boolean = false;

  constructor(private router: Router, private attendenceService: AttendenceService) {}

  ngOnInit() {
    // Fetch data for months
    // this.attendenceService.getAllData().subscribe(
    //   (months: string[]) => {
    //     this.months = months;
    //     console.log(this.months);
    //   },
    //   error => {
    //     console.error('Error fetching months:', error);
    //     // Handle error in a way suitable for your application
    //   }
    this.attendenceService.getAllData().subscribe(
      (res: any) => {
        this.gridData = res.data;
      },
      (error: any) => {
        console.error("Error loading data:", error);
      }
    );
    }
    // Uncomment the following block if you need to fetch employee data
    /*
    this.employeeService.getAllEmployees().subscribe(
      (data: any[]) => {
        this.employeeData = data;
        console.log(this.employeeData);
      },
      error => {
        console.error('Error fetching employees:', error);
        // Handle error in a way suitable for your application
      }
    );
    */
  

  generateReport() {
    if (this.selectedMonth && this.selectedEmployee) {
      // Placeholder logic; replace with actual logic to fetch and display data
      this.employeeName = this.employeeData.find(employee => employee.EmpId === this.selectedEmployee)?.employeeName || '';
      this.designation = 300;
      this.date = 0;
      this.status = 0;
      this.loginTime = 0;
      this.logoutTime = 0;
      this.hours = 0;
      this.showReportGrid = true;
    }
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  logout() {
    const confirmLogout = confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      this.router.navigate(['/log-in']);
    }
  }
}
