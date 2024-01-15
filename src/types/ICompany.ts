export interface ICompany {
  _id: string,
  title: string,
  users: [{
    userID: string,
    firstname: string,
    lastname: string,
  }],
  description: string,
  contact: {
    contactID: string,
    district: string,
  },
  deals: [{
    dealsID: string,
    createdAt: string,
  }],
  ordersID: string[],
  comments: [{
    commentsID: string,
    createdAt: string,
  }],
}

export interface ICompanyNew {
  title: string,
  users: [{
    userID: string,
    firstname: string,
    lastname: string,
  }],
  contact: {
    contactID: string,
    district: string,
  },
}