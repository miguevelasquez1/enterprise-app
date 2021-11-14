import { Record } from './record';
import { Inventory } from './inventory';

export class Person {
    $key?: string;
    name: string;
    email: string;
    phoneNumber: string;
    records: Record[];
    inventory: Inventory[];
}
