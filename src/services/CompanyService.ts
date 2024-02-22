import { AxiosResponse } from "axios";
import serverApi from "../http";
import { ICompaniesQuery, ICompaniesResponse, ICompany, ICompanyNew } from "../types/ICompany";
import { IContactNew } from "../types/IContact";

export default class CompanyService {
  // static async addCompany(company: ICompanyNew): Promise<AxiosResponse<ICompany>> {
  static async addCompany(data: {company: ICompanyNew, contact: IContactNew}): Promise<AxiosResponse<ICompany>> {
    // console.log('company client', data);
    return serverApi.post<ICompany>('/companies', data);
  };

  static async getCompanyByID(companyID: string): Promise<AxiosResponse<ICompany>> {
    return serverApi.get<ICompany>(`/companies/${companyID}/card`);
  };

  // static async getProductInfoByID(id: string): Promise<AxiosResponse<IProductInfoResponse>> {
  //   return serverApi.get<IProductInfoResponse>(`/productinfo/${id}`);
  // };

  static async getAllCompanies(): Promise<AxiosResponse<ICompany[]>> {
    return serverApi.get<ICompany[]>(`/companies`);
  };

  static async getAllCompaniesQuery(query: ICompaniesQuery): Promise<AxiosResponse<ICompaniesResponse>> {
    // console.log('client query', query)
    return serverApi.post<ICompaniesResponse>(`/companies/filter`, query);
  };

  static async getCompanyByIDQuery(query: ICompaniesQuery): Promise<AxiosResponse<ICompany>> {
    // console.log('client query', query)
    return serverApi.post<ICompany>(`/companies/item`, query);
  };

  // static async getCompanysByTypeID(typeID: string): Promise<AxiosResponse<ICompanyResponse>> {
  //   return serverApi.get<ICompanyResponse>(`/colors/${typeID}`);
  // };

  static async updateCompanyDescription(companyID: string, description: string): Promise<AxiosResponse<ICompany>> {
    return serverApi.put<ICompany>(`/companies/${companyID}/description`, {description: description});
  };

  static async updateCompanyTitle(companyID: string, title: string): Promise<AxiosResponse<ICompany>> {
    console.log(companyID, title)
    return serverApi.put<ICompany>(`/companies/${companyID}/title`, {title: title});
  };

  static async updateCompanyUsers(companyID: string, users: string[]): Promise<AxiosResponse<ICompany>> {
    return serverApi.put<ICompany>(`/companies/${companyID}/users`, users);
  };

  static async deleteCompanyByID(companyID: string): Promise<AxiosResponse<ICompany>> {
    return serverApi.delete<ICompany>(`/companies/${companyID}`);
  };

  // static async updateProductAmountByID(newProduct: IProductUpdate): Promise<AxiosResponse<IProductResponse>> {
  //   return serverApi.put<IProductResponse>(`/product`, newProduct);
  // };
}