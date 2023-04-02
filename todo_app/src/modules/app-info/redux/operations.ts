import {AnyAction} from 'redux';
import {RootState} from '../../../reducer';
import {ThunkAction} from '@reduxjs/toolkit';
import {appInfoAction} from './reducer';
import {getAppIsOnline} from './selectors';

export const setIsOnline = (
  isOnline: boolean,
): ThunkAction<boolean, RootState, undefined, AnyAction> => {
  return (dispatch, getState) => {
    dispatch(appInfoAction.setIsOnline({isOnline}));
    return getAppIsOnline()(getState());
  };
};
