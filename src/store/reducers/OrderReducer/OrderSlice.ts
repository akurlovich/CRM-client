import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IItem {
  id: string,
  sum: number,
}

interface IOrderState {
  totalPrice: number;
  items: IItem[];
  isLoading: boolean,
  error: string,
};

const initialState: IOrderState = {
  totalPrice: 0,
  items: [],
  isLoading: false,
  error: '',
};

const orderSlice = createSlice({
  name: 'ORDER',
  initialState,
  reducers: {

//!--------------  общая сумма, как сумма всех item.sum в массиве
    addItemProduct(state, action: PayloadAction<IItem>) {
      const findItem = state.items.find((obj: IItem) => obj.id === action.payload.id);
      if (findItem) {
        
      } else {
        state.items.push({
          ...action.payload,
        })
      }
      // state.items.push(action.payload);
      state.totalPrice += action.payload.sum;
      console.log('add', state.totalPrice)
    },
    
    minusItemProduct(state, action: PayloadAction<IItem>) {
      const findItem = state.items.find((obj: IItem) => obj.id === action.payload.id);
      if (findItem) {
        state.totalPrice -= action.payload.sum;
      }
      
    },
    removeItemProduct(state, action: PayloadAction<IItem>) {
      state.items = state.items.filter((obj: IItem) => obj.id !== action.payload.id);
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