import React from 'react';
import TodoListScrollView from '../components/TodoListScrollView';
import {StyleSheet, View} from 'react-native';
import TodoListCreateButton from '../components/TodoListCreateButton';

const TodoListScreen = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <TodoListScrollView />
      <TodoListCreateButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});

export default TodoListScreen;
