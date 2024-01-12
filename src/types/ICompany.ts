export interface ICompany {
  _id: string,
  title: string,
  usersID: string[],
  description: string,
  contactID: string,
  dealsID: string[],
  ordersID: string[],
  commentsID: string[],
}

export interface ICompanyNew {
  title: string,
  usersID: string[],
  description: string,
  contactID: string,
  dealsID: string[],
  ordersID: string[],
  commentsID: string[],
}