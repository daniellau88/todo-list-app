import React from 'react';
import FloatingButton from '../../../components/FloatingButton';
import {ScreenName, useAppNavigation} from '../../../navigation';

const TodoListCreateButton = (): JSX.Element => {
  const navigation = useAppNavigation();
  const onPressCreate = () => {
    navigation.navigate(ScreenName.TodoListTodos, {isCreate: true});
  };

  return <FloatingButton onPress={onPressCreate} />;
};

export default TodoListCreateButton;
