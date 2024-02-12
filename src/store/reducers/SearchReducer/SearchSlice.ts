import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISearchResult } from "../../../types/ISearchResult";
import { getSearchResult } from "./SearchActionCreater";
// import getSearchResult from "./SearchSlice";

interface ISearchState {
  searchResult: ISearchResult[];
  isLoading: boolean,
  error: string,
};

const initialState: ISearchState = {
  searchResult: [] as ISearchResult[],
  isLoading: false,
  error: '',
};

const searchSlice = createSlice({
  name: 'SEARCH',
  initialState,
  reducers: {
    searchResultClearArray(state) {
      state.searchResult.length = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchResult.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchResult.fulfilled, (state, action: PayloadAction<ISearchResult[]>) => {
        state.isLoading = false;
        state.searchResult = action.payload;
      })
      .addCase(getSearchResult.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { searchResultClearArray } = searchSlice.actions;

export default searchSlice.reducer;

