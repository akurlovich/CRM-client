import { AxiosResponse } from "axios";
import serverApi from "../http";
import { IOrder, IOrderNew, IOrderNewWithItems, IOrderUpdateOrderItems } from "../types/IOrder";

export default class OrderService {
  static async addOrder(orderWithItems: IOrderNewWithItems): Promise<AxiosResponse<IOrder>> {
    return serverApi.post<IOrder>('/orders', orderWithItems);
  };

  static async getOrderByID(orderID: string): Promise<AxiosResponse<IOrder>> {
    return serverApi.get<IOrder>(`/orders/${orderID}`);
  };

  static async getAllOrders(userID: string): Promise<AxiosResponse<IOrder[]>> {
    return serverApi.get<IOrder[]>(`/orders?userid=${userID}`);
  };

  static async updateOrderItemsByOrderID(data: IOrderUpdateOrderItems): Promise<AxiosResponse<IOrder>> {
    return serverApi.put<IOrder>(`/orders/${data.order.orderID}/items`, data);
  };

  static async deleteOrderByID(orderID: string): Promise<AxiosResponse<IOrder>> {
    return serverApi.delete<IOrder>(`/orders/${orderID}`);
  };

  // static async updateOrderAmountByID(newOrder: IOrderUpdate): Promise<AxiosResponse<IOrderResponse>> {
  //   return serverApi.put<IOrderResponse>(`/orderItems`, newOrder);
  // };
}