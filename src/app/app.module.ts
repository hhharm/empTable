import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';

import { HttpClientModule }    from '@angular/common/http';

import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';

import { DatepickerModule, BsDatepickerModule, BsLocaleService  } from 'ngx-bootstrap/datepicker';
import { ruLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';
defineLocale('ru', ruLocale);

import { PopUpComponent } from './pop-up/pop-up.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    EmployeeDetailComponent,
    PopUpComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot() 
  ],
  entryComponents:[
    PopUpComponent
  ],
  providers: [BsLocaleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
