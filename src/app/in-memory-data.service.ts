//this is stub 

import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Employee } from './employee';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const employees = [
      {id: 1, fullName: 'А А А', position: 'cleaner', birthDate: new Date(1995, 11, 17),
    status: 'работает', commentary: '', photo: ''}
    ];
    return {employees};
  }

  // Overrides the genId method to ensure that an employee always has an id.
  genId(employees: Employee[]): number {
    return employees.length > 0 ? Math.max(...employees.map(employee => employee.id)) + 1 : 1;
  }
}