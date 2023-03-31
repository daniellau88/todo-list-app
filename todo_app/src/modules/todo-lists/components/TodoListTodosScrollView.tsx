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
import {useAppDispatch, useAppSelector} from '../../../reducer';
import {getTodoListEntity, getTodoListTodoCollection} from '../redux/selectors';
import {Card, Title} from 'react-native-paper';
import {convertDateSinceEpochToDateTime} from '../../../utils/date';
import TodoListTodosScrollItems from './TodoListTodosScrollItems';
import {handleApiRequests} from '../../../utils/api';

interface Props {
  todoListId: number;
}

const TodoListTodosScrollView = (props: Props): JSX.Element => {
  const {todoListId} = props;
  const dispatch = useAppDispatch();
  const isDarkMode = useColorScheme() === 'dark';
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const todoList = useAppSelector(getTodoListEntity(todoListId));
  const todoListTodoIds = useAppSelector(
    getTodoListTodoCollection(todoListId),
  ).ids;

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  React.useEffect(() => {
    handleOnRefresh(false);
  }, []);

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
      style={backgroundStyle}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleOnRefresh} />
      }>
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        <Card>
          <Card.Content>
            <Title>{todoList.name}</Title>
            <Text style={styles.dateText}>
              Last updated{' '}
              {convertDateSinceEpochToDateTime(
                todoList.updated_at,
              ).toRelative()}
            </Text>
          </Card.Content>
        </Card>
        {todoListTodoIds.length === 0 && <Text>No todos to show</Text>}
        {todoListTodoIds.map(x => (
          <TodoListTodosScrollItems key={x} id={x} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dateText: {
    textAlign: 'right',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default TodoListTodosScrollView;
