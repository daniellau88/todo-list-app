import React from 'react';

import {useAppSelector} from '../../../reducer';
import {getTodoListMiniEntity} from '../redux/selectors';
import {Card, Paragraph, Text, Title} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

interface Props {
  id: number;
}

const TodoListScrollItems = (props: Props): JSX.Element => {
  const {id} = props;

  const todoList = useAppSelector(getTodoListMiniEntity(id));

  if (!todoList) {
    return <Text>Invalid</Text>;
  }

  return (
    <Card>
      <Card.Content>
        <Title>{todoList.name}</Title>
        <Paragraph>TODO: Summary</Paragraph>
        <View>
          <Text style={styles.dateText}>
            Last updated {todoList.updated_at.toRelative()}
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
