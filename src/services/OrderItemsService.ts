import { AxiosResponse } from "axios";
import serverApi from "../http";
import { IOrderItem, IOrderItemNew } from "../types/IOrderItem";

export default class OrderItemsService {
  static async addOrderItems(orderItems: IOrderItemNew[]): Promise<AxiosResponse<IOrderItem[]>> {
    console.log('client')
    return serverApi.post<IOrderItem[]>('/orderitems', orderItems);
  };

  static async getOrderItemsByID(orderItemsID: string): Promise<AxiosResponse<IOrderItem>> {
    return serverApi.get<IOrderItem>(`/orderItems/${orderItemsID}`);
  };

  static async getAllOrderItems(): Promise<AxiosResponse<IOrderItem[]>> {
    return serverApi.get<IOrderItem[]>(`/orderItems`);
  };

  static async deleteOrderItemByID(orderItemID: string): Promise<AxiosResponse<IOrderItem>> {
    return serverApi.delete<IOrderItem>(`/orderItems/${orderItemID}`);
  };

  // static async updateOrderItemsAmountByID(newOrderItems: IOrderItemsUpdate): Promise<AxiosResponse<IOrderItemsResponse>> {
  //   return serverApi.put<IOrderItemsResponse>(`/orderItems`, newOrderItems);
  // };
}