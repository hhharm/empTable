import { Component, OnInit } from '@angular/core';

import { Employee } from '../employee';

import { PopUpComponent } from '../pop-up/pop-up.component'

import { ModalService } from '../modal.service';
import { EmployeeService } from '../employee.service'
import { TableService } from '../table.service'

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
  padding: string;

  constructor(private employeeService: EmployeeService,
    private modalService: ModalService,
    private tableService: TableService) {
    this.pageNumber = 1;
    this.employeePerPage = 20;
    this.isDisplayPrev = false;
    this.isDisplayNext = false;
    this.isDisplayCur = false;
  }

  sort(key: string) {
    this.tableService.sortEmployees(key);
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
    this.tableService.setPadding(padding);
  }

  getEmployees() {
    this.employeeService.getEmployees()
      .subscribe(employees => this.employees = employees,
        error => console.log("Some error happened in getEmployees()"),
        () => this.initializePage());
  }

  initializePage() {
    this.tableService.initializePage();
  }

  createEmployee() {
    this.modalService.init(PopUpComponent, null, {});
  }

  ngOnInit() {
    this.getEmployees();
    this.tableService.init(this);
  }
}
