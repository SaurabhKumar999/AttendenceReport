import { Component, OnInit } from '@angular/core';
import { AttendenceService } from '../service/attendence.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  managers: string[] = ['Nishant', 'Amit', 'Anshul'];
  showGrid: boolean = false;
  gridData: any[] = [];
  selectedMonth: string = '';
  selectedManager: string = '';
  showMonth: any;
  
  showDropdown: boolean = false; // Initial value
  showTable: boolean = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

 
  constructor(private attendanceService: AttendenceService, private http: HttpClient) {}
 
  ngOnInit() {
    this.loadAllData();
  }
 
  selectMonth(month: string) {
    this.selectedMonth = month;
    this.fetchAttendanceData();
  }
 
  selectManager(manager: string) {
    this.selectedManager = manager;
    this.fetchAttendanceData();
  }
 
  fetchAttendanceData() {
    try{
    if (this.selectedMonth || this.selectedManager) {
      this.showTable = true;
      this.attendanceService.getDataByMonthAndManager(this.selectedMonth, this.selectedManager)
        .subscribe(
          (res: any) => {
            this.gridData = res.data;
          },
          (error: any) => {
            console.error('Error fetching data:', error);
          }
        );
    } else {
      this.showTable = false;
    }
  }
    catch (error) {
      console.error('Error fetching data:', error);
    }
  }
 
  loadAllData() {
    this.attendanceService.getAllData().subscribe(
      (res: any) => {
        this.gridData = res.data;
      },
      (error: any) => {
        console.error('Error loading data:', error);
      }
    );
  }
 
  }


