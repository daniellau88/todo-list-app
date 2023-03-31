import {AnyAction} from 'redux';
import {RootState} from '../../../reducer';
import {NotificationMiniEntity} from './types';
import {ThunkAction} from '@reduxjs/toolkit';
import {notificationAction} from './reducer';
import {getTopNotification} from './selectors';

export const enqueueNotification = (
  notifications: Array<NotificationMiniEntity>,
): ThunkAction<
  NotificationMiniEntity | undefined,
  RootState,
  undefined,
  AnyAction
> => {
  return (dispatch, getState) => {
    dispatch(notificationAction.enqueueNotification(notifications));
    return getTopNotification()(getState());
  };
};

export const dequeueNotification = (): ThunkAction<
  undefined,
  RootState,
  undefined,
  AnyAction
> => {
  return dispatch => {
    dispatch(notificationAction.dequeueNotifcation());
    return undefined;
  };
};
