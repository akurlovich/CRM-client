import { AxiosResponse } from "axios";
import serverApi from "../http";
import { IPhone, IPhoneNewAddContacts, IPhoneUpdate } from "../types/IPhone";
import { IEntity } from "../types/IComment";

export default class PhoneService {
  static async addPhone( data: {phone: IPhoneNewAddContacts, entity: IEntity}): Promise<AxiosResponse<IPhone>> {
    return serverApi.post<IPhone>('/phones', data);
  };

  static async getPhoneByID(phoneID: string): Promise<AxiosResponse<IPhone>> {
    return serverApi.get<IPhone>(`/phones/${phoneID}`);
  };

  // static async getProductInfoByID(id: string): Promise<AxiosResponse<IProductInfoResponse>> {
  //   return serverApi.get<IProductInfoResponse>(`/productinfo/${id}`);
  // };

  static async getAllPhones(): Promise<AxiosResponse<IPhone[]>> {
    return serverApi.get<IPhone[]>(`/phones`);
  };

  // static async getPhonesByTypeID(typeID: string): Promise<AxiosResponse<IPhoneResponse>> {
  //   return serverApi.get<IPhoneResponse>(`/colors/${typeID}`);
  // };


  static async deletePhoneByID(phoneID: string): Promise<AxiosResponse<IPhone>> {
    return serverApi.delete<IPhone>(`/phones/${phoneID}`);
  };

  static async updatePhoneByID(data: {phoneID: string, phone: IPhoneUpdate, entity: IEntity}): Promise<AxiosResponse<IPhone>> {
    return serverApi.put<IPhone>(`/phones/${data.phoneID}`, data);
  };

  static async updatePhoneIsActive(phoneID: string, isActive: boolean): Promise<AxiosResponse<IPhone>> {
    return serverApi.put<IPhone>(`/phones/${phoneID}`, { isActive: isActive });
  };

  // static async updatePhoneByAddress(
  //   data: {phoneID: string, newAddress: {address: {main: string, district: string}}}): Promise<AxiosResponse<IPhone>> {
  //   console.log('new address client', data);
  //   return serverApi.put<IPhone>(`/phones/${data.phoneID}`, data.newAddress);
  // };
}