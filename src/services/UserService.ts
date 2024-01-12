import { AxiosResponse } from "axios";
import { IAuthResponse } from "../types/IAuthResponse";
import serverApi from '../http/index';
import { IUser, IUserUpdateIsBlocked, IUserUpdateProfileImage } from "../types/IUser";

export default class UserService {
  static async getAllUsers(): Promise<AxiosResponse<IUser[]>> {
    return serverApi.get<IUser[]>('/user/all')
  };

  static async getUserByID(id: string): Promise<AxiosResponse<IUser>> {
    return serverApi.get<IUser>(`/user/${id}/card`)
  };

  // static async updateUserProfileImage(newImage: IUserUpdateProfileImage): Promise<AxiosResponse<IUser>> {
  //   return serverApi.put<IUser>(`/users/profileImage`, newImage)
  // };

  // static async updateUserIsBlocked(newIsBlocked: IUserUpdateIsBlocked): Promise<AxiosResponse<IUser>> {
  //   return serverApi.put<IUser>(`/users/isBlocked`, newIsBlocked)
  // };
}