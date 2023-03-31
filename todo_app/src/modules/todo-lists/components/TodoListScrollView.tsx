import React from 'react';

import {
  RefreshControl,
  ScrollView,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {loadTodoLists} from '../redux/operations';
import {useAppDispatch, useAppSelector} from '../../../reducer';
import {getTodoListCollection} from '../redux/selectors';
import TodoListScrollItems from './TodoListScrollItems';

const TodoListScrollView = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const isDarkMode = useColorScheme() === 'dark';
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  React.useEffect(() => {
    dispatch(loadTodoLists());
  }, []);

  const onRefresh = () => {
    setIsRefreshing(true);
    dispatch(loadTodoLists(true)).finally(() => {
      setIsRefreshing(false);
    });
  };

  const todoIds = useAppSelector(getTodoListCollection()).ids;

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={backgroundStyle}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }>
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        {todoIds.length === 0 && <Text>No todos to show</Text>}
        {todoIds.map(x => (
          <TodoListScrollItems key={x} id={x} />
        ))}
      </View>
    </ScrollView>
  );
};

export default TodoListScrollView;
