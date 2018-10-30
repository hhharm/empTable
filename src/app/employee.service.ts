import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Employee } from './employee'
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  //this url (as far as I understood) is always 'api/<name of variable>'. Variable is the constant that 
  //we wrote inside in-memory-data createDB() method
  private tableUrl = 'api/employees';
  private positionsUrl = 'api/positions';
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      return of(result as T);
    };
  }

   getPositionsList(): Observable<string[]> {
    return this.http.get<string[]>(this.positionsUrl)
    .pipe (
      catchError(this.handleError('getPositionsList',[]))
    );
  }

   getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.tableUrl)
      .pipe(
        catchError(this.handleError('getEmployees', []))
      );
  }

   getEmployee(id: number): Observable<Employee> {
    const url = `${this.tableUrl}/${id}`;
    return this.http.get<Employee>(url)
      .pipe(
        catchError(this.handleError<Employee>(`getEmployee id=${id}`))
      );
  }

  updateEmployee (employee: Employee): Observable<Employee> {
    return this.http.put(this.tableUrl, employee, httpOptions).pipe(
      catchError(this.handleError<any>('updateEmployee'))
    );
  }

  addEmployee (employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.tableUrl, employee, httpOptions).pipe(      
      catchError(this.handleError<Employee>('addEmployee'))
    );
  }
}
