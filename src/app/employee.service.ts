import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Employee } from './employee'
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor( private http: HttpClient) { }
  
  //this url (as far as I understood) is always 'api/<name of variable>'. Variable is the constant that 
  //we wrote inside in-memory-data createDB() method
  private tableUrl = 'api/employees';
/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
 
    console.error(error); // log to console instead
    return of(result as T);
  };
}
  public getEmployees():Observable<Employee[]> {
    return this.http.get<Employee[]>(this.tableUrl)
      .pipe(
        catchError(this.handleError('getEmployees', []))
    );
  }

  public getEmployee(id: number): Observable<Employee> {
    const url = `${this.tableUrl}/${id}`;
    return this.http.get<Employee>(url)
      .pipe(
        catchError(this.handleError<Employee>(`getEmployee id=${id}`)) 
    );  
  }
}
