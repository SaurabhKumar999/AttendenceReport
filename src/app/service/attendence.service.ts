import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AttendenceService {

  constructor(private http: HttpClient) {}
// Fetch all attendance data
// getAllData(): Observable<any[]> {
//   const url = 'https://localhost:7211/api/Attendence/GetAllAttendence';
//   return this.http.get<any[]>(url);
// }
getAllData() {
  return this.http.get("https://localhost:7211/api/Attendence/GetAllAttendence");
}
}
