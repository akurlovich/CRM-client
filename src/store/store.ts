import { combineReducers, configureStore } from "@reduxjs/toolkit";
import dimensionReducer from './reducers/DimensionReducer/DimensionSlice';
import companyReducer from './reducers/CompanyReducer/CompanySlice';
import userReducer from './reducers/UserReducer/UserSlice';
import contactReducer from './reducers/ContactReducer/ContactSlice';
import phoneReducer from './reducers/PhoneReducer/PhoneSlice';
import dealReducer from './reducers/DealReducer/DealSlice';
import commentReducer from './reducers/CommentReducer/CommentSlice';
import productReducer from './reducers/ProductReducer/ProductSlice';
import orderReducer from './reducers/OrderReducer/OrderSlice';
import orderItemsReducer from './reducers/OrderItemsReducer/OrderItemsSlice';

const rootReducer = combineReducers({
  dimensionReducer,
  companyReducer,
  userReducer,
  contactReducer,
  phoneReducer,
  dealReducer,
  commentReducer,
  productReducer,
  orderReducer,
  orderItemsReducer,
 
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']