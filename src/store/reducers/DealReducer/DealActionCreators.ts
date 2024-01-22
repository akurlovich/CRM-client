import { createAsyncThunk } from "@reduxjs/toolkit";
import DealService from "../../../services/DealService";
import { IDealNew, IDealUpdate } from "../../../types/IDeal";

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