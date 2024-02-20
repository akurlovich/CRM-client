import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../constants/http";
import serverApi from "../../../http";
import AuthService from "../../../services/AuthService";
// import RoleService from "../../../services/RoleService";
import UserService from "../../../services/UserService";
import { IAuthResponse } from "../../../types/IAuthResponse";
import { IUserReg } from "../../../types/IUser";
// import { IUserUpdateIsBlocked, IUserUpdateProfileImage } from "../../../types/IUser";

// interface IUserReg {
//   email: string,
//   password: string,
//   firstname: string,
//   lastname: string,
//   isAdmin: boolean,
//   position: string,
// };

interface IUserLogin {
  email: string,
  password: string,
};

export const registerUser = createAsyncThunk(
  'AUTH/regUser',
  async (data: IUserReg, {rejectWithValue}) => {
    try {
      // const { email, password } = data;
      const response = await AuthService.registration(data);
      localStorage.setItem('token', response.data.refreshToken);
      localStorage.setItem('ref', response.data.refreshToken);
      if (response.data.refreshToken) {
        localStorage.setItem('isauth', 'true');
      } else {
        localStorage.removeItem('isauth');
      }
      // const role = await RoleService.getRoleByID(response.data.user.role[0]);
      return {
        user: response.data.user,
        // role: role.data.value,
      }
      
    } catch (error) {
      return rejectWithValue('Can not register this users')
    }
  }
);

export const loginUser = createAsyncThunk(
  'AUTH/loginUser',
  async (data: IUserLogin, {rejectWithValue}) => {
    try {
      const { email, password } = data;
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('ref', response.data.refreshToken);
      if (response.data.refreshToken) {
        localStorage.setItem('isauth', 'true');
      } else {
        localStorage.removeItem('isauth');
      }
      // const role = await RoleService.getRoleByID(response.data.user.role[0]);
      return {
        user: response.data.user,
        // role: role.data.value,
      }
    } catch (error: any) {
      console.log(error)
      // return rejectWithValue(`User with email ${data.email} not found!`)
      return rejectWithValue(error.response.data.message)
      // return rejectWithValue(error.message)
    }
  }
);

export const logoutUser = createAsyncThunk(
  'AUTH/logoutUser',
  async (_, {rejectWithValue}) => {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
      localStorage.removeItem('ref');
      localStorage.removeItem('isauth');
      return;
      
    } catch (error) {
      return rejectWithValue(`Something went wrong!`)
    }
  }
);

export const checkAuth = createAsyncThunk(
  'AUTH/chechAuth',
  async (_, {rejectWithValue}) => {
    try {
      // console.log('auth')
      // const value = `; ${document.cookie}`;
      // document.cookie = "username=Debra White; path=/";
      // document.cookie = "userId=wjgye264s; path=/";
      // console.log('cookie', document.cookie)
      const response = await axios.get<IAuthResponse>(`${API_URL}users/refresh`, {
        withCredentials: true,
        withXSRFToken: true,
        // crossDomain: true,
        headers: {
          'Access-Control-Allow-Origin': '*', 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': 'Content-Type, *',
          // 'Authorization': `${localStorage.getItem('token')}`,
          // 'Authorization': `${document.cookie}`,
          'Authorization': `${localStorage.getItem('ref')}`,
        },
        
      });
      // const response = await serverApi.get<IAuthResponse>(`${API_URL}users/refresh`, {withCredentials: true});
      // console.log('response', response.data.accessToken)
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('ref', response.data.refreshToken);
      if (response.data.refreshToken) {
        localStorage.setItem('isauth', 'true');
      } else {
        localStorage.removeItem('isauth');
      }
      // const role = await RoleService.getRoleByID(response.data.user.role[0]);
      return {
        user: response.data.user,
        // role: role.data.value,
      }
      
    } 
    // catch (error) {
    //   return rejectWithValue(`Auth went wrong!`)
    catch (error: any) {
      console.log(error)
      localStorage.removeItem('isauth');
      return rejectWithValue(error.message)
    }
  }
);

export const refreshUser = createAsyncThunk(
  'AUTH/refreshUser',
  async (_, {rejectWithValue}) => {
    try {
      // console.log('refreshUser')
      const cookieNew = `${localStorage.getItem('token')}`
      const response = await axios.post<IAuthResponse>(`${API_URL}users/refresh`, {cookie: cookieNew}, {withCredentials: true});
      // const response = await serverApi.get<IAuthResponse>(`${API_URL}users/refresh`, {withCredentials: true});
      console.log('refreshUser response', response)
      localStorage.setItem('token', response.data.accessToken);
      // const role = await RoleService.getRoleByID(response.data.user.role[0]);
      return {
        user: response.data.user,
        // role: role.data.value,
      }
      
    } 
    // catch (error) {
    //   return rejectWithValue(`Auth went wrong!`)
    catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

// export const updateUserProfileImage = createAsyncThunk(
//   'AUTH/updateUserProfileImage',
//   async (newImage: IUserUpdateProfileImage, thunkAPI) => {
//     try {
//       // return await (await UserService.updateUserProfileImage(newImage)).data;
      
//     } catch (error) {
//       return thunkAPI.rejectWithValue("Can't update user!")
//     }
//   }
// );

// export const updateUserIsBlocked = createAsyncThunk(
//   'AUTH/updateUserIsBlocked',
//   async (newIsBlocked: IUserUpdateIsBlocked, thunkAPI) => {
//     try {
//       // return await (await UserService.updateUserIsBlocked(newIsBlocked)).data;
      
//     } catch (error) {
//       return thunkAPI.rejectWithValue("Can't update user!")
//     }
//   }
// );
