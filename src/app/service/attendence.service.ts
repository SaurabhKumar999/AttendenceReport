import { Injectable } from '@angular/core';
import { HttpClient ,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AttendenceService {
 
private baseUrl = 'https://localhost:7211/api/Attendence';
constructor(private http: HttpClient) { }
 
getAllData(): Observable<string[]> {
  const url = `${this.baseUrl}/GetAllAttendence`; 
  return this.http.get<string[]>(url);
}

getAllEmployees(): Observable<any[]> {
  const url = `${this.baseUrl}/GetAllAttendence`;
  return this.http.get<any[]>(url);
}
}




