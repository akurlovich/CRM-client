import { IProduct } from "./IProduct";

export interface IOrderItem {
  _id: string,
  orderID: string,
  productID: IProduct,
  price: number,
  count: number,
  sum: number,
}

export interface IOrderItemNew {
  // productID: string,
  // price: number,
  // count: number,
  // sum: number,
  itemID: string,
  productID: string,
  price: number,
  count: number,
  sum: number,
  productTitle: string,
  productDimension: string,
  vatSum: number,
  totalSum: number
}