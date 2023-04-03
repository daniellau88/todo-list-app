import React from 'react';
import {ScreenName, useAppNavigation, useAppRoute} from '../../../navigation';
import {useSelector} from 'react-redux';
import {getTodoListEntity} from '../redux/selectors';
import {View} from 'react-native';
import {
  Button,
  Dialog,
  IconButton,
  MD3Colors,
  Portal,
  Text,
} from 'react-native-paper';
import {handleApiRequest} from '../../../utils/api';
import {deleteTodoList} from '../redux/operations';
import {useAppDispatch} from '../../../store';
import {useIsOnline} from '../../../utils/app-info';

const TodoListTodosScreenDeleteOption = (): JSX.Element => {
  const route = useAppRoute<ScreenName.TodoListTodos>();
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const [showDialog, setShowDialog] = React.useState(false);

  const todoListId = route.params.todoListId;
  const todoList = useSelector(getTodoListEntity(todoListId));
  const isOnline = useIsOnline();

  if (!todoList) {
    return <View />;
  }

  const onPress = () => {
    setShowDialog(true);
  };

  const hideDialog = () => {
    setShowDialog(false);
  };

  const onConfirm = () => {
    handleApiRequest(dispatch, dispatch(deleteTodoList(todoListId)))
      .then(() => {
        navigation.goBack();
      })
      .finally(() => hideDialog());
  };

  return (
    <View>
      <IconButton
        icon="delete"
        onPress={onPress}
        iconColor={MD3Colors.error50}
        disabled={!isOnline}
      />
      <Portal>
        <Dialog visible={showDialog} onDismiss={hideDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Are you sure you want to delete the todo list
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={onConfirm}>Confirm</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default TodoListTodosScreenDeleteOption;
