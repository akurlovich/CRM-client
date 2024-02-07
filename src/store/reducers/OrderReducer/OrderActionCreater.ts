import { createAsyncThunk } from "@reduxjs/toolkit";
import OrderService from "../../../services/OrderService";
import { IOrderNew, IOrderNewWithItems, IOrderUpdateOrderItems } from "../../../types/IOrder";

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
  async (userID: string, {rejectWithValue}) => {
    try {
      return await (await OrderService.getAllOrders(userID)).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const updateOrderItemsByOrderID = createAsyncThunk(
  'ORDER/updateOrderItemsByOrderID',
  async (data: IOrderUpdateOrderItems, {rejectWithValue}) => {
    try {
      return await (await OrderService.updateOrderItemsByOrderID(data)).data;
      
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