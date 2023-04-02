import {configureStore} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import {todoListReducer} from './modules/todo-lists/redux/reducer';
import {notificationReducer} from './modules/notifications/redux/reducer';
import {appInfoReducer} from './modules/app-info/redux/reducer';

// Automatically adds the thunk middleware and the Redux DevTools extension
export const store = configureStore({
  // Automatically calls `combineReducers`
  reducer: {
    todoList: todoListReducer,
    notification: notificationReducer,
    appInfo: appInfoReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: <T>(selector: (state: RootState) => T) => T =
  useSelector;
