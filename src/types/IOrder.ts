import { ICompany } from "./ICompany";
import { IOrderItem, IOrderItemNew } from "./IOrderItem";
import { IUser } from "./IUser";

type StatusType = 'processing' | 'done' | 'cansel';

export interface IOrder {
  _id: string,
  orderNumber: number,
  companyID: ICompany,
  usersID: IUser,
  orderItemID: IOrderItem[],
  totalSum: number,
  description: string,
  fileName: string[],
  status: StatusType,
  createdAt: string,
}

export interface IOrderNew {
  companyID: string,
  usersID: string,
  totalSum: number,
}

export interface IOrderNewWithItems {
  order: IOrderNew,
  orderItems: IOrderItemNew[],
}

export interface IOrderNewWithItems {
  order: IOrderNew,
  orderItems: IOrderItemNew[],
}

export interface IOrderUpdateOrderItems {
  order: {
    orderID: string,
    totalSum: number,
  },
  orderItems: IOrderItemNew[],
}
