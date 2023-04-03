import React from 'react';

import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {loadTodoLists} from '../redux/operations';
import {useAppDispatch, useAppSelector} from '../../../store';
import {getTodoListCollection} from '../redux/selectors';
import TodoListScrollItems from './TodoListScrollItems';
import {handleApiRequests} from '../../../utils/api';
import {useIsFocused} from '@react-navigation/native';
import OfflineTopBar from '../../app-info/components/OfflineTopBar';
import {Text} from 'react-native-paper';

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

  const todoListCollection = useAppSelector(getTodoListCollection());
  const todoIds = todoListCollection.ids;
  const lastRetrievedDate = todoListCollection.last_update;

  return (
    <View style={styles.container}>
      <OfflineTopBar lastRetrievedDate={lastRetrievedDate} />
      {lastRetrievedDate === 0 && (
        <Text variant="bodyLarge" style={styles.notifyText}>
          No offline todo lists available
        </Text>
      )}
      {todoIds.length === 0 && !isRefreshing && lastRetrievedDate !== 0 && (
        <Text variant="bodyLarge" style={styles.notifyText}>
          No todo lists to show
        </Text>
      )}
      <FlatList
        data={todoIds}
        renderItem={id => <TodoListScrollItems id={id.item} />}
        style={[backgroundStyle]}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notifyText: {
    margin: 10,
    textAlign: 'center',
    justifyContent: 'center',
  },
});

export default TodoListScrollView;
