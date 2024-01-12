import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import UserService from "../../../services/UserService";
import { IUser } from "../../../types/IUser";

export const fetchUsers = createAsyncThunk(
  'USER/fetchUsers',
  async (_, thunkAPI) => {
    try {
      return await (await axios.get<IUser[]>('http://localhost:4000/api/users')).data;
      
    } catch (error) {
      return thunkAPI.rejectWithValue('Don"t get users')
    }
  }
);

export const getAllUsers = createAsyncThunk(
  'USER/getAllUsers',
  async (_, {rejectWithValue}) => {
    try {
      return await (await UserService.getAllUsers()).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const getUserByID = createAsyncThunk(
  'USER/getUserByID',
  async (id: string, {rejectWithValue}) => {
    try {
      return await (await UserService.getUserByID(id)).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);











