import { Injectable } from '@angular/core';
import { TableComponent } from './table/table.component';
import { Employee } from './employee';


@Injectable({
  providedIn: 'root'
})
export class TriggerService {
  comp: TableComponent;
  
  constructor() { }

  init(tableCom: TableComponent) {
    this.comp = tableCom; 
  }

  update(employee: Employee) {
    this.comp.employees.push(employee);
    this.comp.initializePage();
  }

}
