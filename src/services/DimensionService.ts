import { AxiosResponse } from "axios";
import serverApi from "../http";
import { IDimension } from "../types/IDimension";

export default class DimensionService {
  static async addDimension(dimension: string): Promise<AxiosResponse<IDimension>> {
    return serverApi.post<IDimension>('/dimension', {title: dimension});
  };

  static async getDimensionByID(dimensionID: string): Promise<AxiosResponse<IDimension>> {
    return serverApi.get<IDimension>(`/dimension/${dimensionID}`);
  };

  // static async getProductInfoByID(id: string): Promise<AxiosResponse<IProductInfoResponse>> {
  //   return serverApi.get<IProductInfoResponse>(`/productinfo/${id}`);
  // };

  static async getAllDimensions(): Promise<AxiosResponse<IDimension[]>> {
    return serverApi.get<IDimension[]>(`/dimensions`);
  };

  // static async getDimensionsByTypeID(typeID: string): Promise<AxiosResponse<IDimensionResponse>> {
  //   return serverApi.get<IDimensionResponse>(`/colors/${typeID}`);
  // };


  static async deleteDimensionByID(dimensionID: string): Promise<AxiosResponse<IDimension>> {
    return serverApi.delete<IDimension>(`/dimension/${dimensionID}`);
  };

  // static async updateProductAmountByID(newProduct: IProductUpdate): Promise<AxiosResponse<IProductResponse>> {
  //   return serverApi.put<IProductResponse>(`/product`, newProduct);
  // };
}