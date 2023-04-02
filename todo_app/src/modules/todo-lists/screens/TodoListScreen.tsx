import React from 'react';
import TodoListScrollView from '../components/TodoListScrollView';
import {View} from 'react-native';
import TodoListCreateButton from '../components/TodoListCreateButton';

const TodoListScreen = (): JSX.Element => {
  return (
    <View>
      <TodoListScrollView />
      <TodoListCreateButton />
    </View>
  );
};

export default TodoListScreen;
