import { Component, OnInit } from '@angular/core';
import { AttendenceService } from '../service/attendence.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  implements OnInit {
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  managers: string[]=['Nishant','Amit', 'Anshul']
  showGrid: boolean = false; // Initially, hide the grid
  gridData: any[] = []; // Replace this with your data
  AttendenceService:any;
  constructor(private attendanceService: AttendenceService) {
    
  }
  
  selectMonth(month: string) {
    if (month === 'January' || month === 'February' || month === 'March' || month === 'April' || month === 'May'
    || month === 'June' || month === 'July' || month === 'August' || month === 'September' || month === 'October'
    || month === 'November' || month === 'December') {
      
      this.showGrid = true;
    } else {
      this.showGrid = false; // Hide the grid for other months
    }
  }
    selectManager(managers: string) {
      if (managers === 'Nishant' || managers === 'Amit' || managers === 'Anshul' ) {
        
        this.showGrid = true;
      } else {
        this.showGrid = false; // Hide the grid for other months
      }
    }

    ngOnInit() {
      this.loadAllData();
      
    }
    loadAllData() {
      this.attendanceService.getAllData().subscribe(
        (res: any) => {
          this.gridData = res.data;
        },
        (error: any) => {
          console.error("Error loading data:", error);
        }
      );
    }
  }


