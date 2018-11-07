import { Component, OnInit } from '@angular/core';

import { Employee } from '../employee';

import { PopUpComponent } from '../pop-up/pop-up.component'

import { ModalService } from '../modal.service';
import { EmployeeService } from '../employee.service'
import { TriggerService } from '../trigger.service'


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  employeePerPage: number;
  employees: Employee[];
  pageNumber: number;
  pageEmployees: Employee[];
  isDisplayPrev: boolean;
  isDisplayNext: boolean;
  isDisplayCur: boolean;
  padding: "10px 10px";

  constructor(private employeeService: EmployeeService,
    private modalService: ModalService,
    private triggerService: TriggerService) {
    this.pageNumber = 1;
    this.employeePerPage = 20;
    this.isDisplayPrev = false;
    this.isDisplayNext = false;
    this.isDisplayCur = false;
  }

  prev() {
    this.pageNumber--;
    this.initializePage();
  }

  next() {
    this.pageNumber++;
    this.initializePage();
  }

  changeNumPerPage() {
    this.pageNumber = 1;
    this.initializePage();
  }

  changePadding(padding) {
    this.padding = padding;
  }

  initializePage() {
    this.isDisplayNext = true;
    this.isDisplayPrev = true;
    this.isDisplayCur = true;
    let startIndex = this.employeePerPage * (this.pageNumber - 1);
    if (startIndex === 0) {
      this.isDisplayPrev = false;
    }
    let endIndex = this.employeePerPage * this.pageNumber;

    if (endIndex >= this.employees.length) {
      endIndex = this.employees.length;
      this.isDisplayNext = false;
    }
    this.pageEmployees = this.employees.slice(startIndex, endIndex);
    if (startIndex === 0 && endIndex === this.employees.length) {
      this.isDisplayCur = false;
    }
  }

  getEmployees() {
    this.employeeService.getEmployees()
      .subscribe(employees => this.employees = employees,
        error => console.log("Some error happened in getEmployees()"),
        () => this.initializePage());
  }

  createEmployee() {
    this.modalService.init(PopUpComponent, null, {});
  }

  ngOnInit() {
    this.getEmployees();
    this.triggerService.init(this);
  }
}
