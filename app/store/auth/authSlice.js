import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: { name: null, email: null },
  token: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
    setCurrentToken(state, action) {
      state.token = action.payload;
    },
  },
 });

export const authReducer = authSlice.reducer;
export const { setCurrentToken } = authSlice.actions;