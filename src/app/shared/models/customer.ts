export class Customer {
  $key?: string;
  uid?: string;
  name: string;
  email: string;
  phoneNumber: string;
  addresses?: Address[];
  addressSelected?: string;
  idiom?: string;
}

export class Address {
  $key?: string;
  address: string;
}
