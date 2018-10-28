import { Component, OnInit } from '@angular/core';

import { Employee } from '../employee';
import { EmployeeService } from '../employee.service'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  constructor(private employeeService: EmployeeService) { }

  employees:Employee[];

  getEmployees() {
    //QUESTION: what does the (employees => this.emploees = employees) mean?
    //this is copy-paste from tour of heroes, but i don't get it :/
    this.employeeService.getEmployees()
      .subscribe(employees => this.employees = employees); 
  }

  ngOnInit() {
    this.getEmployees();
  }

}
