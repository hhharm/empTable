//this is stub 

import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Employee } from './employee';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const employees: Employee[] = [
      new Employee(1, 'Звягенцева Юлия Андреевна', 'Повар', new Date("06 Sept 1965"), 'работает'),
      new Employee(2, 'Иванов Пётр Васильевич', 'Разработчик', new Date("01 Feb 1999"), 'работает'),
      new Employee(3, 'Иванова Софья Петровна', 'Уборщик', new Date("02 Jan 1984"), 'уволен'),
      new Employee(4, 'Невский Пётр Георгиевич', 'Промоутер', new Date("29 Feb 2004"), 'уволен'),
      new Employee(5, 'Созонов Иван Дмитриевич', 'Уборщик', new Date("19 Apr 1972"), 'работает', 'любит леденцы'),
      new Employee(6, 'Юдинцев Сергей Леонидович', 'Тестировщик', new Date("09 Jan 1991"), 'работает')
    ];

    const positions = ['Водитель', 'Разработчик', 'Повар', 'Тестировщик', 'Руководитель', 'Тестировщик', 'Уборщик',
      'Работник цеха', 'Промоутер'];
    return { employees, positions };
  }

  // Overrides the genId method to ensure that an employee always has an id.
  genId(employees: Employee[]): number {
    return employees.length > 0 ? Math.max(...employees.map(employee => employee.id)) + 1 : 1;
  }
}