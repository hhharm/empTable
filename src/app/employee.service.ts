import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Employee } from './employee'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor( private http: HttpClient) { }
  
  //this url (as far as I understood) is always 'api/<name of variable>'. Variable is the constant that 
  //we wrote inside in-memory-data createDB() method
  private tableUrl = 'api/employees';

  public getEmployees():Observable<Employee[]> {
    return this.http.get<Employee[]>(this.tableUrl);
  }
}
