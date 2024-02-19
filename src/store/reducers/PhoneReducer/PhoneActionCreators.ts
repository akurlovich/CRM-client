import { createAsyncThunk } from "@reduxjs/toolkit";
import PhoneService from "../../../services/PhoneService";
import { IPhoneNewAddContacts, IPhoneUpdate } from "../../../types/IPhone";

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

export const updatePhoneByID = createAsyncThunk(
  'PHONE/updatePhoneByID',
  async ( data: {phoneID: string, phone: IPhoneUpdate}, {rejectWithValue}) => {
    try {
      return await (await PhoneService.updatePhoneByID(data.phoneID, data.phone)).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const updatePhoneIsActive = createAsyncThunk(
  'PHONE/updatePhoneIsActive',
  async ( {phoneID, isActive}: {phoneID: string, isActive: boolean}, {rejectWithValue}) => {
    try {
      return await (await PhoneService.updatePhoneIsActive(phoneID, isActive)).data;
      
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
