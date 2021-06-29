import { IUser } from "./user.interface";
export interface IDataBlocchain {
  block: Partial<IUser>;
  hash: string;
}
