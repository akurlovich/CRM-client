import { IUser } from "./IUser";

export interface ICompany {
  // _id: string,
  // title: string,
  // users: [{
  //   userID: string,
  //   firstname: string,
  //   lastname: string,
  // }],
  // description: string,
  // contact: {
  //   contactID: string,
  //   district: string,
  // },
  // deals: [{
  //   dealsID: string,
  //   createdAt: string,
  // }],
  // ordersID: string[],
  // comments: [{
  //   commentsID: string,
  //   createdAt: string,
  // }],
  _id: string,
  title: string,
  usersID: IUser[],
  description: string,
  contactID: string[],
  dealsID: string[],
  ordersID: string[],
  commentsID: string[],
}

export interface ICompanyNew {
  title: string,
  usersID: string,
  contactID: string,
 
  // title: string,
  // users: [{
  //   userID: string,
  //   firstname: string,
  //   lastname: string,
  // }],
  // contact: {
  //   contactID: string,
  //   district: string,
  // },
}