import { createAsyncThunk } from "@reduxjs/toolkit";
import ProductService from "../../../services/ProductService";
import { IProductNew } from "../../../types/IProduct";

export const addProduct = createAsyncThunk(
  'PRODUCT/addProduct',
  async (product: IProductNew, {rejectWithValue}) => {
    try {
      return await (await ProductService.addProduct(product)).data;
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const getProductByID = createAsyncThunk(
  'PRODUCT/getProductByID',
  async (productID: string, {rejectWithValue}) => {
    try {
      return await (await ProductService.getProductByID(productID)).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const getAllProducts = createAsyncThunk(
  'PRODUCT/getAllProducts',
  async (_, {rejectWithValue}) => {
    try {
      return await (await ProductService.getAllProducts()).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);

export const deleteProductByID = createAsyncThunk(
  'PRODUCT/deleteProductByID',
  async (productID: string, {rejectWithValue}) => {
    try {
      return await (await ProductService.deleteProductByID(productID)).data;
      
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
);