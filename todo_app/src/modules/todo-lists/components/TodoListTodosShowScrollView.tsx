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
import {
  loadTodoList,
  loadTodoListTodos,
  updateTodoList,
} from '../redux/operations';
import {useAppDispatch, useAppSelector} from '../../../reducer';
import {Card} from 'react-native-paper';
import {convertDateSinceEpochToDateTime} from '../../../utils/date';
import TodoListTodosScrollItems from './TodoListTodosScrollItems';
import {handleApiRequest, handleApiRequests} from '../../../utils/api';
import {getTodoListEntity, getTodoListTodoCollection} from '../redux/selectors';
import {useIsFocused} from '@react-navigation/native';
import FlatTextInput from '../../../components/FlatTextInput';

interface Props {
  todoListId: number;
}

const TodoListTodosShowView = (props: Props): JSX.Element => {
  const {todoListId} = props;
  const isFocused = useIsFocused();

  const dispatch = useAppDispatch();
  const isDarkMode = useColorScheme() === 'dark';
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [textInput, setTextInput] = React.useState('');

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

  React.useEffect(() => {
    if (todoList) {
      setTextInput(todoList.name);
    }
  }, [todoList]);

  const onChangeText = (text: string) => {
    setTextInput(text);
  };

  const onBlur = () => {
    handleApiRequest(
      dispatch,
      dispatch(updateTodoList({id: todoListId, name: textInput})),
    );
  };

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
            <FlatTextInput
              value={textInput}
              onBlur={onBlur}
              onChangeText={onChangeText}
              placeholder="Enter name here"
            />
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

export default TodoListTodosShowView;
