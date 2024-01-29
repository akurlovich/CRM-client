export interface IOrderItem {
  _id: string,
  orderID: string,
  productID: string,
  price: number,
  count: number,
  sum: number,
}

export interface IOrderItemNew {
  productID: string,
  price: number,
  count: number,
  sum: number,
}