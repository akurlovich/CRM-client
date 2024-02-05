import { ICompany } from "./ICompany";
import { IUser } from "./IUser";

export interface IDeal {
  _id: string,
  companyID: ICompany,
  userID: IUser,
  dealTitleID: IDealTitle,
  description: string,
  dateEnd: string,
  timeEnd: string,
  dayEnd: string,
  monthEnd: string,
  yearEnd: string,
  minuteEnd: string,
  hourEnd: string,
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
  dayEnd: string,
  monthEnd: string,
  yearEnd: string,
  minuteEnd: string,
  hourEnd: string,
  isDone: boolean,
}

export interface IDealUpdate {
  userID: string
  description: string,
  dateEnd: string,
  timeEnd: string,
  isDone: boolean,
}