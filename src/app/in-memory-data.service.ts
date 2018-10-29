//this is stub 

import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Employee } from './employee';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const employees: Employee[] = [
      {id: 1, fullName: 'Иванов Пётр Васильевич', position: 'Уборщик', birthDate: new Date(1995, 11, 17),
    status: 'уволен', commentary: '', photo: ''}
    ];

    const positions  = ["Водитель", "Разработчик", "Руководитель", "Тестировщик", "Уборщик"];
    return {employees, positions};
  }

  // Overrides the genId method to ensure that an employee always has an id.
  genId(employees: Employee[]): number {
    return employees.length > 0 ? Math.max(...employees.map(employee => employee.id)) + 1 : 1;
  }
}