import { createSlice } from "@reduxjs/toolkit";
import { updateAvatar } from "./operation";
const initialState = {
  user: { name: null, email: null },
  token: null,
  avatar: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentToken(state, action) {
      state.token = action.payload;
    },
    setCurrentAvatar(state, action) {
      state.avatar = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(updateAvatar.fulfilled, (state, action) => {
      state.avatar = action.payload.avatar;
    }),
});

export const authReducer = authSlice.reducer;
export const { setCurrentToken, setCurrentAvatar } = authSlice.actions;
