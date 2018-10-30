export class Employee {
    id: number; //inner field
    fullName: string; //first name, middle name, last name
    position: string; 
    birthDate: Date;
    status: string; //0 is "fired", 1 is "working at the moment"
    commentary?: string; //some additional info about the employee. It is optional
    photo?: string; //there should be url to photo

    constructor(
        private fullName: string, 
        private position: string,
        private birthDate: Date,
        private status: string, 
        private commentary: string = "",
        private photo: string=""
    ) {
    }
}