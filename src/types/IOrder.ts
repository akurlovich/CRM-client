import { IOrderItem, IOrderItemNew } from "./IOrderItem";

type StatusType = 'processing' | 'done' | 'cansel';

export interface IOrder {
  _id: string,
  orderNumber: number,
  companyID: string,
  usersID: string,
  orderItemID: IOrderItem[],
  totalSum: number,
  description: string,
  fileName: string[],
  status: StatusType,
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
