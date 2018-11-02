import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EmployeeService } from '../employee.service'
import { Employee } from '../employee'

import { BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employee: Employee;
  positions: string[];

  locale='ru';
  
  minDate = new Date(1900, 1, 1);
  maxDate = new Date(2006, 1, 1);

  constructor(private location: Location,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private localeService: BsLocaleService
    ) { }

   ngOnInit() {
    this.getEmployee();
    this.getPositionsList();
    this.localeService.use(this.locale);
  }

  getPositionsList(): void {
    this.employeeService.getPositionsList() 
    .subscribe(positions => this.positions = positions); 
  }

  getEmployee(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.employeeService.getEmployee(id)
    .subscribe(employee => this.employee = employee,
      error => console.log("Error: ", error),
      () => this.fixDate());
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.employeeService.updateEmployee(this.employee)
      .subscribe(() => this.goBack());
  }

  private fixDate(): void {
    var tmpDate: string;
    tmpDate = this.employee.birthDate.toString();
    this.employee.birthDate = new Date(tmpDate);
  }
}