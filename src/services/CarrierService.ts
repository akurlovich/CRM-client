import { AxiosResponse } from "axios";
import { IContactNew } from "../types/IContact";
import { ICarrier, ICarrierNew, ICarriersResponse } from "../types/ICarrier";
import serverApi from "../http";
import { ICompaniesQuery } from "../types/ICompany";

export default class CarrierService {
  // static async addCompany(company: ICompanyNew): Promise<AxiosResponse<ICompany>> {
  static async addCarrier(data: {carrier: ICarrierNew, contact: IContactNew}): Promise<AxiosResponse<ICarrier>> {
    // console.log('company client', data);
    return serverApi.post<ICarrier>('/carriers', data);
  };

  static async getCarrierByID(companyID: string): Promise<AxiosResponse<ICarrier>> {
    return serverApi.get<ICarrier>(`/carriers/${companyID}/card`);
  };

  // static async getProductInfoByID(id: string): Promise<AxiosResponse<IProductInfoResponse>> {
  //   return serverApi.get<IProductInfoResponse>(`/productinfo/${id}`);
  // };

  static async getAllCarriers(): Promise<AxiosResponse<ICarrier[]>> {
    return serverApi.get<ICarrier[]>(`/carriers`);
  };

  static async getAllCarriersQuery(query: ICompaniesQuery): Promise<AxiosResponse<ICarriersResponse>> {
    // console.log('client query', query)
    return serverApi.post<ICarriersResponse>(`/carriers/filter`, query);
  };

  static async getCarrierByIDQuery(query: ICompaniesQuery): Promise<AxiosResponse<ICarrier>> {
      // console.log('client query', query)
    return serverApi.post<ICarrier>(`/carriers/item`, query);
  };

  static async updateCarrierTitle(carrierID: string, title: string): Promise<AxiosResponse<ICarrier>> {
      // console.log(companyID, title)
    return serverApi.put<ICarrier>(`/carriers/${carrierID}/title`, {title: title});
  };

  static async updateCarrierDescription(carrierID: string, description: string): Promise<AxiosResponse<ICarrier>> {
      return serverApi.put<ICarrier>(`/carriers/${carrierID}/description`, {description: description});
    };

  static async deleteCarrierByID(carrierID: string): Promise<AxiosResponse<ICarrier>> {
    return serverApi.delete<ICarrier>(`/carriers/${carrierID}`);
  };
}