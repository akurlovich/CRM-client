import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserAuth } from "../../../types/IUser";
import { checkAuth, loginUser, logoutUser, refreshUser, registerUser, } from "./AuthActionCreatores";

interface IResponseData {
  user: IUserAuth,
  // role: string,
}

interface IAuthState {
  user: IUserAuth,
  isLoading: boolean,
  isAuth: boolean,
  // role: string,
  error: string,
  loginError: string,
  registrationError: string,
};

const initialState: IAuthState = {
  user: {} as IUserAuth,
  isLoading: true,
  isAuth: false,
  // role: '',
  error: '',
  loginError: '',
  registrationError: '',
};

export const authSlice = createSlice({
  name: 'AUTH',
  initialState,
  reducers: {
    removeRigisterUserError(state) {
      state.error = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<IResponseData>) => {
        state.isLoading = false;
        state.isAuth = true;
        state.registrationError = '';
        state.user = action.payload.user;
        // state.role = action.payload.role;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;   
        state.registrationError = action.payload as string;
      });
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<IResponseData>) => {
        state.isLoading = false;
        state.isAuth = true;
        state.loginError = '';
        state.user = action.payload.user;
        // state.role = action.payload.role;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.loginError = action.payload as string;
      });
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuth = false;
        state.user = {} as IUserAuth;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action: PayloadAction<IResponseData>) => {
        state.isLoading = false;
        state.isAuth = true;
        state.error = '';
        state.user = action.payload.user;
        // state.role = action.payload.role;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(refreshUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshUser.fulfilled, (state, action: PayloadAction<IResponseData>) => {
        state.isLoading = false;
        state.isAuth = action.payload.user?.isAdmin && false;
        state.error = '';
        state.user = action.payload.user;
        // state.role = action.payload.role;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.error = action.payload as string;
      });
  }
});

export const {
  removeRigisterUserError,
} = authSlice.actions;

export default authSlice.reducer;