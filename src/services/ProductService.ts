import { AxiosResponse } from "axios";
import serverApi from "../http";
import { IProduct, IProductNew } from "../types/IProduct";

export default class ProductService {
  static async addProduct(product: IProductNew): Promise<AxiosResponse<IProduct>> {
    return serverApi.post<IProduct>('/products', product);
  };

  static async getProductByID(productID: string): Promise<AxiosResponse<IProduct>> {
    return serverApi.get<IProduct>(`/products/${productID}`);
  };

  static async getAllProducts(): Promise<AxiosResponse<IProduct[]>> {
    return serverApi.get<IProduct[]>(`/products`);
  };

  static async deleteProductByID(productID: string): Promise<AxiosResponse<IProduct>> {
    return serverApi.delete<IProduct>(`/products/${productID}`);
  };

  // static async updateProductAmountByID(newProduct: IProductUpdate): Promise<AxiosResponse<IProductResponse>> {
  //   return serverApi.put<IProductResponse>(`/product`, newProduct);
  // };
}