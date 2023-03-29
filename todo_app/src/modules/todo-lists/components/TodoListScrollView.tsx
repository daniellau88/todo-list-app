import React from 'react';

import {ScrollView, View, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {loadTodoLists} from '../redux/operations';
import {useAppDispatch, useAppSelector} from '../../../reducer';
import {getTodoListCollection} from '../redux/selectors';
import TodoListScrollItems from './TodoListScrollItems';

const TodoListScrollView = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  React.useEffect(() => {
    dispatch(loadTodoLists());
  }, []);

  const todoIds = useAppSelector(getTodoListCollection()).ids;

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={backgroundStyle}>
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        {todoIds.map(x => (
          <TodoListScrollItems key={x} id={x} />
        ))}
      </View>
    </ScrollView>
  );
};

export default TodoListScrollView;
