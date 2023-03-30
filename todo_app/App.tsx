/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {store} from './src/reducer';
import {Provider as StoreProvider} from 'react-redux';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import TodoListScrollView from './src/modules/todo-lists/components/TodoListScrollView';
import TopBar from './src/components/TopBar';

const App = (): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <StoreProvider store={store}>
      <PaperProvider theme={DefaultTheme}>
        <SafeAreaView style={backgroundStyle}>
          <TopBar />
          <TodoListScrollView />
        </SafeAreaView>
      </PaperProvider>
    </StoreProvider>
  );
};

export default App;
