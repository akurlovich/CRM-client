import { AxiosResponse } from "axios";
import { IAuthResponse } from "../types/IAuthResponse";
import serverApi from '../http/index';
import { IUserReg } from "../types/IUser";

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
    return serverApi.post<IAuthResponse>('/users/login', {email, password});
  };

  static async registration(data: IUserReg): Promise<AxiosResponse<IAuthResponse>> {
    return serverApi.post<IAuthResponse>('/users/registration', data);
  };
  
  static async logout(): Promise<void> {
    return serverApi.post('/users/logout');
  };

  // static async refreshUser(cookie: string): Promise<AxiosResponse<IAuthResponse>> {
  //   return serverApi.post<IAuthResponse>('/users/refresh', {cookie: cookie});
  // }
}