import { Component, OnInit } from '@angular/core';

import { Employee } from '../employee';
import { EmployeeService } from '../employee.service'

import { PopUpComponent } from '../pop-up/pop-up.component'
import { ModalService } from '../modal.service';

import { TriggerService } from '../trigger.service'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  constructor(private employeeService: EmployeeService,
    private modalService: ModalService,
    private triggerService: TriggerService) { }

  employees:Employee[];

  getEmployees() {
    //QUESTION: what does the (employees => this.emploees = employees) mean?
    //this is copy-paste from tour of heroes, but i don't get it :/
    this.employeeService.getEmployees()
      .subscribe(employees => this.employees = employees); 
  }

  createEmployee() {    
    this.modalService.init(PopUpComponent, null, {});
    this.employeeService.getEmployees()
      .subscribe(employees => this.employees = employees); 
  }

  ngOnInit() {
    this.getEmployees();
    this.triggerService.init(this);
  }
}
