import React from 'react';
import TodoListTodosCreateView from './TodoListTodosCreateScrollView';
import TodoListTodosShowView from './TodoListTodosShowScrollView';

interface Props {
  todoListId?: number;
  isCreate: boolean;
}

const TodoListTodosScrollView = (props: Props): JSX.Element => {
  const {todoListId, isCreate} = props;
  const [todoListIdStore, setTodoListIdStore] = React.useState(
    isCreate ? undefined : todoListId,
  );

  if (todoListIdStore === undefined) {
    return <TodoListTodosCreateView setTodoListIdStore={setTodoListIdStore} />;
  }

  return <TodoListTodosShowView todoListId={todoListIdStore} />;
};

export default TodoListTodosScrollView;
