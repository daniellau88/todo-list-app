import * as React from 'react';
import {Appbar} from 'react-native-paper';
import {useAppSelector} from '../../../reducer';
import {getAppIsOnline} from '../redux/selectors';
import {StyleSheet, View} from 'react-native';

const OfflineTopBar = () => {
  const isOnline = useAppSelector(getAppIsOnline());

  if (isOnline) {
    return <View />;
  }

  return (
    <Appbar mode="small" style={styles.appbar}>
      <Appbar.Content title="Offline" titleStyle={styles.title} />
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
