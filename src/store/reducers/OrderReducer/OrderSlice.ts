import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrderItemNew } from "../../../types/IOrderItem";

interface IOrderState {
  totalPrice: number;
  totalCount: number;
  items: IOrderItemNew[];
  isLoading: boolean,
  error: string,
};

const initialState: IOrderState = {
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
      // console.log(action.payload)
      let foundItem = state.items.find((obj: IOrderItemNew) => obj.productID === action.payload.productID);
      if (foundItem) {
        foundItem.count = action.payload.count;
        foundItem.sum = action.payload.sum;
        foundItem.price = action.payload.price;
      } else {
        state.items.push({
          ...action.payload,
        })
      }
      // state.items.push(action.payload);
      // console.log('totalSum', state.totalPrice)
      state.totalPrice = state.items.reduce((s, cur) => {
        return s + cur.sum
      }, 0);
      state.totalCount = state.items.reduce((s, cur) => {
        return s + cur.count
      }, 0);
      // console.log('add', state.totalPrice)
    },
    
    minusItemProduct(state, action: PayloadAction<IOrderItemNew>) {
      const findItem = state.items.find((obj: IOrderItemNew) => obj.productID === action.payload.productID);
      if (findItem) {
        state.totalPrice -= action.payload.sum;
      }
      
    },
    removeItemProduct(state, action: PayloadAction<IOrderItemNew>) {
      state.items = state.items.filter((obj: IOrderItemNew) => obj.productID !== action.payload.productID);
      state.totalPrice -= action.payload.sum;
      console.log('rem', state.totalPrice)
    },

    clearItemsProduct(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
  extraReducers: (builder) => {
    
  },
});

export const { addItemProduct, minusItemProduct, removeItemProduct, clearItemsProduct } = orderSlice.actions;

export default orderSlice.reducer;