import { createAsyncThunk } from "@reduxjs/toolkit";
import CompanyService from "../../../services/CompanyService";
import { ICompanyNew } from "../../../types/ICompany";

export const addCompany = createAsyncThunk(
  'COMPANY/addCompany',
  async (company: ICompanyNew, {rejectWithValue}) => {
    try {
      return await (await CompanyService.addCompany(company)).data;
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const getCompanyByID = createAsyncThunk(
  'COMPANY/getCompanyByID',
  async (companyID: string, {rejectWithValue}) => {
    try {
      return await (await CompanyService.getCompanyByID(companyID)).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const getAllCompanies = createAsyncThunk(
  'COMPANY/getAllCompanies',
  async (_, {rejectWithValue}) => {
    try {
      return await (await CompanyService.getAllCompanies()).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const deleteCompanyByID = createAsyncThunk(
  'COMPANY/deleteCompanyByID',
  async (companyID: string, {rejectWithValue}) => {
    try {
      return await (await CompanyService.deleteCompanyByID(companyID)).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);