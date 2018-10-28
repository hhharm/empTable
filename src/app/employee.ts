import { InternalNgModuleRef } from "@angular/core/src/linker/ng_module_factory";

export class Employee {
    id: number; //inner field
    fullName: string; //first name, middle name, last name
    position: string; 
    birthDate: Date;
    status: number; //0 is "fired", 1 is "working at the moment"
    commentary: string; //some additional info about the employee. It is optional
    photo: string; //there should be url to photo
}