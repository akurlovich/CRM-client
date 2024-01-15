export interface IContact {
  _id: string,
  company: {
    companyID: string,
    title: string,
  },
  address: {
    main: string,
    district: string,
  }
  phones: [{
    phonesID: string,
    number: string,
    description: string,
  }],
  emails: [{
    emailsID: string,
    email: string,
    description: string,
  }],
}

export interface IContactNew {
  company: {
    companyID: string,
    title: string,
  },
  address: {
    main: string,
    district: string,
  }
  phones: [{
    phonesID: string,
    number: string,
    description: string,
  }],
  emails: [{
    emailsID: string,
    email: string,
    description: string,
  }],
}
