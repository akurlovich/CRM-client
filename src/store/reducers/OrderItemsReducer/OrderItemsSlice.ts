import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrderItem } from "../../../types/IOrderItem";
import { addOrderItem, getAllOrderItems, getOrderItemByID } from "./OrderItemsActionCreater";

interface IOrderItemsState {
  orderItem: IOrderItem,
  orderItems: IOrderItem[],
  isLoading: boolean,
  error: string,
};

const initialState: IOrderItemsState = {
  orderItem: {} as IOrderItem,
  orderItems: [] as IOrderItem[],
  isLoading: false,
  error: '',
};

const orderItemsSlice = createSlice({
  name: 'ORDERITEMS',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addOrderItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addOrderItem.fulfilled, (state, action: PayloadAction<IOrderItem[]>) => {
        state.isLoading = false;
        state.orderItems = action.payload;
      })
      .addCase(addOrderItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(getOrderItemByID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderItemByID.fulfilled, (state, action: PayloadAction<IOrderItem>) => {
        state.isLoading = false;
        state.orderItem = action.payload;
      })
      .addCase(getOrderItemByID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(getAllOrderItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrderItems.fulfilled, (state, action: PayloadAction<IOrderItem[]>) => {
        state.isLoading = false;
        state.orderItems = action.payload;
      })
      .addCase(getAllOrderItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default orderItemsSlice.reducer;