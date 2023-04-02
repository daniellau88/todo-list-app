import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {AppInfoState} from './types';

const initialState: AppInfoState = {
  isOnline: false,
};

const appInfoSlice = createSlice({
  name: 'appInfo',
  initialState: initialState,
  reducers: {
    setIsOnline: (state, action: PayloadAction<{isOnline: boolean}>) => {
      state.isOnline = action.payload.isOnline;
    },
  },
});

export const appInfoReducer = appInfoSlice.reducer;

export const appInfoAction = appInfoSlice.actions;
