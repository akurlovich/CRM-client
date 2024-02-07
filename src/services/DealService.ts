import { AxiosResponse } from "axios";
import serverApi from "../http";
import { ICompaniesQuery } from "../types/ICompany";
import { IDeal, IDealNew, IDealsQuery, IDealTitle, IDealUpdate } from "../types/IDeal";

export default class DealService {
  static async addDeal(deal: IDealNew): Promise<AxiosResponse<IDeal>> {
    return serverApi.post<IDeal>('/deals', deal);
  };

  static async getDealByID(dealID: string): Promise<AxiosResponse<IDeal>> {
    return serverApi.get<IDeal>(`/deals/${dealID}`);
  };

  static async getAllDeals(): Promise<AxiosResponse<IDeal[]>> {
    return serverApi.get<IDeal[]>(`/deals`);
  };

  static async getAllDealTitles(): Promise<AxiosResponse<IDealTitle[]>> {
    return serverApi.get<IDealTitle[]>(`/dealtitles`);
  };

  static async getDealsWithQuery(query: ICompaniesQuery): Promise<AxiosResponse<IDeal[]>> {
    return serverApi.post<IDeal[]>('/deals/filter', query);
  };

  static async getAllDealsByUserQuery(query: IDealsQuery): Promise<AxiosResponse<IDeal[]>> {
    return serverApi.post<IDeal[]>('/deals/userquery', query);
  };
  
  static async updateDealByID(dealID: string, deal: IDealUpdate): Promise<AxiosResponse<IDeal>> {
    return serverApi.put<IDeal>(`/deals/${dealID}`, deal);
  };

  static async deleteDealByID(dealID: string): Promise<AxiosResponse<IDeal>> {
    return serverApi.delete<IDeal>(`/deals/${dealID}`);
  };

};