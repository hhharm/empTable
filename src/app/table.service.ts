import { Injectable } from '@angular/core';
import { TableComponent } from './table/table.component';
import { Employee } from './employee';


@Injectable({
  providedIn: 'root'
})
export class TableService {
  comp: TableComponent;
  padding: string = "10px";
  
  constructor() { }

  init(tableCom: TableComponent) {
    this.comp = tableCom;
    this.comp.padding = this.padding; 
  }

  setPadding(padding: string) {
    this.padding = padding;
    this.comp.padding = padding;
  }
  

  initializePage() {
    this.comp.isDisplayNext = true;
    this.comp.isDisplayPrev = true;
    this.comp.isDisplayCur = true;
    let startIndex = this.comp.employeePerPage * (this.comp.pageNumber - 1);
    if (startIndex === 0) {
      this.comp.isDisplayPrev = false;
    }
    let endIndex = this.comp.employeePerPage * this.comp.pageNumber;

    if (endIndex >= this.comp.employees.length) {
      endIndex = this.comp.employees.length;
      this.comp.isDisplayNext = false;
    }
    this.comp.pageEmployees = this.comp.employees.slice(startIndex, endIndex);
    if (startIndex === 0 && endIndex === this.comp.employees.length) {
      this.comp.isDisplayCur = false;
    }
  }

  update(employee: Employee) {
    this.comp.employees.push(employee);
    this.comp.initializePage();
  }

}
