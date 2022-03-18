export class Request {
  $key: string;
  name: string;
  address: string;
  conditionDescription: string;
  phoneNumber: string;
  hostUid: string;
  serviceTitle: string;
}

export type RequestDto = Omit<Request, '$key'>;
