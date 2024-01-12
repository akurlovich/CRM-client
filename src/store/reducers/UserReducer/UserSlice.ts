import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../types/IUser";
import { fetchUsers, getAllUsers, getUserByID } from "./UserActionCreators";

interface IUserState {
  user: IUser,
  users: IUser[],
  isLoading: boolean,
  isAuth: boolean,
  error: string,
}

const initialState: IUserState = {
  user: {} as IUser,
  users: [] as IUser[],
  isLoading: true,
  isAuth: true,
  error: '',
}

export const userSlice = createSlice({
  name: 'USER',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(getUserByID.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserByID.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUserByID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
})

export default userSlice.reducer;