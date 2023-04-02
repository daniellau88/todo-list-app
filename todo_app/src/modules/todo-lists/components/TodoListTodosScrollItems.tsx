import React from 'react';

import {useAppSelector} from '../../../reducer';
import {getTodoMiniEntity} from '../redux/selectors';
import {Checkbox, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

interface Props {
  id: number;
}

const TodoListTodosScrollItems = (props: Props): JSX.Element => {
  const {id} = props;

  const todo = useAppSelector(getTodoMiniEntity(id));

  if (!todo) {
    return <Text>Invalid</Text>;
  }

  return (
    <View style={styles.container}>
      <Checkbox status={todo.is_done ? 'checked' : 'unchecked'} />
      <Text style={styles.descriptionText}>{todo.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  descriptionText: {
    flex: 1,
  },
});

export default TodoListTodosScrollItems;
