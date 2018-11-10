import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { ModalService } from '../modal.service';
import { EmployeeService } from '../employee.service'
import { TableService } from '../table.service'

import { BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  positions: string[];

  minDate = new Date(1900, 1, 1);
  maxDate = new Date(2006, 1, 1);
  employee: Employee;

  name: string;
  position: string;
  status: string;
  birthDate: Date;
  comment: string;
  locale;
  fileToUpload: File;

  constructor(
    private employeeService: EmployeeService,
    private modalService: ModalService,
    private tableService: TableService,
    private localeService: BsLocaleService) { this.locale = 'ru'; }


  ngOnInit() {
    this.getPositionsList();
    this.localeService.use(this.locale);
  }

  getPositionsList(): void {
    this.employeeService.getPositionsList()
      .subscribe(positions => this.positions = positions);
  }

  public close(): void {
    this.modalService.destroy();
  }
  private onComplete() {
    this.tableService.update(this.employee);
    this.modalService.destroy();
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
  }

  public save(): void {
    this.employee = new Employee(undefined, this.name.trim(),
      this.position, this.birthDate,
      this.status, this.comment
    );
    this.employeeService.addEmployee(this.employee).subscribe(
      emp => this.employee = emp,
      error => console.log(error + " in addEmployee()"),
      () => {
        if (this.fileToUpload) {
          this.employeeService.uploadEmployeePhoto(this.employee.id, this.fileToUpload)
            .subscribe(data => { });
        }
        this.onComplete();
      });
  }
}
