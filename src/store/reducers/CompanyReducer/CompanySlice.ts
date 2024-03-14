import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComment } from "../../../types/IComment";
import { ICompaniesQuery, ICompaniesResponse, ICompany, ICompanyNew } from "../../../types/ICompany";
import { IDeal } from "../../../types/IDeal";
import { IOrder } from "../../../types/IOrder";
import { IUser } from "../../../types/IUser";
import { addCompany, getAllCompanies, getAllCompaniesQuery, getCompanyByID, getCompanyByIDQuery, getSearchResultDistrictCompanies, getSearchResultUserCompanies, updateCompanyDescription, updateCompanyUsers } from "./CompanyActionCreaters";

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
  companiesCount: number,
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
  companiesCount: 0,
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
        // state.company = action.payload;
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
      .addCase(getSearchResultDistrictCompanies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchResultDistrictCompanies.fulfilled, (state, action: PayloadAction<ICompany[]>) => {
        state.isLoading = false;
        state.companies = action.payload;
        // state.companiesCount = action.payload.count;
      })
      .addCase(getSearchResultDistrictCompanies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(getSearchResultUserCompanies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchResultUserCompanies.fulfilled, (state, action: PayloadAction<ICompaniesResponse>) => {
        state.isLoading = false;
        state.companies = action.payload.companies;
        state.companiesCount = action.payload.count;
      })
      .addCase(getSearchResultUserCompanies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(getAllCompaniesQuery.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCompaniesQuery.fulfilled, (state, action: PayloadAction<ICompaniesResponse>) => {
        state.isLoading = false;
        state.companies = action.payload.companies;
        state.companiesCount = action.payload.count;
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
        // console.log(action.payload)
        state.isLoading = false;
        if (action.payload) {
          state.company = action.payload;
    //TODO добавить сортироваку дел по endTime, первое в массие - первое на выполнение
          console.log(action.payload)
          
          state.companyDeals = action.payload.dealsID.sort((a, b) => {
            let fa = a.monthEnd;
            let fb = b.monthEnd;
  
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
          });
          state.companyFirstDeal = action.payload.dealsID[0];
          state.companyUsers = action.payload.usersID;
          state.companyFirstUser = action.payload.usersID[0];
          state.companyComments = action.payload.commentsID.reverse();
          state.companyOrders = action.payload.ordersID.sort((a, b) => {
            let fa = a.createdAt;
            let fb = b.createdAt;
  
            if (fa < fb) {
                return 1;
            }
            if (fa > fb) {
                return -1;
            }
            return 0;
          });
        } else {
          // state.company = action.payload;
          state.error = 'Скорее всего компания с таким ID не найдена и вернулся null'
        }
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
    builder
      .addCase(updateCompanyUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCompanyUsers.fulfilled, (state, action: PayloadAction<ICompany>) => {
        state.isLoading = false;
        // state.company = action.payload;
      })
      .addCase(updateCompanyUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addQueryToState } = companySlice.actions;

export default companySlice.reducer;