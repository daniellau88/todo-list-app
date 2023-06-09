import React from 'react';

import {ScrollView, StyleSheet, Text, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useAppDispatch, useAppSelector} from '../../../store';
import {Card} from 'react-native-paper';
import {handleApiRequest} from '../../../utils/api';
import {storeTodoList} from '../redux/operations';
import FlatTextInput from '../../../components/FlatTextInput';
import {ScreenName, useAppNavigation} from '../../../navigation';
import {getAppIsOnline} from '../../app-info/redux/selectors';

const TodoListCreateScrollView = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const isOnline = useAppSelector(getAppIsOnline());
  const isDarkMode = useColorScheme() === 'dark';

  const onBlur = (text: string) => {
    handleApiRequest(dispatch, dispatch(storeTodoList({name: text}))).then(
      resp =>
        navigation.replace(ScreenName.TodoListTodos, {
          todoListId: resp.payload.id,
        }),
    );
  };

  return (
    <ScrollView
      style={[
        {backgroundColor: isDarkMode ? Colors.black : Colors.white},
        styles.scrollContainer,
      ]}>
      <Card>
        <Card.Content>
          <FlatTextInput
            onBlur={onBlur}
            placeholder={
              isOnline
                ? 'Enter name here'
                : 'Cannot create todo list when offline'
            }
            editable={isOnline}
          />
          <Text style={styles.dateText}>New entry</Text>
        </Card.Content>
      </Card>
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

export default TodoListCreateScrollView;
