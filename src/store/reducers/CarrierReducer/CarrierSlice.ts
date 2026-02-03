import { addCarrier, deleteCarrierByID, getAllCarriers, getAllCarriersQuery, getCarrierByID, getCarrierByIDQuery, updateCarrierDescription, updateCarrierTitle } from "./CarrierActionCreaters";
import { ICarrier, ICarrierNew, ICarriersResponse } from "../../../types/ICarrier";
import { IDeal } from "../../../types/IDeal";
import { IUser } from "../../../types/IUser";
import { IComment } from "../../../types/IComment";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICarrierState {
	carrier: ICarrier,
	carrierNew: ICarrierNew,
	carriers: ICarrier[],
	carrierDeals: IDeal[],
	carrierFirstDeal: IDeal,
	carrierUsers: IUser[],
	carrierFirstUser: IUser,
	carrierComments: IComment[],
	carrierCount: number,
	// query: ICompaniesQuery,
	// queryAllCompanies: ICompaniesQuery,
	isLoading: boolean,
	error: string,
};

const initialState: ICarrierState = {
	carrier: {} as ICarrier,
	carrierNew: {} as ICarrierNew,
	carriers: [] as ICarrier[],
	carrierDeals: [] as IDeal[],
	carrierFirstDeal: {} as IDeal,
	carrierUsers: [] as IUser[],
	carrierFirstUser: {} as IUser,
	carrierComments: [] as IComment[],
	carrierCount: 0,
	isLoading: false,
	error: '',
};

const carrierSlice = createSlice({
	name: 'CARRIER',
	initialState,
	reducers: {
		// addQueryToState(state, action: PayloadAction<ICompaniesQuery>) {
		// 	state.query = action.payload;
		// },
		// setLimitQueryAllCompanies(state, action: PayloadAction<number>) {
		//   state.queryAllCompanies.limit = 50 * action.payload;
		//   // console.log(state.queryAllCompanies.limit)
		// },
		// setSortQueryAllCompanies(state, action: PayloadAction<{sortBy: string, sortAscDecs: boolean}>) {
		//   // console.log(action.payload.sortAscDecs)
		//   // console.log(action.payload.sortBy)
		//   state.queryAllCompanies.sort = {[`${action.payload.sortBy}`]: `${action.payload.sortAscDecs ? 'asc' : 'desc'}`}
		//   // console.log(state.queryAllCompanies.sort)
		// },
	},
	extraReducers: (builder) => {
		builder
			.addCase(addCarrier.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addCarrier.fulfilled, (state, action: PayloadAction<ICarrier>) => {
				state.isLoading = false;
				console.log('from server carrier', action.payload)
				// state.company = action.payload;
			})
			.addCase(addCarrier.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
		builder
			.addCase(getAllCarriers.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllCarriers.fulfilled, (state, action: PayloadAction<ICarrier[]>) => {
				state.isLoading = false;
				state.carriers = action.payload;
			})
			.addCase(getAllCarriers.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
		builder
			.addCase(getCarrierByID.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCarrierByID.fulfilled, (state, action: PayloadAction<ICarrier>) => {
				state.isLoading = false;
				state.carrier = action.payload;
			})
			.addCase(getCarrierByID.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
		builder
			.addCase(getAllCarriersQuery.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAllCarriersQuery.fulfilled, (state, action: PayloadAction<ICarriersResponse>) => {
				state.isLoading = false;
				state.carriers = action.payload.carriers;
				state.carrierCount = action.payload.count;
				console.log('carriers', action.payload)
			})
			.addCase(getAllCarriersQuery.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
		builder
			.addCase(getCarrierByIDQuery.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCarrierByIDQuery.fulfilled, (state, action: PayloadAction<ICarrier>) => {
				// console.log(action.payload)
				state.isLoading = false;
				// console.log('from slice', action.payload)
				if (action.payload) {
					state.carrier = action.payload;
					state.carrierUsers = action.payload.usersID;
		//TODO добавить сортироваку дел по endTime, первое в массие - первое на выполнение
					
					state.carrierDeals = action.payload.dealsID.sort((a, b) => {
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
					state.carrierFirstDeal = action.payload.dealsID[0];
					state.carrierUsers = action.payload.usersID;
					state.carrierFirstUser = action.payload.usersID[0];
					state.carrierComments = action.payload.commentsID.reverse();
					// state.companyOrders = action.payload.ordersID.sort((a, b) => {
					// 	let fa = a.createdAt;
					// 	let fb = b.createdAt;
	
					// 	if (fa < fb) {
					// 			return 1;
					// 	}
					// 	if (fa > fb) {
					// 			return -1;
					// 	}
					// 	return 0;
					// });
				} else {
					// state.company = action.payload;
					state.error = 'Скорее всего компания с таким ID не найдена и вернулся null'
				}
			})
			.addCase(getCarrierByIDQuery.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
		builder
			.addCase(updateCarrierTitle.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateCarrierTitle.fulfilled, (state, action: PayloadAction<ICarrier>) => {
				state.isLoading = false;
				// state.company = action.payload;
			})
			.addCase(updateCarrierTitle.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
		builder
			.addCase(updateCarrierDescription.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateCarrierDescription.fulfilled, (state, action: PayloadAction<ICarrier>) => {
				state.isLoading = false;
				// state.company = action.payload;
			})
			.addCase(updateCarrierDescription.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
		builder
			.addCase(deleteCarrierByID.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteCarrierByID.fulfilled, (state, action: PayloadAction<ICarrier>) => {
				state.isLoading = false;
				// state.company = action.payload;
			})
			.addCase(deleteCarrierByID.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
	},
});

export default carrierSlice.reducer;