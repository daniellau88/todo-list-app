import {RootState} from '../../../reducer';

const getLocalState = (state: RootState) => state.notification;

export const getTopNotification = () => {
  return (state: RootState) => {
    const notifications = getLocalState(state).notifications;
    return notifications.length > 0 ? notifications[0] : undefined;
  };
};
