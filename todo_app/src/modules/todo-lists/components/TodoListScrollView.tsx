import React from 'react';

import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {loadTodoLists} from '../redux/operations';
import {useAppDispatch, useAppSelector} from '../../../reducer';
import {getTodoListCollection} from '../redux/selectors';
import TodoListScrollItems from './TodoListScrollItems';
import {handleApiRequests} from '../../../utils/api';
import {useIsFocused} from '@react-navigation/native';

const TodoListScrollView = (): JSX.Element => {
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const isDarkMode = useColorScheme() === 'dark';
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  React.useEffect(() => {
    onRefresh(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const onRefresh = (forceReload: boolean = true) => {
    setIsRefreshing(true);
    handleApiRequests(dispatch, dispatch(loadTodoLists(forceReload))).finally(
      () => {
        setIsRefreshing(false);
      },
    );
  };

  const todoIds = useAppSelector(getTodoListCollection()).ids;

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={[backgroundStyle, styles.scrollContainer]}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }>
      {todoIds.length === 0 && <Text>No todos to show</Text>}
      {todoIds.map(x => (
        <TodoListScrollItems key={x} id={x} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    height: '100%',
  },
});

export default TodoListScrollView;
