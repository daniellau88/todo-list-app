import React from 'react';

import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
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
import OfflineTopBar from '../../app-info/components/OfflineTopBar';

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
  const todoListTodoCollection = useAppSelector(
    getTodoListTodoCollection(todoListId),
  );
  const lastRetrievedDate = todoList?.last_full_update;

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
    <View>
      <OfflineTopBar lastRetrievedDate={lastRetrievedDate} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={[backgroundStyle, styles.scrollContainer]}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleOnRefresh}
          />
        }>
        <TodoListTodosScrollViewTodoDetails todoList={todoList} />
        <TodoListTodosScrollViewTodos
          todoListTodoCollection={todoListTodoCollection}
          todoListId={todoListId}
        />
      </ScrollView>
    </View>
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
