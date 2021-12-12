export interface IImage {
  urlImage: string;
  dateImage: string;
}

export class IItem {
  $key?: string;
  name: string;
  brand: string;
  amount: number;
  date: Date;
  images?: IImage[];
  employeeUid: string;
}
