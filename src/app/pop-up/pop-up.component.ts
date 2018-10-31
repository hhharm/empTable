import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service'

import { TriggerService } from '../trigger.service'

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  positions: string[];

  minDate = new Date(1900, 1, 1);
  maxDate = new Date(2006, 1, 1);
  employee:Employee;

  name: string;
  position: string;
  status: string;
  birthDate: Date;
  comment: string;


  constructor(
    private employeeService: EmployeeService,
    private modalService: ModalService,
    private triggerService: TriggerService) { }

  ngOnInit() {
    this.getPositionsList();
  }

  getPositionsList(): void {
    this.employeeService.getPositionsList()
      .subscribe(positions => this.positions = positions);
  }

  public close(): void {
    this.modalService.destroy();
  }

  public save(): void {
    this.employee = new Employee(this.name.trim(),
      this.position, this.birthDate,
      this.status, this.comment
    );
    this.employeeService.addEmployee(this.employee).subscribe(emp => this.employee = emp);
    this.triggerService.update();
    this.modalService.destroy();
  }
}
