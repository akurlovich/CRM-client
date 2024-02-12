import { AxiosResponse } from "axios";
import serverApi from "../http";
import { ICompany } from "../types/ICompany";
import { IEmail } from "../types/IEmail";
import { IPhone } from "../types/IPhone";

export default class SearchService {
  // static async addProduct(product: IProductNew): Promise<AxiosResponse<IProduct>> {
  //   return serverApi.post<IProduct>('/products', product);
  // };

  // static async getProductByID(productID: string): Promise<AxiosResponse<IProduct>> {
  //   return serverApi.get<IProduct>(`/products/${productID}`);
  // };

  // static async getSearchResult(search: string): Promise<AxiosResponse<ICompany[] | IPhone[] | IEmail[]>> {
  //   return serverApi.get<ICompany[] | IPhone[] | IEmail[]>(`/search?search=${search}`);
  // };

  static async getSearchResult(search: string): Promise<AxiosResponse<ICompany[]>> {
    return serverApi.get<ICompany[]>(`/search?search=${search}`);
  };

  // static async deleteProductByID(productID: string): Promise<AxiosResponse<IProduct>> {
  //   return serverApi.delete<IProduct>(`/products/${productID}`);
  // };

  // static async updateProductAmountByID(newProduct: IProductUpdate): Promise<AxiosResponse<IProductResponse>> {
  //   return serverApi.put<IProductResponse>(`/product`, newProduct);
  // };
}