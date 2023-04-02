/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {store} from './src/store';
import {Provider as StoreProvider} from 'react-redux';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import Navigator from './src/navigator';
import NotificationBar from './src/modules/notifications/components/NotificationBar';
import OfflineTopBar from './src/modules/app-info/components/OfflineTopBar';

const App = (): JSX.Element => {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={DefaultTheme}>
        <OfflineTopBar />
        <Navigator />
        <NotificationBar />
      </PaperProvider>
    </StoreProvider>
  );
};

export default App;
