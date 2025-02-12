import 'express';
import { IUser } from '../routers/users/interface';

declare module 'express' {
  export interface Request {
    token?: string | null;
    account?: IUser | null;
    tester?: string;
  }
}