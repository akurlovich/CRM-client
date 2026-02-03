import { createAsyncThunk } from "@reduxjs/toolkit";
import PhoneService from "../../../services/PhoneService";
import { IPhoneNewAddContacts, IPhoneUpdate } from "../../../types/IPhone";
import { IEntity } from "../../../types/IComment";

export const addPhone = createAsyncThunk(
  'PHONE/addPhone',
  async (data: { phone: IPhoneNewAddContacts, entity: IEntity}, {rejectWithValue}) => {
    try {
      return await (await PhoneService.addPhone(data)).data;
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
  async ( data: {phoneID: string, phone: IPhoneUpdate, entity: IEntity}, {rejectWithValue}) => {
    try {
      return await (await PhoneService.updatePhoneByID(data)).data;
      
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
