import React from 'react';
import TodoListScrollView from './TodoListScrollView';
import {View} from 'react-native';
import TodoListCreateButton from './TodoListCreateButton';

const TodoListScreen = (): JSX.Element => {
  return (
    <View>
      <TodoListScrollView />
      <TodoListCreateButton />
    </View>
  );
};

export default TodoListScreen;
