import React from 'react';
import TodoListScreen from './modules/todo-lists/screens/TodoListScreen';
import TodoListTodosScreen from './modules/todo-lists/screens/TodoListTodosScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ScreenName} from './navigation';
import TodoListTodosScreenDeleteOption from './modules/todo-lists/components/TodoListTodosScreenDeleteOption';
import TodoListCreateScreen from './modules/todo-lists/screens/TodoListCreateScreen';

const Stack = createNativeStackNavigator();

const Navigator = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ScreenName.TodoList}>
        <Stack.Screen name={ScreenName.TodoList} component={TodoListScreen} />
        <Stack.Screen
          name={ScreenName.TodoListCreate}
          component={TodoListCreateScreen}
        />
        <Stack.Screen
          name={ScreenName.TodoListTodos}
          component={TodoListTodosScreen}
          options={{
            headerRight: TodoListTodosScreenDeleteOption,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
