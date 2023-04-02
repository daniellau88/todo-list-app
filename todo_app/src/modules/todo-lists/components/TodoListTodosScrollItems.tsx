import React from 'react';

import {useAppDispatch, useAppSelector} from '../../../store';
import {getTodoMiniEntity} from '../redux/selectors';
import {Checkbox, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {handleApiRequest} from '../../../utils/api';
import {updateTodo} from '../redux/operations';
import {TodoUpdateRequest} from '../../../typings/model';
import FlatTextInput from '../../../components/FlatTextInput';

interface Props {
  id: number;
  todoListId: number;
}

const TodoListTodosScrollItems = (props: Props): JSX.Element => {
  const {id, todoListId} = props;

  const todo = useAppSelector(getTodoMiniEntity(id));
  const dispatch = useAppDispatch();

  if (!todo) {
    return <Text>Invalid</Text>;
  }

  const onCheckboxPress = () => {
    const newTodo: TodoUpdateRequest = {
      ...todo,
      is_done: !todo.is_done,
    };
    handleApiRequest(dispatch, dispatch(updateTodo(todoListId, newTodo)));
  };

  const onBlur = (text: string) => {
    if (todo && text !== todo.description) {
      handleApiRequest(
        dispatch,
        dispatch(
          updateTodo(todoListId, {
            id: todo.id,
            description: text,
            is_done: todo.is_done,
          }),
        ),
      );
    }
  };

  return (
    <View style={styles.container}>
      <Checkbox
        status={todo.is_done ? 'checked' : 'unchecked'}
        onPress={onCheckboxPress}
      />
      <View style={styles.descriptionText}>
        <FlatTextInput
          value={todo.description}
          onBlur={onBlur}
          placeholder="Enter name here"
        />
      </View>
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
