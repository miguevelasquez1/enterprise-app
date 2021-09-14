export class User {
    uid?: string;
    name?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
    photoUrl?: string;
    server?: Server;
    customer?: boolean;
}

export class Server {
    name: string;
    employee: boolean;
    admin: boolean;
}
