import React from 'react';
import TodoListScreen from './modules/todo-lists/components/TodoListScreen';
import TodoListTodosScreen from './modules/todo-lists/components/TodoListTodosScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ScreenName} from './navigation';

const Stack = createNativeStackNavigator();

const Navigator = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ScreenName.TodoList}>
        <Stack.Screen name={ScreenName.TodoList} component={TodoListScreen} />
        <Stack.Screen
          name={ScreenName.TodoListTodos}
          component={TodoListTodosScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
