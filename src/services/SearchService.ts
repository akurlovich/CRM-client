import { AxiosResponse } from "axios";
import serverApi from "../http";
import { ISearchResult } from "../types/ISearchResult";

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

  static async getSearchResult(search: string): Promise<AxiosResponse<ISearchResult[]>> {
    return serverApi.get<ISearchResult[]>(`/search?search=${search}`);
  };

  // static async deleteProductByID(productID: string): Promise<AxiosResponse<IProduct>> {
  //   return serverApi.delete<IProduct>(`/products/${productID}`);
  // };

  // static async updateProductAmountByID(newProduct: IProductUpdate): Promise<AxiosResponse<IProductResponse>> {
  //   return serverApi.put<IProductResponse>(`/product`, newProduct);
  // };
}