import {RootState} from '../../../store';

const getLocalState = (state: RootState) => state.appInfo;

export const getAppIsOnline = () => {
  return (state: RootState) => {
    return getLocalState(state).isOnline;
  };
};
