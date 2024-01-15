import { createAsyncThunk } from "@reduxjs/toolkit";
import ContactService from "../../../services/ContactService";
import { IContactNew } from "../../../types/IContact";

export const addContact = createAsyncThunk(
  'CONTACT/addContact',
  async (contact: IContactNew, {rejectWithValue}) => {
    try {
      return await (await ContactService.addContact(contact)).data;
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const getContactByID = createAsyncThunk(
  'CONTACT/getContactByID',
  async (contactID: string, {rejectWithValue}) => {
    try {
      return await (await ContactService.getContactByID(contactID)).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const getAllContacts = createAsyncThunk(
  'CONTACT/getAllContacts',
  async (_, {rejectWithValue}) => {
    try {
      return await (await ContactService.getAllContacts()).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const deleteContactByID = createAsyncThunk(
  'CONTACT/deleteContactByID',
  async (contactID: string, {rejectWithValue}) => {
    try {
      return await (await ContactService.deleteContactByID(contactID)).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const updateContactByAddress = createAsyncThunk(
  'CONTACT/updateContactByAddress',
  async (data: {contactID: string, newAddress: { address: {main: string, district: string}}}, {rejectWithValue}) => {
    try {
      return await (await ContactService.updateContactByAddress(data)).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);