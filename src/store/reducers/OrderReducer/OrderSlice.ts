import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrder } from "../../../types/IOrder";
import { IOrderItemNew } from "../../../types/IOrderItem";
import { addOrder, updateOrderItemsByOrderID } from "./OrderActionCreater";

interface IOrderState {
  order: IOrder;
  totalPrice: number;
  totalCount: number;
  items: IOrderItemNew[];
  isLoading: boolean,
  error: string,
};

const initialState: IOrderState = {
  order: {} as IOrder,
  totalPrice: 0,
  totalCount: 0,
  items: [],
  isLoading: false,
  error: '',
};

const orderSlice = createSlice({
  name: 'ORDER',
  initialState,
  reducers: {

//!--------------  общая сумма, как сумма всех item.sum в массиве
    addItemProduct(state, action: PayloadAction<IOrderItemNew>) {
      // console.log("action.payload", action.payload)
      let foundItem = state.items.find((obj: IOrderItemNew) => obj.productID === action.payload.productID);
      if (foundItem) {
        foundItem.count = action.payload.count;
        foundItem.totalSum = action.payload.totalSum;
        foundItem.price = action.payload.price;
        foundItem.sum = action.payload.sum;
        foundItem.vatSum = action.payload.vatSum;
      } else {
        // state.items.push({
        //   ...action.payload,
        // })
        state.items.push(action.payload);
      }
      // console.log('totalSum', state.totalPrice)
      state.totalPrice = state.items.reduce((s, cur) => {
        return s + cur.totalSum
      }, 0);
      state.totalCount = state.items.reduce((s, cur) => {
        return s + cur.count
      }, 0);
      
    },
    
    minusItemProduct(state, action: PayloadAction<IOrderItemNew>) {
      const findItem = state.items.find((obj: IOrderItemNew) => obj.productID === action.payload.productID);
      if (findItem) {
        state.totalPrice -= action.payload.totalSum;
      }
      
    },
    removeItemProduct(state, action: PayloadAction<IOrderItemNew>) {
      state.items = state.items.filter((obj: IOrderItemNew) => obj.productID !== action.payload.productID);
      state.totalPrice -= action.payload.totalSum;
      console.log('rem', state.totalPrice)
    },

    clearItemsProduct(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addOrder.fulfilled, (state, action: PayloadAction<IOrder>) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(updateOrderItemsByOrderID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrderItemsByOrderID.fulfilled, (state, action: PayloadAction<IOrder>) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(updateOrderItemsByOrderID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addItemProduct, minusItemProduct, removeItemProduct, clearItemsProduct } = orderSlice.actions;

export default orderSlice.reducer;