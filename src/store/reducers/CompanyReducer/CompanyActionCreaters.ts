import { createAsyncThunk } from "@reduxjs/toolkit";
import CompanyService from "../../../services/CompanyService";
import ContactService from "../../../services/ContactService";
import SearchService from "../../../services/SearchService";
import { ICompaniesQuery, ICompanyNew } from "../../../types/ICompany";
import { IContactNew } from "../../../types/IContact";

export const addCompany = createAsyncThunk(
  'COMPANY/addCompany',
  // async ({company, contact}: {company: ICompanyNew, contact: IContactNew}, {rejectWithValue}) => {
  async (data: {company: ICompanyNew, contact: IContactNew}, {rejectWithValue}) => {
    try {
      // const newContact = await (await ContactService.addContact(contact)).data;
      // console.log('new contact', newContact)
      // company.contact.contactID = newContact._id;
      // company.contact.district = contact.address.district;
      // console.log('first')
      // console.log('company from action', company)
      return await (await CompanyService.addCompany(data)).data;
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

export const getCompanyByIDQuery = createAsyncThunk(
  'COMPANY/getCompanyByIDQuery',
  async ( query: ICompaniesQuery, {rejectWithValue}) => {
    try {
      return await (await CompanyService.getCompanyByIDQuery(query)).data;
      
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

export const getAllCompaniesQuery = createAsyncThunk(
  'COMPANY/getAllCompaniesQuery',
  async ( query: ICompaniesQuery, {rejectWithValue}) => {
    try {
      return await (await CompanyService.getAllCompaniesQuery(query)).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const getSearchResultUserCompanies = createAsyncThunk(
  'COMPANY/getSearchResultUserCompanies',
  async ( userID: string, {rejectWithValue}) => {
    try {
      return await (await SearchService.getSearchResultUserCompanies(userID)).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const getSearchResultDistrictCompanies = createAsyncThunk(
  'COMPANY/getSearchResultDistrictCompanies',
  async ( district: string, {rejectWithValue}) => {
    try {
      return await (await SearchService.getSearchResultDistrictCompanies(district)).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const updateCompanyDescription = createAsyncThunk(
  'COMPANY/updateCompanyDescription',
  async ({companyID, description}: {companyID: string, description: string}, {rejectWithValue}) => {
    try {
      return await (await CompanyService.updateCompanyDescription(companyID, description)).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const updateCompanyTitle = createAsyncThunk(
  'COMPANY/updateCompanyDescription',
  async ({companyID, title}: {companyID: string, title: string}, {rejectWithValue}) => {
    try {
      return await (await CompanyService.updateCompanyTitle(companyID, title)).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const updateCompanyUsers = createAsyncThunk(
  'COMPANY/updateCompanyUsers',
  async ({companyID, users}: {companyID: string, users: string[]}, {rejectWithValue}) => {
    try {
      return await (await CompanyService.updateCompanyUsers(companyID, users)).data;
      
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