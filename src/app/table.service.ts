import { Injectable } from '@angular/core';
import { TableComponent } from './table/table.component';
import { Employee } from './employee';


@Injectable({
  providedIn: 'root'
})
export class TableService {
  comp: TableComponent;
  padding: string = "10px";
  sortApplied: boolean = false;
  sortKey: string;
  sortOrder: boolean;
  
  constructor() { }

  init(tableCom: TableComponent) {
    this.comp = tableCom;
    this.comp.padding = this.padding; 
  }

  setPadding(padding: string) {
    this.padding = padding;
    this.comp.padding = padding;
  }

  sortEmployees(key: string) {
    if ((!this.sortApplied) || (this.sortKey != key)) {
      this.sortOrder = true; //from small values to big values
    } else {
      this.sortOrder = !this.sortOrder;
    }
    this.sortKey = key;
    this.sortApplied = true;
    this.sort();
  }

  private sort() {    
    let compare = function(a,b){
      let res = 0;
      let a_field, b_field;
      if (this.sortKey === "birthDate") {
        a_field = a[this.sortKey];
        b_field = b[this.sortKey];
      } else {
        a_field = a[this.sortKey], b_field = b[this.sortKey];
      }
      if (a_field < b_field) {
        res = -1;
      } else if (a_field > b_field) {
        res = 1;
      }
      return res;
    };
    let compareRev = function(a,b){
      let res = 0;
      if (a[this.sortKey] < b[this.sortKey]) {
        res = -1;
      } else if (a[this.sortKey] > b[this.sortKey]) {
        res = 1;
      }
      return res * (-1);
    };

    let compareFunc = this.sortOrder? compare: compareRev;
    this.comp.pageEmployees.sort(compareFunc.bind(this));
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
    if (this.sortApplied) {
      this.sort();
    }
  }

  update(employee: Employee) {
    this.comp.employees.push(employee);
    this.comp.initializePage();
  }

}
