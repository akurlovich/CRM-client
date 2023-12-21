import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDimension } from "../../../types/IDimension";
import { addDimension, getAllDimensions } from "./DimensionActionCreaters";

interface IDimensionState {
  dimension: IDimension,
  dimensionAll: IDimension[],
  isLoading: boolean,
  error: any,
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
    builder.addCase(addDimension.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addDimension.fulfilled, (state, action: PayloadAction<IDimension>) => {
      state.isLoading = false;
      state.dimension = action.payload;
    });
    builder.addCase(addDimension.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
    builder.addCase(getAllDimensions.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllDimensions.fulfilled, (state, action: PayloadAction<IDimension[]>) => {
      state.isLoading = false;
      state.dimensionAll = action.payload;
    });
    builder.addCase(getAllDimensions.rejected, (state, action) => {
      state.isLoading = false;
      console.log('action', action.payload)
      state.error = action.payload;
    });
  },
})

// export const dimensionSlice = createSlice({
//   name: 'DIMENSION',
//   initialState,
//   reducers: {},
//   extraReducers: {
    
    
//   }
// });

export default dimensionSlice.reducer;