import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrder } from "../../../types/IOrder";
import { IOrderItemNew } from "../../../types/IOrderItem";
import { addOrder, updateOrderItemsByOrderID, getAllOrders } from "./OrderActionCreater";

interface IOrderState {
  order: IOrder;
  ordersAll: IOrder[];
  totalPrice: number;
  totalCount: number;
  items: IOrderItemNew[];
  isShowEditOrder: boolean;
  isShowNewOrder: boolean;
  orderForEdit: IOrder;
  isLoading: boolean,
  error: string,
};

const initialState: IOrderState = {
  order: {} as IOrder,
  ordersAll: [] as IOrder[],
  totalPrice: 0,
  totalCount: 0,
  items: [],
  isShowEditOrder: false,
  isShowNewOrder: false,
  orderForEdit: {} as IOrder,
  isLoading: false,
  error: '',
};

const orderSlice = createSlice({
  name: 'ORDER',
  initialState,
  reducers: {
    addItemProduct(state, action: PayloadAction<IOrderItemNew>) {
      // console.log("action.payload", action.payload)
      let foundItem = state.items.find((obj: IOrderItemNew) => obj.itemID === action.payload.itemID);
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
      const findItem = state.items.find((obj: IOrderItemNew) => obj.itemID === action.payload.itemID);
      if (findItem) {
        state.totalPrice -= action.payload.totalSum;
      }
      
    },
    removeItemProduct(state, action: PayloadAction<IOrderItemNew>) {
      state.items = state.items.filter((obj: IOrderItemNew) => obj.itemID !== action.payload.itemID);
      state.totalPrice = state.items.reduce((s, cur) => {
        return s + cur.totalSum
      }, 0);
      state.totalCount = state.items.reduce((s, cur) => {
        return s + cur.count
      }, 0);
    },

    clearItemsProduct(state) {
      state.items = [];
      state.orderForEdit = {} as IOrder;
      state.order = {} as IOrder;
      state.totalPrice = 0;
    },

    setShowEditOrder(state, action: PayloadAction<boolean>) {
      state.isShowEditOrder = action.payload;
    },
    setShowNewOrder(state, action: PayloadAction<boolean>) {
      state.isShowNewOrder = action.payload;
    },
    setOrderForEdit(state, action: PayloadAction<IOrder>) {
      state.order = action.payload;
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
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action: PayloadAction<IOrder[]>) => {
        state.isLoading = false;
        state.ordersAll = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addItemProduct, minusItemProduct, removeItemProduct, clearItemsProduct, setShowEditOrder, setOrderForEdit, setShowNewOrder } = orderSlice.actions;

export default orderSlice.reducer;