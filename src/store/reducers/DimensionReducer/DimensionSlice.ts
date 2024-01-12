import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDimension } from "../../../types/IDimension";
import { addDimension, getAllDimensions } from "./DimensionActionCreaters";

interface IDimensionState {
  dimension: IDimension,
  dimensionAll: IDimension[],
  isLoading: boolean,
  error: string,
};

const initialState: IDimensionState = {
  dimension: {} as IDimension,
  dimensionAll: [] as IDimension[],
  isLoading: false,
  error: '',
};

const dimensionSlice = createSlice({
  name: 'DIMENSION',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addDimension.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addDimension.fulfilled, (state, action: PayloadAction<IDimension>) => {
        state.isLoading = false;
        state.dimension = action.payload;
      })
      .addCase(addDimension.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(getAllDimensions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllDimensions.fulfilled, (state, action: PayloadAction<IDimension[]>) => {
        state.isLoading = false;
        state.dimensionAll = action.payload;
      })
      .addCase(getAllDimensions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default dimensionSlice.reducer;