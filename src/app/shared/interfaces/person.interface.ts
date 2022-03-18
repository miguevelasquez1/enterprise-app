import { Service } from 'src/app/pages/tabs/pages/home/pages/services/models/service';

export interface Person {
  $key?: string;
  name: string;
  email: string;
  phoneNumber: string;
  uid?: string;
  idiom?: string;
  services?: Service[];
  isAdmin?: boolean;
}
