import { IUser } from "./IUser";

export interface IComment {
  _id: string,
  companyID: string,
  userID: IUser,
  description: string,
  dealType: string,
  date: string,
  time: string,
}

export interface ICommentNew {
  companyID: string,
  userID: string,
  description: string,
  dealType: string,
  date: string,
  time: string,
}