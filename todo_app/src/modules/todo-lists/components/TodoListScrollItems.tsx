import React from 'react';

import {Text} from 'react-native';
import {useAppSelector} from '../../../reducer';
import {getTodoListMiniEntity} from '../redux/selectors';

interface Props {
  id: number;
}

const TodoListScrollItems = (props: Props): JSX.Element => {
  const {id} = props;

  const todoList = useAppSelector(getTodoListMiniEntity(id));

  if (!todoList) {
    return <Text>Invalid</Text>;
  }

  return <Text>{todoList?.name}</Text>;
};

export default TodoListScrollItems;
