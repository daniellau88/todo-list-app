import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {NotificationMiniEntity, NotificationState} from './types';

const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    enqueueNotification: (
      state,
      action: PayloadAction<Array<NotificationMiniEntity>>,
    ) => {
      state.notifications.push(...action.payload);
    },
    dequeueNotifcation: state => {
      state.notifications.shift();
    },
  },
});

export const notificationReducer = notificationSlice.reducer;

export const notificationAction = notificationSlice.actions;
