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

  locale = 'ru';

  minDate = new Date(1900, 1, 1);
  maxDate = new Date(2006, 1, 1);

  imageUrl: any = "/assets/nophoto.png"
  fileToUpload: File = null;

  constructor(private location: Location,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private localeService: BsLocaleService
  ) { }

  ngOnInit() {
    this.getEmployee();
    this.getPositionsList();
    this.localeService.use(this.locale);
    this.getEmployeeImage();
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageUrl = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
  }

  getEmployeeImage() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.employeeService.getEmployeePhoto(id).subscribe(data => {
      this.createImageFromBlob(data);
    }, error => {
      console.log(error);
    });
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

  public save(): void {
    if (this.fileToUpload) {
      this.employeeService.uploadEmployeePhoto(this.employee.id, this.fileToUpload)
      .subscribe(data => {});
    }
    this.employeeService.updateEmployee(this.employee)
      .subscribe(employee => this.employee = employee,
        error => console.log("Error: ", error),
        () => this.goBack());
  }

  private fixDate(): void {
    /* date format after sending through http is broken, but this fixes it */
    var tmpDate: string;
    tmpDate = this.employee.birthDate.toString();
    this.employee.birthDate = new Date(tmpDate);
  }
}
