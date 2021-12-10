interface Image {
  urlImage: string;
  dateImage: string;
}

export class IItem {
  id?: string;
  name: string;
  brand: string;
  amount: number;
  date: Date;
  image?: Image[];
  employeeUid: string;
}
