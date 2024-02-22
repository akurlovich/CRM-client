import { IComment } from "./IComment";
import { IContact } from "./IContact";
import { IDeal } from "./IDeal";
import { IOrder } from "./IOrder";
import { IUser } from "./IUser";

export interface ICompany {
  _id: string,
  title: string,
  usersID: IUser[],
  description: string,
  contactID: IContact,
  dealsID: IDeal[],
  ordersID: IOrder[],
  commentsID: IComment[],
}

export interface ICompaniesResponse {
  count: number,
  companies: ICompany[],
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
  page?: number,
  limit: number,
  find?: {
    [key: string]: string,
    // key: any
  }
}



