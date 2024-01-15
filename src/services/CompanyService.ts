import { AxiosResponse } from "axios";
import serverApi from "../http";
import { ICompany, ICompanyNew } from "../types/ICompany";

export default class CompanyService {
  static async addCompany(company: ICompanyNew): Promise<AxiosResponse<ICompany>> {
    console.log('company client', company);
    return serverApi.post<ICompany>('/companies', company);
  };

  static async getCompanyByID(companyID: string): Promise<AxiosResponse<ICompany>> {
    return serverApi.get<ICompany>(`/companies/${companyID}`);
  };

  // static async getProductInfoByID(id: string): Promise<AxiosResponse<IProductInfoResponse>> {
  //   return serverApi.get<IProductInfoResponse>(`/productinfo/${id}`);
  // };

  static async getAllCompanies(): Promise<AxiosResponse<ICompany[]>> {
    return serverApi.get<ICompany[]>(`/companies`);
  };

  // static async getCompanysByTypeID(typeID: string): Promise<AxiosResponse<ICompanyResponse>> {
  //   return serverApi.get<ICompanyResponse>(`/colors/${typeID}`);
  // };


  static async deleteCompanyByID(companyID: string): Promise<AxiosResponse<ICompany>> {
    return serverApi.delete<ICompany>(`/companies/${companyID}`);
  };

  // static async updateProductAmountByID(newProduct: IProductUpdate): Promise<AxiosResponse<IProductResponse>> {
  //   return serverApi.put<IProductResponse>(`/product`, newProduct);
  // };
}