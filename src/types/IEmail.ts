export interface IEmail {
  _id: string,
  companyID: string,
  email: string,
  description: string,
  isActive: boolean,
}

export interface IEmailNew {
  companyID: string,
  email: string,
  description: string,
}

export interface IEmailUpdate {
  email: string,
  description: string,
}

export interface IEmailNewAddContacts {
  contactID: string,
  email: IEmailNew
}