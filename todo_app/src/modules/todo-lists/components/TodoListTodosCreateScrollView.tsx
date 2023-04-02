import React from 'react';

import {ScrollView, StyleSheet, Text, View, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useAppDispatch} from '../../../reducer';
import {Card, TextInput} from 'react-native-paper';
import {handleApiRequest} from '../../../utils/api';
import {storeTodoList} from '../redux/operations';

interface Props {
  setTodoListIdStore: (id: number) => void;
}

const TodoListTodosCreateView = (props: Props): JSX.Element => {
  const {setTodoListIdStore} = props;
  const dispatch = useAppDispatch();
  const isDarkMode = useColorScheme() === 'dark';
  const [textInput, setTextInput] = React.useState('');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onChangeText = (text: string) => {
    setTextInput(text);
  };

  const onBlur = () => {
    handleApiRequest(dispatch, dispatch(storeTodoList({name: textInput}))).then(
      x => setTodoListIdStore(x.payload.id),
    );
  };

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={backgroundStyle}>
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        <Card>
          <Card.Content>
            <TextInput
              onBlur={onBlur}
              onChangeText={onChangeText}
              underlineColor="transparent"
              mode="flat"
              style={styles.input}
              placeholder="Enter name here"
            />
            <Text style={styles.dateText}>New entry</Text>
          </Card.Content>
        </Card>
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
  input: {
    backgroundColor: 'transparent',
  },
});

export default TodoListTodosCreateView;
