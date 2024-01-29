import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComment } from "../../../types/IComment";
import { ICompaniesQuery, ICompany, ICompanyNew } from "../../../types/ICompany";
import { IDeal } from "../../../types/IDeal";
import { IOrder } from "../../../types/IOrder";
import { IUser } from "../../../types/IUser";
import { addCompany, getAllCompanies, getAllCompaniesQuery, getCompanyByID, getCompanyByIDQuery, updateCompanyDescription } from "./CompanyActionCreaters";

interface ICompanyState {
  company: ICompany,
  companyNew: ICompanyNew,
  companies: ICompany[],
  companyDeals: IDeal[],
  companyFirstDeal: IDeal,
  companyUsers: IUser[],
  companyFirstUser: IUser,
  companyComments: IComment[],
  companyOrders: IOrder[],
  query: ICompaniesQuery,
  isLoading: boolean,
  error: string,
};

const initialState: ICompanyState = {
  company: {} as ICompany,
  companyNew: {} as ICompanyNew,
  companies: [] as ICompany[],
  companyDeals: [] as IDeal[],
  companyFirstDeal: {} as IDeal,
  companyUsers: [] as IUser[],
  companyFirstUser: {} as IUser,
  companyComments: [] as IComment[],
  companyOrders: [] as IOrder[],
  query: {} as ICompaniesQuery,
  isLoading: false,
  error: '',
};

const companySlice = createSlice({
  name: 'COMPANY',
  initialState,
  reducers: {
    addQueryToState(state, action: PayloadAction<ICompaniesQuery>) {
      state.query = action.payload;
    }
  },
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
  //TODO добавить сортироваку дел по endTime, первое в массие - первое на выполнение
        state.companyDeals = action.payload.dealsID;
        state.companyFirstDeal = action.payload.dealsID[0];
        state.companyUsers = action.payload.usersID;
        state.companyFirstUser = action.payload.usersID[0];
        state.companyComments = action.payload.commentsID.reverse();
        state.companyOrders = action.payload.ordersID;
      })
      .addCase(getCompanyByIDQuery.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(updateCompanyDescription.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCompanyDescription.fulfilled, (state, action: PayloadAction<ICompany>) => {
        state.isLoading = false;
        // state.company = action.payload;
      })
      .addCase(updateCompanyDescription.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addQueryToState } = companySlice.actions;

export default companySlice.reducer;