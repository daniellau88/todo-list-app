import React from 'react';
import {Text} from 'react-native-paper';
import {ScreenName, useAppRoute} from '../../../navigation';

const TodoListTodosScreen = (): JSX.Element => {
  const route = useAppRoute<ScreenName.TodoListTodos>();
  console.log(route.params.todoListId);
  return <Text>Hi</Text>;
};

export default TodoListTodosScreen;
