import { createAsyncThunk } from "@reduxjs/toolkit";
import EmailService from "../../../services/EmailService";
import { IEmailNewAddContacts, IEmailUpdate } from "../../../types/IEmail";

export const addEmail = createAsyncThunk(
  'EMAIL/addEmail',
  async (email: IEmailNewAddContacts, {rejectWithValue}) => {
    try {
      return await (await EmailService.addEmail(email)).data;
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const getEmailByID = createAsyncThunk(
  'EMAIL/getEmailByID',
  async (emailID: string, {rejectWithValue}) => {
    try {
      return await (await EmailService.getEmailByID(emailID)).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const getAllEmails = createAsyncThunk(
  'EMAIL/getAllEmails',
  async (_, {rejectWithValue}) => {
    try {
      return await (await EmailService.getAllEmails()).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const updateEmailByID = createAsyncThunk(
  'EMAIL/updateEmailByID',
  async ( data: {emailID: string, email: IEmailUpdate}, {rejectWithValue}) => {
    try {
      return await (await EmailService.updateEmailByID(data.emailID, data.email)).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const updateEmailIsActive = createAsyncThunk(
  'EMAIL/updateEmailIsActive',
  async ( {emailID, isActive}: {emailID: string, isActive: boolean}, {rejectWithValue}) => {
    try {
      return await (await EmailService.updateEmailIsActive(emailID, isActive)).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const deleteEmailByID = createAsyncThunk(
  'EMAIL/deleteEmailByID',
  async (emailID: string, {rejectWithValue}) => {
    try {
      return await (await EmailService.deleteEmailByID(emailID)).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);