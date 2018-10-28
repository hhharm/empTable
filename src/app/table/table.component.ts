import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee'
import { EMPL_LIST } from '../mock_employees'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  employees = EMPL_LIST;
  constructor() { }

  ngOnInit() {
  }

}
