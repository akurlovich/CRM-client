import { AxiosResponse } from "axios";
import serverApi from "../http";
import { IContact, IContactNew, IContactUpdateByAddress } from "../types/IContact";

export default class ContactService {
  static async addContact(contact: IContactNew): Promise<AxiosResponse<IContact>> {
    // console.log('contact client', contact);
    return serverApi.post<IContact>('/contacts', contact);
  };

  static async getContactByID(contactID: string): Promise<AxiosResponse<IContact>> {
    return serverApi.get<IContact>(`/contacts/${contactID}`);
  };

  

  // static async getProductInfoByID(id: string): Promise<AxiosResponse<IProductInfoResponse>> {
  //   return serverApi.get<IProductInfoResponse>(`/productinfo/${id}`);
  // };

  static async getAllContacts(): Promise<AxiosResponse<IContact[]>> {
    return serverApi.get<IContact[]>(`/contacts`);
  };

  // static async getContactsByTypeID(typeID: string): Promise<AxiosResponse<IContactResponse>> {
  //   return serverApi.get<IContactResponse>(`/colors/${typeID}`);
  // };


  static async deleteContactByID(contactID: string): Promise<AxiosResponse<IContact>> {
    return serverApi.delete<IContact>(`/contacts/${contactID}`);
  };

  static async deletePhoneFromContactByPhoneID(phoneID: string): Promise<AxiosResponse<IContact>> {
    return serverApi.delete<IContact>(`/contacts/${phoneID}/phones`);
  };

  static async deleteEmailFromContactByPhoneID(phoneID: string): Promise<AxiosResponse<IContact>> {
    return serverApi.delete<IContact>(`/contacts/${phoneID}/emails`);
  };

  static async updateContactByAddress(
    data: IContactUpdateByAddress): Promise<AxiosResponse<IContact>> {
    // console.log('new address client', data);
    return serverApi.put<IContact>(`/contacts/${data.contactID}`, data.newAddress);
  };
}