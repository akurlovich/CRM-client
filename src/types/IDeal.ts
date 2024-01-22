import { IUser } from "./IUser";

export interface IDeal {
  _id: string,
  companyID: string,
  userID: IUser,
  dealTitleID: IDealTitle,
  description: string,
  dateEnd: string,
  timeEnd: string,
  isDone: boolean,
}

export interface IDealTitle {
  _id: string,
  title: string,
}

export interface IDealNew {
  companyID: string,
  userID: string,
  dealTitleID: string,
  description: string,
  dateEnd: string,
  timeEnd: string,
  isDone: boolean,
}

export interface IDealUpdate {
  userID: string
  description: string,
  dateEnd: string,
  timeEnd: string,
  isDone: boolean,
}