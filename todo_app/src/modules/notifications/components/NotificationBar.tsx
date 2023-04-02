import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../store';
import {getTopNotification} from '../redux/selectors';
import {Snackbar} from 'react-native-paper';
import {dequeueNotification} from '../redux/operations';

const NotificationBar = (): JSX.Element => {
  const topNotification = useAppSelector(getTopNotification());
  const [visible, setVisible] = React.useState(false);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (topNotification) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [topNotification]);

  const onDismissSnackBar = () => {
    setVisible(false);
    dispatch(dequeueNotification());
  };

  const onPressDismiss = () => {};

  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismissSnackBar}
      action={{
        label: 'Dismiss',
        onPress: onPressDismiss,
      }}>
      {topNotification?.message || ''}
    </Snackbar>
  );
};

export default NotificationBar;
