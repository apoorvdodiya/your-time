import { Request } from 'express';
import { IProfile } from './IProfile';
import { IUser } from './IUser';

export interface IRequest extends Request {
  userStore: Partial<IUser>;
  profileStore: Partial<IProfile>
  data: any;
  token: string;
}