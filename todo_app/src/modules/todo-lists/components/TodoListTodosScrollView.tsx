import React from 'react';

import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {loadTodoList, loadTodoListTodos} from '../redux/operations';
import {useAppDispatch, useAppSelector} from '../../../store';
import {handleApiRequests} from '../../../utils/api';
import {getTodoListEntity, getTodoListTodoCollection} from '../redux/selectors';
import {useIsFocused} from '@react-navigation/native';
import TodoListTodosScrollViewTodoDetails from './TodoListTodosScrollViewTodoDetails';
import TodoListTodosScrollViewTodos from './TodoListTodosScrollViewTodos';

interface Props {
  todoListId: number;
}

const TodoListTodosScrollView = (props: Props): JSX.Element => {
  const {todoListId} = props;
  const isFocused = useIsFocused();

  const dispatch = useAppDispatch();
  const isDarkMode = useColorScheme() === 'dark';
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const todoList = useAppSelector(getTodoListEntity(todoListId));
  const todoListTodoIds = useAppSelector(
    getTodoListTodoCollection(todoListId),
  ).ids;

  React.useEffect(() => {
    handleOnRefresh(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const handleOnRefresh = (forceReload: boolean = true) => {
    setIsRefreshing(true);
    handleApiRequests(
      dispatch,
      dispatch(loadTodoList(todoListId, forceReload)),
      dispatch(loadTodoListTodos(todoListId, forceReload)),
    ).finally(() => {
      setIsRefreshing(false);
    });
  };

  if (!todoList) {
    return <Text>Invalid</Text>;
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={[backgroundStyle, styles.scrollContainer]}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleOnRefresh} />
      }>
      <TodoListTodosScrollViewTodoDetails todoList={todoList} />
      <TodoListTodosScrollViewTodos
        todoListTodoIds={todoListTodoIds}
        todoListId={todoListId}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dateText: {
    textAlign: 'right',
  },
  scrollContainer: {
    height: '100%',
  },
});

export default TodoListTodosScrollView;
