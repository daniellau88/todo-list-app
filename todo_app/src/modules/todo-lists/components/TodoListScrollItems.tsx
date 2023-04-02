import React from 'react';

import {useAppSelector} from '../../../reducer';
import {getTodoListMiniEntity} from '../redux/selectors';
import {Card, Paragraph, Text, Title} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {convertDateSinceEpochToDateTime} from '../../../utils/date';
import {ScreenName, useAppNavigation} from '../../../navigation';

interface Props {
  id: number;
}

const TodoListScrollItems = (props: Props): JSX.Element => {
  const {id} = props;

  const todoList = useAppSelector(getTodoListMiniEntity(id));
  const navigation = useAppNavigation();

  if (!todoList) {
    return <Text>Invalid</Text>;
  }

  const handleOnPress = () => {
    navigation.navigate(ScreenName.TodoListTodos, {todoListId: id});
  };

  return (
    <Card onPress={handleOnPress}>
      <Card.Content>
        <Title>{todoList.name}</Title>
        <Paragraph>TODO: Summary</Paragraph>
        <View>
          <Text style={styles.dateText}>
            Last updated{' '}
            {convertDateSinceEpochToDateTime(todoList.updated_at).toRelative()}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  dateText: {
    textAlign: 'right',
  },
});

export default TodoListScrollItems;
