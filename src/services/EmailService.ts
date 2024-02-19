import { AxiosResponse } from "axios";
import serverApi from "../http";
import { IEmail, IEmailNewAddContacts, IEmailUpdate } from "../types/IEmail";

export default class EmailService {
  static async addEmail(email: IEmailNewAddContacts): Promise<AxiosResponse<IEmail>> {
    return serverApi.post<IEmail>('/emails', email);
  };

  static async getEmailByID(emailID: string): Promise<AxiosResponse<IEmail>> {
    return serverApi.get<IEmail>(`/emails/${emailID}`);
  };

  // static async getProductInfoByID(id: string): Promise<AxiosResponse<IProductInfoResponse>> {
  //   return serverApi.get<IProductInfoResponse>(`/productinfo/${id}`);
  // };

  static async getAllEmails(): Promise<AxiosResponse<IEmail[]>> {
    return serverApi.get<IEmail[]>(`/emails`);
  };

  // static async getEmailsByTypeID(typeID: string): Promise<AxiosResponse<IEmailResponse>> {
  //   return serverApi.get<IEmailResponse>(`/colors/${typeID}`);
  // };


  static async deleteEmailByID(emailID: string): Promise<AxiosResponse<IEmail>> {
    return serverApi.delete<IEmail>(`/emails/${emailID}`);
  };

  static async updateEmailByID(emailID: string, email: IEmailUpdate): Promise<AxiosResponse<IEmail>> {
    return serverApi.put<IEmail>(`/emails/${emailID}`, email);
  };

  static async updateEmailIsActive(emailID: string, isActive: boolean): Promise<AxiosResponse<IEmail>> {
    return serverApi.put<IEmail>(`/emails/${emailID}`, { isActive: isActive });
  };

  // static async updateEmailByAddress(
  //   data: {emailID: string, newAddress: {address: {main: string, district: string}}}): Promise<AxiosResponse<IEmail>> {
  //   console.log('new address client', data);
  //   return serverApi.put<IEmail>(`/emails/${data.emailID}`, data.newAddress);
  // };
}