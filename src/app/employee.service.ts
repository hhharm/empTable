import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Employee } from './employee'
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
     'Content-Type': 'application/json'
   })
};

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  constructor(private http: HttpClient) { }

  private tableUrl = 'https://desolate-springs-15165.herokuapp.com/employees';
  private positionsUrl = 'https://desolate-springs-15165.herokuapp.com/positions';

  // private tableUrl = 'http://localhost:5000/employees';
  // private positionsUrl = 'http://localhost:5000/positions';

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

  updateEmployee (employee: Employee): Observable<Employee> {
    const url = `${this.tableUrl}/${employee.id}`;
    return this.http.put(url, employee, httpOptions).pipe(
      catchError(this.handleError<any>('updateEmployee'))
    );
  }

  addEmployee (employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.tableUrl, employee, httpOptions).pipe(      
      catchError(this.handleError<Employee>('addEmployee'))
    );
  }

  uploadEmployeePhoto(id: number, fileToUpload: File): Observable<any> {
    const url=`${this.tableUrl}/images/${id}`;
    //great thing about FormData is that there is no need to set 'Content Type' manually
    //btw it's content type is not 'image'. it's multiform or something
    const fileData = new FormData();
    fileData.append('photo',fileToUpload,fileToUpload.name);
    return this.http.post(url, fileData);
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
  
  getEmployeePhoto(id: number): Observable<Blob> {
    const url = `${this.tableUrl}/images/${id}`;
    return this.http.get(url, { responseType: 'blob' })
    .pipe(
        catchError(this.handleError<Blob>(`getEmployeePhoto id=${id}`))
    );
  }
}
