export interface IPhone {
  _id: string,
  companyID: string,
  number: string,
  description: string,
}

export interface IPhoneNew {
  companyID: string,
  number: string,
  description: string,
}

export interface IPhoneNewAddContacts {
  contactID: string,
  phone: IPhoneNew
}