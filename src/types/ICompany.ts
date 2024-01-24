import { IContact } from "./IContact";
import { IDeal } from "./IDeal";
import { IUser } from "./IUser";

export interface ICompany {
  _id: string,
  title: string,
  usersID: IUser[],
  description: string,
  contactID: IContact,
  dealsID: IDeal[],
  ordersID: string[],
  commentsID: string[],
}

export interface ICompanyNew {
  title: string,
  usersID: string,
  contactID: string,
}

interface IQuery {
  path: string,
  select?: string,
  populate?: {
    path: string,
  }
}

export interface ICompaniesQuery {
  query: IQuery[],
  sort: {
    [key: string]: 'asc' | 'desc',
  },
  limit: number,
  find?: {
    [key: string]: string
  }
}



