import { createAsyncThunk } from "@reduxjs/toolkit";
import OrderService from "../../../services/OrderService";
import { IOrderNew, IOrderNewWithItems } from "../../../types/IOrder";

export const addOrder = createAsyncThunk(
  'ORDER/addOrder',
  async (data: IOrderNewWithItems, {rejectWithValue}) => {
    try {
      return await (await OrderService.addOrder(data)).data;
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const getOrderByID = createAsyncThunk(
  'ORDER/getOrderByID',
  async (orderID: string, {rejectWithValue}) => {
    try {
      return await (await OrderService.getOrderByID(orderID)).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const getAllOrders = createAsyncThunk(
  'ORDER/getAllOrders',
  async (_, {rejectWithValue}) => {
    try {
      return await (await OrderService.getAllOrders()).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const deleteOrderByID = createAsyncThunk(
  'ORDER/deleteOrderByID',
  async (orderItemsID: string, {rejectWithValue}) => {
    try {
      return await (await OrderService.deleteOrderByID(orderItemsID)).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);