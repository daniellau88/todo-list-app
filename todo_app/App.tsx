/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {store} from './src/reducer';
import {Provider as StoreProvider} from 'react-redux';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
  Provider,
} from 'react-native-paper';
import Navigator from './src/navigator';
import NotificationBar from './src/modules/notifications/components/NotificationBar';

const App = (): JSX.Element => {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={DefaultTheme}>
        <Provider>
          <Navigator />
          <NotificationBar />
        </Provider>
      </PaperProvider>
    </StoreProvider>
  );
};

export default App;
