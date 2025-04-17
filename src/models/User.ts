export interface IUser {
    idUser: number;
    username: string;
    email: string;
    password: string;
    telephone?: string; // facultatif
    role: 'user' | 'admin';
    date_inscription: Date;
  }
  