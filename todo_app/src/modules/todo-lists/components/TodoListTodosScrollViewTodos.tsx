import React from 'react';
import {storeTodo} from '../redux/operations';
import {useAppDispatch} from '../../../reducer';
import {Button, Card} from 'react-native-paper';
import {handleApiRequest} from '../../../utils/api';
import FlatTextInput from '../../../components/FlatTextInput';
import TodoListTodosScrollItems from './TodoListTodosScrollItems';
import {StyleSheet, View} from 'react-native';

interface Props {
  todoListTodoIds: Array<number>;
  todoListId: number;
}

const TodoListTodosScrollViewTodos = (props: Props): JSX.Element => {
  const {todoListTodoIds, todoListId} = props;

  const dispatch = useAppDispatch();
  const [textInput, setTextInput] = React.useState('');

  const onChangeText = (text: string) => {
    setTextInput(text);
  };

  const onBlur = () => {
    if (textInput !== '') {
      handleApiRequest(
        dispatch,
        dispatch(storeTodo(todoListId, {description: textInput})),
      ).then(() => {
        setTextInput('');
      });
    }
  };

  return (
    <Card>
      <Card.Content>
        {todoListTodoIds.map(x => (
          <TodoListTodosScrollItems key={x} todoListId={todoListId} id={x} />
        ))}
        <View style={styles.container}>
          <Button icon="plus" children={undefined} />
          <View style={styles.descriptionText}>
            <FlatTextInput
              value={textInput}
              onBlur={onBlur}
              onChangeText={onChangeText}
              placeholder="Add new todo"
            />
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  descriptionText: {
    flex: 1,
  },
});

export default TodoListTodosScrollViewTodos;
