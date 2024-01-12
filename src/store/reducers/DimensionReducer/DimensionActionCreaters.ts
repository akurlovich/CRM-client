import { createAsyncThunk } from "@reduxjs/toolkit";
import DimensionService from "../../../services/DimensionService";

export const addDimension = createAsyncThunk(
  'DIMENSION/addDimension',
  async (dimension: string, {rejectWithValue}) => {
    try {
      return await (await DimensionService.addDimension(dimension)).data;
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const getDimensionByID = createAsyncThunk(
  'DIMENSION/getDimensionByID',
  async (dimensionID: string, {rejectWithValue}) => {
    try {
      return await (await DimensionService.getDimensionByID(dimensionID)).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const getAllDimensions = createAsyncThunk(
  'DIMENSION/getAllDimensions',
  async (_, {rejectWithValue}) => {
    try {
      return await (await DimensionService.getAllDimensions()).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const deleteDimensionByID = createAsyncThunk(
  'DIMENSION/deleteDimensionByID',
  async (dimensionID: string, {rejectWithValue}) => {
    try {
      return await (await DimensionService.deleteDimensionByID(dimensionID)).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);