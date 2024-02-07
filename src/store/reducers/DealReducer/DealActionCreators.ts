import { createAsyncThunk } from "@reduxjs/toolkit";
import DealService from "../../../services/DealService";
import { ICompaniesQuery } from "../../../types/ICompany";
import { IDealNew, IDealsQuery, IDealUpdate } from "../../../types/IDeal";

export const addDeal = createAsyncThunk(
  'DEAL/addDeal',
  async (deal: IDealNew, {rejectWithValue}) => {
    try {
      return await (await DealService.addDeal(deal)).data;
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const getDealByID = createAsyncThunk(
  'DEAL/getDealByID',
  async (dealID: string, {rejectWithValue}) => {
    try {
      return await (await DealService.getDealByID(dealID)).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const getAllDeals = createAsyncThunk(
  'DEAL/getAllDeals',
  async (_, {rejectWithValue}) => {
    try {
      return await (await DealService.getAllDeals()).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const getAllDealTitles = createAsyncThunk(
  'DEAL/getAllDealTitles',
  async (_, {rejectWithValue}) => {
    try {
      return await (await DealService.getAllDealTitles()).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const getDealsWithQuery = createAsyncThunk(
  'DEAL/getDealsWithQuery',
  async ( query: ICompaniesQuery, {rejectWithValue}) => {
    try {
      return await (await DealService.getDealsWithQuery(query)).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const getAllDealsByUserQuery = createAsyncThunk(
  'DEAL/getAllDealsByUserQuery',
  async ( query: IDealsQuery, {rejectWithValue}) => {
    try {
      return await (await DealService.getAllDealsByUserQuery(query)).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const updateDealByID = createAsyncThunk(
  'DEAL/updateDealByID',
  async ( data: {dealID: string, deal: IDealUpdate}, {rejectWithValue}) => {
    try {
      return await (await DealService.updateDealByID(data.dealID, data.deal)).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const deleteDealByID = createAsyncThunk(
  'DEAL/deleteDealByID',
  async (dealID: string, {rejectWithValue}) => {
    try {
      return await (await DealService.deleteDealByID(dealID)).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);