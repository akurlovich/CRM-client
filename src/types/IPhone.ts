export interface IPhone {
  _id: string,
  companyID: string,
  number: string,
  description: string,
  isActive: boolean,
}

export interface IPhoneNew {
  companyID: string,
  number: string,
  description: string,
}

export interface IPhoneUpdate {
  number: string,
  description: string,
}

export interface IPhoneNewAddContacts {
  contactID: string,
  phone: IPhoneNew
}
