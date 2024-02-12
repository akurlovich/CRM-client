import { createAsyncThunk } from "@reduxjs/toolkit";
import searchService from '../../../services/SearchService'

export const getSearchResult = createAsyncThunk(
  'SEARCH/getSearchResult',
  async (search: string, {rejectWithValue}) => {
    try {
      return await (await searchService.getSearchResult(search)).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);


