export interface IEmail {
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
  email: string,
  description: string,
}

export interface IEmailNew {
  companyID: string,
  email: string,
  description: string,
}