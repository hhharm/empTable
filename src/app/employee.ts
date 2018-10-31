export class Employee {
    id: number; //inner field
    fullName: string; //first name, middle name, last name
    position: string; 
    birthDate: Date;
    status: string; //0 is "fired", 1 is "working at the moment"
    commentary?: string; //some additional info about the employee. It is optional

    constructor(
         fullName: string, 
         position: string,
         birthDate: Date,
         status: string, 
         commentary: string = ""
    ) {
        this.fullName = fullName;
        this.position = position;
        this.birthDate = birthDate;
        this.status = status;
        this.commentary = commentary;
    }
}