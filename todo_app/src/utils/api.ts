import {setIsOnline} from '../modules/app-info/redux/operations';
import {enqueueNotification} from '../modules/notifications/redux/operations';
import {AppDispatch} from '../store';
import {ApiPromise, ApiResponseStatus} from '../typings/api';

export const handleApiRequests = (
  dispatch: AppDispatch,
  ...request: Array<ApiPromise<any>>
): Promise<any> => {
  return Promise.all(request.map(x => handleApiRequest(dispatch, x)));
};

export const handleApiRequest = <T>(
  dispatch: AppDispatch,
  request: ApiPromise<T>,
): ApiPromise<T> => {
  return request
    .then(x => {
      if (x.messages.length > 0) {
        dispatch(
          enqueueNotification(
            x.messages.map(y => {
              return {message: y};
            }),
          ),
        );
      }
      return x;
    })
    .catch(x => {
      return {
        messages: [],
        payload: {} as T,
        status: ApiResponseStatus.ConnectionError,
      };
    });
};
