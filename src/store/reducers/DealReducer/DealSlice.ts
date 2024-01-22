import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDeal } from "../../../types/IDeal";
import { addDeal, deleteDealByID, getAllDeals, updateDealByID } from "./DealActionCreators";

interface IDealState {
  deal: IDeal,
  deals: IDeal[],
  isLoading: boolean,
  error: string,
};

const initialState: IDealState = {
  deal: {} as IDeal,
  deals: [] as IDeal[],
  isLoading: false,
  error: '',
};

const dealSlice = createSlice({
  name: 'DEAL',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addDeal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addDeal.fulfilled, (state, action: PayloadAction<IDeal>) => {
        state.isLoading = false;
        state.deal = action.payload;
      })
      .addCase(addDeal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(getAllDeals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllDeals.fulfilled, (state, action: PayloadAction<IDeal[]>) => {
        state.isLoading = false;
        state.deals = action.payload;
      })
      .addCase(getAllDeals.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(updateDealByID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDealByID.fulfilled, (state, action: PayloadAction<IDeal>) => {
        state.isLoading = false;
        state.deal = action.payload;
      })
      .addCase(updateDealByID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(deleteDealByID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteDealByID.fulfilled, (state, action: PayloadAction<IDeal>) => {
        state.isLoading = false;
        state.deal = action.payload;
      })
      .addCase(deleteDealByID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default dealSlice.reducer;