import * as React from 'react';
import {Appbar} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../../../store';
import {getAppIsOnline} from '../redux/selectors';
import {StyleSheet, View} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import {setIsOnline} from '../redux/operations';
import {convertDateSinceEpochToDateTime} from '../../../utils/date';

interface Props {
  lastRetrievedDate?: number;
}

const OfflineTopBar = (props: Props) => {
  const {lastRetrievedDate} = props;
  const netInfo = useNetInfo();
  const dispatch = useAppDispatch();
  const isOnline = useAppSelector(getAppIsOnline());

  React.useEffect(() => {
    const isConnected = netInfo.isConnected;
    if (isConnected !== null) {
      dispatch(setIsOnline(isConnected));
    }
  }, [netInfo]);

  if (isOnline) {
    return <View />;
  }

  let lastRetrievedInfo = lastRetrievedDate
    ? ` (Last retrieved ${convertDateSinceEpochToDateTime(
        lastRetrievedDate,
      ).toRelative()})`
    : '';

  return (
    <Appbar mode="small" style={styles.appbar}>
      <Appbar.Content
        title={`Offline${lastRetrievedInfo}`}
        titleStyle={styles.title}
      />
    </Appbar>
  );
};

const styles = StyleSheet.create({
  appbar: {
    height: 25,
    backgroundColor: 'black',
  },
  title: {fontSize: 12, alignSelf: 'center', color: 'white'},
});

export default OfflineTopBar;
