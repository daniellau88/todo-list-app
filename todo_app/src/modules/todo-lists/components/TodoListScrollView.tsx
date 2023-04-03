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
  container: {flex: 1},
});

export default TodoListScrollView;
