import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service'
import { Router } from '@angular/router';

import { TableComponent } from '../table.component'
import { TriggerService } from '../trigger.service'

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  positions: string[];
  newEmployee: Employee;
  
  minDate = new Date(1900, 1, 1);
  maxDate = new Date(2006, 1, 1);


  constructor(
    private employeeService: EmployeeService,
    private modalService: ModalService,
    private triggerService: TriggerService) { }

  ngOnInit() {
    this.newEmployee = new Employee();
    this.getPositionsList();
  }

  getPositionsList(): void {
    this.employeeService.getPositionsList() 
    .subscribe(positions => this.positions = positions); 
  }

  public close() : void {
    this.modalService.destroy();
  }

  public save() : void {  
    this.newEmployee.fullName = this.newEmployee.fullName.trim();
    this.employeeService.addEmployee(this.newEmployee).subscribe(employee => this.newEmployee = employee);
    this.triggerService.update();
    this.modalService.destroy();
    }
  }

}
