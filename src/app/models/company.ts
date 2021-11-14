import { Person } from './person';

export class Company {
    $key?: string;
    name: string;
    email: string;
    phoneNumber: string;
    employees: Person[];
}