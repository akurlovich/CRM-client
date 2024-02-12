import { IUser, IUserAuth } from "./IUser";

export interface IAuthResponse {
  accessToken: string,
  refreshToken: string,
  user: IUserAuth,
}