import {combineReducers, configureStore, createStore} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import {todoListReducer} from './modules/todo-lists/redux/reducer';
import {notificationReducer} from './modules/notifications/redux/reducer';
import {appInfoReducer} from './modules/app-info/redux/reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// Automatically adds the thunk middleware and the Redux DevTools extension
export const appReducer = combineReducers({
  todoList: todoListReducer,
  notification: notificationReducer,
  appInfo: appInfoReducer,
});

const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: <T>(selector: (state: RootState) => T) => T =
  useSelector;
