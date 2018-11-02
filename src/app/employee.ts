export class Employee {
    constructor(
         public id: number = undefined,
         public fullName: string, 
         public position: string,
         public birthDate: Date,
         public status: string, 
         public commentary: string = ""
    ) { }
}