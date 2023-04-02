import React from 'react';

import {ScrollView, StyleSheet, Text, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useAppDispatch} from '../../../reducer';
import {Card} from 'react-native-paper';
import {handleApiRequest} from '../../../utils/api';
import {storeTodoList} from '../redux/operations';
import FlatTextInput from '../../../components/FlatTextInput';
import {ScreenName, useAppNavigation} from '../../../navigation';

const TodoListCreateScrollView = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  const [textInput, setTextInput] = React.useState('');

  const onChangeText = (text: string) => {
    setTextInput(text);
  };

  const onBlur = () => {
    handleApiRequest(dispatch, dispatch(storeTodoList({name: textInput}))).then(
      x =>
        navigation.replace(ScreenName.TodoListTodos, {
          todoListId: x.payload.id,
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
            onChangeText={onChangeText}
            placeholder="Enter name here"
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
