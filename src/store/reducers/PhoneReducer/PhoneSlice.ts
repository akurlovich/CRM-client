import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPhone } from "../../../types/IPhone";
import { addPhone, getAllPhones, updatePhoneByID } from "./PhoneActionCreators";

interface IPhoneState {
  phone: IPhone,
  phones: IPhone[],
  isLoading: boolean,
  error: string,
};

const initialState: IPhoneState = {
  phone: {} as IPhone,
  phones: [] as IPhone[],
  isLoading: false,
  error: '',
};

const phoneSlice = createSlice({
  name: 'PHONE',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPhone.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addPhone.fulfilled, (state, action: PayloadAction<IPhone>) => {
        state.isLoading = false;
        state.phone = action.payload;
      })
      .addCase(addPhone.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(getAllPhones.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPhones.fulfilled, (state, action: PayloadAction<IPhone[]>) => {
        state.isLoading = false;
        state.phones = action.payload;
      })
      .addCase(getAllPhones.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(updatePhoneByID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePhoneByID.fulfilled, (state, action: PayloadAction<IPhone>) => {
        state.isLoading = false;
        state.phone = action.payload;
      })
      .addCase(updatePhoneByID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default phoneSlice.reducer;