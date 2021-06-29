export interface IUser {
  nameuser?: string;
  wallet?: string;
  key?: string;
  use_name?: string;
  use_lastname?: string;
  use_phone?: string;
  use_email?: string;
  is_valid?: boolean;
  use_id?: number;
}

export interface IResponseCrudUser {
  tbl_users: ICrudUser;
}

export interface ICrudUser {
  dataValues: IUser;
}
