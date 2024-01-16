export interface IPhone {
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
  number: string,
  description: string,
}

export interface IPhoneNew {
  companyID: string,
  number: string,
  description: string,
}