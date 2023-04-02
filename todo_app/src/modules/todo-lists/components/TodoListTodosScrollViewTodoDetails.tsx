import React from 'react';

import {StyleSheet, Text} from 'react-native';
import {updateTodoList} from '../redux/operations';
import {useAppDispatch} from '../../../store';
import {Card} from 'react-native-paper';
import {convertDateSinceEpochToDateTime} from '../../../utils/date';
import {handleApiRequest} from '../../../utils/api';
import FlatTextInput from '../../../components/FlatTextInput';
import {TodoListEntity} from '../../../typings/model';

interface Props {
  todoList: TodoListEntity;
}

const TodoListTodosScrollViewTodoDetails = (props: Props): JSX.Element => {
  const {todoList} = props;

  const dispatch = useAppDispatch();

  const onBlur = (text: string) => {
    if (todoList && text !== todoList.name) {
      handleApiRequest(
        dispatch,
        dispatch(updateTodoList({id: todoList.id, name: text})),
      );
    }
  };

  return (
    <Card>
      <Card.Content>
        <FlatTextInput
          value={todoList.name}
          onBlur={onBlur}
          placeholder="Enter name here"
        />
        <Text style={styles.dateText}>
          Last updated{' '}
          {convertDateSinceEpochToDateTime(todoList.updated_at).toRelative()}
        </Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  dateText: {
    textAlign: 'right',
  },
});

export default TodoListTodosScrollViewTodoDetails;
