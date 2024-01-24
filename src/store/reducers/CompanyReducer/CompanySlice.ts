import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICompany, ICompanyNew } from "../../../types/ICompany";
import { IDeal } from "../../../types/IDeal";
import { IUser } from "../../../types/IUser";
import { addCompany, getAllCompanies, getAllCompaniesQuery, getCompanyByID, getCompanyByIDQuery } from "./CompanyActionCreaters";

interface ICompanyState {
  company: ICompany,
  companyNew: ICompanyNew,
  companies: ICompany[],
  companyDeals: IDeal[],
  companyFirstUser: IUser,
  isLoading: boolean,
  error: string,
};

const initialState: ICompanyState = {
  company: {} as ICompany,
  companyNew: {} as ICompanyNew,
  companies: [] as ICompany[],
  companyDeals: [] as IDeal[],
  companyFirstUser: {} as IUser,
  isLoading: false,
  error: '',
};

const companySlice = createSlice({
  name: 'COMPANY',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCompany.fulfilled, (state, action: PayloadAction<ICompany>) => {
        state.isLoading = false;
        state.company = action.payload;
      })
      .addCase(addCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(getAllCompanies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCompanies.fulfilled, (state, action: PayloadAction<ICompany[]>) => {
        state.isLoading = false;
        state.companies = action.payload;
      })
      .addCase(getAllCompanies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(getAllCompaniesQuery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCompaniesQuery.fulfilled, (state, action: PayloadAction<ICompany[]>) => {
        state.isLoading = false;
        state.companies = action.payload;
      })
      .addCase(getAllCompaniesQuery.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(getCompanyByID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCompanyByID.fulfilled, (state, action: PayloadAction<ICompany>) => {
        state.isLoading = false;
        state.company = action.payload;
      })
      .addCase(getCompanyByID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(getCompanyByIDQuery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCompanyByIDQuery.fulfilled, (state, action: PayloadAction<ICompany>) => {
        state.isLoading = false;
        state.company = action.payload;
        state.companyDeals = action.payload.dealsID;
        state.companyFirstUser = action.payload.usersID[0];
      })
      .addCase(getCompanyByIDQuery.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default companySlice.reducer;