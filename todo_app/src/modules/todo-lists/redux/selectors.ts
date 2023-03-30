import {RootState} from '../../../reducer';
import {SelectionKey} from '../../../typings/store';
import {
  selectCollectionSet,
  selectEntity,
  selectMiniEntity,
} from '../../../utils/store';

const getLocalState = (state: RootState) => state.todoList;

export const getTodoListCollection = () => {
  return (state: RootState) => {
    return getLocalState(state).collectionTodoLists;
  };
};

export const getTodoListMiniEntity = (id: SelectionKey) => {
  return (state: RootState) => {
    return selectMiniEntity(getLocalState(state).todoLists, id);
  };
};

export const getTodoListEntity = (id: SelectionKey) => {
  return (state: RootState) => {
    return selectEntity(getLocalState(state).todoLists, id);
  };
};

export const getTodoListTodoCollection = (id: SelectionKey) => {
  return (state: RootState) => {
    return selectCollectionSet(
      getLocalState(state).collectionSetTodoListTodos,
      id,
    );
  };
};
