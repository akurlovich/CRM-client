import { IEmail, IEmailNew } from "./IEmail";
import { IPhone, IPhoneNew } from "./IPhone";

export interface IContact {
  // _id: string,
  // company: {
  //   companyID: string,
  //   title: string,
  // },
  // address: {
  //   main: string,
  //   district: string,
  // }
  // phones: [{
  //   phonesID: string,
  //   number: string,
  //   description: string,
  // }],
  // emails: [{
  //   emailsID: string,
  //   email: string,
  //   description: string,
  // }],
  _id: string,
  companyID: string,
  address: {
    main: string,
    district: string,
  },
  phonesID: IPhone[],
  emailsID: IEmail[],
}

export interface IContactNew {
  companyID: string,
  address: {
    main: string,
    district: string,
  },
  phonesID: {
    number: string,
    description: string,
  },
  emailsID: {
    email: string,
    description: string,
  }
}
