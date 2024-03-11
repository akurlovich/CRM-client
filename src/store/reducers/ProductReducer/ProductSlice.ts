import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../../types/IProduct";
import { addProduct, getAllProducts, getProductByID } from "./ProducrActionCreater";

interface IProductState {
  product: IProduct,
  products: IProduct[],
  isLoading: boolean,
  error: string,
};

const initialState: IProductState = {
  product: {} as IProduct,
  products: [] as IProduct[],
  isLoading: false,
  error: '',
};

const productSlice = createSlice({
  name: 'PRODUCT',
  initialState,
  reducers: {
    productsClearArray(state) {
      state.products.length = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action: PayloadAction<IProduct>) => {
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(getProductByID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductByID.fulfilled, (state, action: PayloadAction<IProduct>) => {
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(getProductByID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
  //TODO пишет ошибку, т.к. при вводе скобки ( ( ) , ошибка в reqex поиске
        // state.error = action.payload as string;
      });
  },
});

export const { productsClearArray } = productSlice.actions;

export default productSlice.reducer;