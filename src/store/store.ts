import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import userReducer from './reducers/UserReducer/UserSlice';
// import authReducer from './reducers/AuthReducer/AuthSlice';
// import productReducer from './reducers/ProductReducer/ProductSlice';

// import filterReducer from "./reducers/FilterReducer/FilterSlice";
// import brandReducer from "./reducers/BrandReducer/BrandSlice";
// import typeReducer from "./reducers/TypeReducer/TypeSlice";
// import navigationBarReducer from './reducers/NavigationBarReducer/NavigationBarSlice';

// import cartReducer from "./reducers/CartReducer/CartSlice";
import dimensionReducer from './reducers/DimensionReducer/DimensionSlice';
import companyReducer from './reducers/CompanyReducer/CompanySlice';
import userReducer from './reducers/UserReducer/UserSlice';
import contactReducer from './reducers/ContactReducer/ContactSlice';
import phoneReducer from './reducers/PhoneReducer/PhoneSlice';

const rootReducer = combineReducers({
  dimensionReducer,
  companyReducer,
  userReducer,
  contactReducer,
  phoneReducer,
  // authReducer,
  // // bookReducer,
  // // bookedReducer,
  // // issuedReducer,
  // // commentReducer,

  // productReducer,
  // filterReducer,
  // brandReducer,
  // typeReducer,
  // cartReducer,
  // navigationBarReducer,
  // colorsReducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']