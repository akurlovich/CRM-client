import { createAsyncThunk } from "@reduxjs/toolkit";
import PhoneService from "../../../services/PhoneService";
import { IPhoneNewAddContacts } from "../../../types/IPhone";

export const addPhone = createAsyncThunk(
  'PHONE/addPhone',
  async (phone: IPhoneNewAddContacts, {rejectWithValue}) => {
    try {
      return await (await PhoneService.addPhone(phone)).data;
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const getPhoneByID = createAsyncThunk(
  'PHONE/getPhoneByID',
  async (phoneID: string, {rejectWithValue}) => {
    try {
      return await (await PhoneService.getPhoneByID(phoneID)).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const getAllPhones = createAsyncThunk(
  'PHONE/getAllPhones',
  async (_, {rejectWithValue}) => {
    try {
      return await (await PhoneService.getAllPhones()).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const deletePhoneByID = createAsyncThunk(
  'PHONE/deletePhoneByID',
  async (phoneID: string, {rejectWithValue}) => {
    try {
      return await (await PhoneService.deletePhoneByID(phoneID)).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);