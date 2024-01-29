import { createAsyncThunk } from "@reduxjs/toolkit";
import OrderItemsService from "../../../services/OrderItemsService";
import { IOrderItemNew } from "../../../types/IOrderItem";

export const addOrderItem = createAsyncThunk(
  'ORDERITEMS/addOrderItem',
  async (orderItems: IOrderItemNew[], {rejectWithValue}) => {
    try {
      return await (await OrderItemsService.addOrderItems(orderItems)).data;
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const getOrderItemByID = createAsyncThunk(
  'ORDERITEMS/getOrderItemByID',
  async (orderItemsID: string, {rejectWithValue}) => {
    try {
      return await (await OrderItemsService.getOrderItemsByID(orderItemsID)).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const getAllOrderItems = createAsyncThunk(
  'ORDERITEMS/getAllOrderItems',
  async (_, {rejectWithValue}) => {
    try {
      return await (await OrderItemsService.getAllOrderItems()).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const deleteOrderItemByID = createAsyncThunk(
  'ORDERITEMS/deleteOrderItemByID',
  async (orderItemsID: string, {rejectWithValue}) => {
    try {
      return await (await OrderItemsService.deleteOrderItemByID(orderItemsID)).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);