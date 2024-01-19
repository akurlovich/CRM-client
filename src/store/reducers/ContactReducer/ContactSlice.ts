import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IContact, IContactNew } from "../../../types/IContact";
import { addContact, deletePhoneFromContactByPhoneID, getAllContacts, updateContactByAddress } from "./ContactActionCreators";

interface IContactState {
  contact: IContact,
  contactNew: IContactNew,
  contacts: IContact[],
  isLoading: boolean,
  error: string,
};

const initialState: IContactState = {
  contact: {} as IContact,
  contactNew: {} as IContactNew,
  contacts: [] as IContact[],
  isLoading: false,
  error: '',
};

const contactSlice = createSlice({
  name: 'CONTACT',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addContact.fulfilled, (state, action: PayloadAction<IContact>) => {
        state.isLoading = false;
        state.contact = action.payload;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(getAllContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllContacts.fulfilled, (state, action: PayloadAction<IContact[]>) => {
        state.isLoading = false;
        state.contacts = action.payload;
      })
      .addCase(getAllContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(updateContactByAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateContactByAddress.fulfilled, (state, action: PayloadAction<IContact>) => {
        state.isLoading = false;
        state.contact = action.payload;
      })
      .addCase(updateContactByAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(deletePhoneFromContactByPhoneID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePhoneFromContactByPhoneID.fulfilled, (state, action: PayloadAction<IContact>) => {
        state.isLoading = false;
        state.contact = action.payload;
      })
      .addCase(deletePhoneFromContactByPhoneID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default contactSlice.reducer;