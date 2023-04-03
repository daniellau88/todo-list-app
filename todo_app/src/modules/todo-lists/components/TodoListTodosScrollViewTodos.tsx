import React from 'react';
import {storeTodo} from '../redux/operations';
import {useAppDispatch} from '../../../store';
import {Button, Card} from 'react-native-paper';
import {handleApiRequest} from '../../../utils/api';
import FlatTextInput from '../../../components/FlatTextInput';
import TodoListTodosScrollItems from './TodoListTodosScrollItems';
import {StyleSheet, View} from 'react-native';
import {useIsOnline} from '../../../utils/app-info';

interface Props {
  todoListTodoIds: Array<number>;
  todoListId: number;
}

const TodoListTodosScrollViewTodos = (props: Props): JSX.Element => {
  const {todoListTodoIds, todoListId} = props;

  const dispatch = useAppDispatch();
  const isOnline = useIsOnline();

  const [textValue, setTextValue] = React.useState('');

  const onBlur = (text: string) => {
    if (text !== '') {
      setTextValue(text);
      handleApiRequest(
        dispatch,
        dispatch(storeTodo(todoListId, {description: text})),
      ).then(() => {
        setTextValue('');
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
              value={textValue}
              onBlur={onBlur}
              placeholder={
                isOnline
                  ? 'Add new todo'
                  : 'Cannot create todo list when offline'
              }
              editable={isOnline}
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
