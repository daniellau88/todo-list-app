import React from 'react';
import {Text} from 'react-native-paper';
import {ScreenName, useAppRoute} from '../../../navigation';
import {useSelector} from 'react-redux';
import {getTodoListEntity} from '../redux/selectors';
import TodoListTodosScrollView from './TodoListTodosScrollView';

const TodoListTodosScreen = (): JSX.Element => {
  const route = useAppRoute<ScreenName.TodoListTodos>();

  const todoListId = route.params.todoListId;
  const isCreate = route.params.isCreate;
  const todoList = useSelector(getTodoListEntity(todoListId));

  if (!todoList && !isCreate) {
    return <Text>Invalid Todo List</Text>;
  }

  return (
    <TodoListTodosScrollView todoListId={todoListId} isCreate={isCreate} />
  );
};

export default TodoListTodosScreen;
