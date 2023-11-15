import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AttendenceService {

//   constructor(private http: HttpClient) {}
// // Fetch all attendance data
// // getAllData(): Observable<any[]> {
// //   const url = 'https://localhost:7211/api/Attendence/GetAllAttendence';
// //   return this.http.get<any[]>(url);
// // }
// getAllData() {
//   return this.http.get("https://localhost:7211/api/Attendence/GetAllAttendence");
// }

constructor(private http: HttpClient) {}
 
// Fetch all attendance data
getAllData(): Observable<any[]> {
  const url = 'https://localhost:7211/api/Attendence/GetAllAttendence';
  return this.http.get<any[]>(url);
}
 
// Fetch attendance data by month and manager
getDataByMonthAndManager(selectedMonth: string, selectedManager: string): Observable<any[]> {
  const url = 'https://localhost:7211/api/Attendence/GetAllAttendence';
 
  // Set query parameters
  const params = new HttpParams()
    .set('selectedMonth', selectedMonth)
    .set('selectedManager', selectedManager);
 
  return this.http.get<any[]>(url, { params });
}
}
