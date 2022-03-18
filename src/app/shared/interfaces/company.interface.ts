import { Person } from './person.interface';

export interface Company {
  $key?: string;
  name: string;
  email: string;
  description?: string;
  phoneNumber: string;
  employees: Person[];
  uid: string;
}
