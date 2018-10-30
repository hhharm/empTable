//this is stub 

import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Employee } from './employee';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const employees: Employee[] = [
      {id: 1, fullName: 'Звягенцева Юлия Андреевна', position: 'Повар', birthDate: new Date("06 Sept 1965"),
      status: 'работает', commentary: '', photo: ''},
      {id: 2, fullName: 'Иванов Пётр Васильевич', position: 'Разработчик', birthDate: new Date("01 Feb 1999"),
    status: 'работает', commentary: '', photo: ''},
  {id: 3, fullName: 'Иванова Софья Петровна', position: 'Уборщик', birthDate: new Date("02 Jan 1984"),
status: 'уволен', commentary: '', photo: ''},
{id: 4, fullName: 'Невский Пётр Георгиевич', position: 'Промоутер', birthDate: new Date("29 Feb 2004"),
status: 'уволен', commentary: '', photo: ''},
{id: 5, fullName: 'Созонов Иван Дмитриевич', position: 'Уборщик', birthDate: new Date("19 Apr 1972"),
status: 'работает', commentary: 'любит леденцы', photo: ''},
{id: 6, fullName: 'Юдинцев Сергей Леонидович', position: 'Тестировщик', birthDate: new Date("09 Jan 1991"),
status: 'работает', commentary: '', photo: ''}
    ];

    const positions  = ['Водитель', 'Разработчик', 'Повар', 'Тестировщик', 'Руководитель', 'Тестировщик', 'Уборщик', 
    'Работник цеха', 'Промоутер'];
    return {employees, positions};
  }

  // Overrides the genId method to ensure that an employee always has an id.
  genId(employees: Employee[]): number {
    return employees.length > 0 ? Math.max(...employees.map(employee => employee.id)) + 1 : 1;
  }
}