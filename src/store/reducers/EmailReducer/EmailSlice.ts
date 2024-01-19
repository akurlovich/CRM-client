import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEmail } from "../../../types/IEmail";
import { addEmail, getAllEmails, updateEmailByID } from "./EmailActionCreators";

interface IEmailState {
  email: IEmail,
  emails: IEmail[],
  isLoading: boolean,
  error: string,
};

const initialState: IEmailState = {
  email: {} as IEmail,
  emails: [] as IEmail[],
  isLoading: false,
  error: '',
};

const emailSlice = createSlice({
  name: 'EMAIL',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addEmail.fulfilled, (state, action: PayloadAction<IEmail>) => {
        state.isLoading = false;
        state.email = action.payload;
      })
      .addCase(addEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(getAllEmails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllEmails.fulfilled, (state, action: PayloadAction<IEmail[]>) => {
        state.isLoading = false;
        state.emails = action.payload;
      })
      .addCase(getAllEmails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(updateEmailByID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEmailByID.fulfilled, (state, action: PayloadAction<IEmail>) => {
        state.isLoading = false;
        state.email = action.payload;
      })
      .addCase(updateEmailByID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default emailSlice.reducer;