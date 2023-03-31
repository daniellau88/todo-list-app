import React from 'react';
import {Text} from 'react-native-paper';
import {ScreenName, useAppRoute} from '../../../navigation';
import {useSelector} from 'react-redux';
import {getTodoListEntity} from '../redux/selectors';
import TodoListTodosScrollView from './TodoListTodosScrollView';

const TodoListTodosScreen = (): JSX.Element => {
  const route = useAppRoute<ScreenName.TodoListTodos>();

  const todoListId = route.params.todoListId;
  const todoList = useSelector(getTodoListEntity(todoListId));

  React.useEffect(() => {}, []);

  if (!todoList) {
    return <Text>Invalid Todo List</Text>;
  }

  return <TodoListTodosScrollView todoListId={todoListId} />;
};

export default TodoListTodosScreen;
