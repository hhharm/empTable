import { Injectable } from '@angular/core';
import { TableComponent } from './table/table.component';


@Injectable({
  providedIn: 'root'
})
export class TriggerService {
  comp: TableComponent;
  
  constructor() { }

  init(tableCom: TableComponent) {
    this.comp = tableCom; 
  }

  update() {
    this.comp.getEmployees();
  }

}
