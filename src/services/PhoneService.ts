import { AxiosResponse } from "axios";
import serverApi from "../http";
import { IPhone, IPhoneNewAddContacts } from "../types/IPhone";

export default class PhoneService {
  static async addPhone(phone: IPhoneNewAddContacts): Promise<AxiosResponse<IPhone>> {
    return serverApi.post<IPhone>('/phones', phone);
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

  // static async updatePhoneByAddress(
  //   data: {phoneID: string, newAddress: {address: {main: string, district: string}}}): Promise<AxiosResponse<IPhone>> {
  //   console.log('new address client', data);
  //   return serverApi.put<IPhone>(`/phones/${data.phoneID}`, data.newAddress);
  // };
}