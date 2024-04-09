import { createSlice } from "@reduxjs/toolkit";
import { updateAvatar } from "./operation";
const initialState = {
  user: { name: null, email: null },
  token: null,
  avatar:
    "https://res.cloudinary.com/dwzeqka9z/image/upload/v1712689230/avatars/g5rcnndgoes6z7zumnxy.jpg",
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
