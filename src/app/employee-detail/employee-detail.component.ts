import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EmployeeService } from '../employee.service'
import { Employee } from '../employee'

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employee: Employee;
  positions: string[];

  constructor(private location: Location,
    private route: ActivatedRoute,
    private employeeService: EmployeeService) { }

    submitted = false;

  onSubmit() { this.submitted = true; }

  ngOnInit() {
    this.getEmployee();
    this.getPositionsList();
  }


  getPositionsList(): void {
    this.employeeService.getPositionsList() 
    .subscribe(positions => this.positions = positions); 
  }

  getEmployee(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.employeeService.getEmployee(id)
    .subscribe(employee => this.employee = employee);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.employeeService.updateEmployee(this.employee)
      .subscribe(() => this.goBack());
  }
}
