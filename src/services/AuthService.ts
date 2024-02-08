import { AxiosResponse } from "axios";
import { IAuthResponse } from "../types/IAuthResponse";
import serverApi from '../http/index';

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
    return serverApi.post<IAuthResponse>('/users/login', {email, password});
  };

  static async registration(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
    return serverApi.post<IAuthResponse>('/users/registration', {email, password});
  };
  
  static async logout(): Promise<void> {
    return serverApi.post('/users/logout');
  }
}