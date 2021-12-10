import { Person } from './person.interface';

export interface Company {
  $key?: string;
  name: string;
  email: string;
  phoneNumber: string;
  employees: Person[];
}
