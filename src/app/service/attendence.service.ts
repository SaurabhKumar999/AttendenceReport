import { Injectable } from '@angular/core';
import { HttpClient ,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AttendenceService {
 
constructor(private http: HttpClient) { }
 

getAllData(){
  return this.http.get('https://localhost:7290/api/Attendence/GetAllAttendence');
}

getAllEmployees(){
  return this.http.get('https://localhost:7290/api/Attendence/all-Employeenames');
}
getMonths(){
  return this.http.get('https://localhost:7290/api/Attendence/all-months');
}
}




