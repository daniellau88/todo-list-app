import {AnyAction, ThunkAction} from '@reduxjs/toolkit';
import {todoApi, todoListApi} from '../../../api';
import {CollectionInfo, EntityCollection} from '../../../typings/store';
import {
  queryEntity,
  queryEntityCollection,
  queryEntityCollectionSet,
  selectEntity,
} from '../../../utils/store';
import {
  TodoListEntity,
  TodoListResponse,
  TodoResponse,
} from '../../../typings/model';
import {todoListAction} from './reducer';
import {RootState} from '../../../reducer';
import {ApiPromise} from '../../../typings/api';

export const loadTodoLists = (
  forceReload: boolean = false,
): ThunkAction<
  ApiPromise<EntityCollection>,
  RootState,
  undefined,
  AnyAction
> => {
  return (dispatch, getState) => {
    return queryEntityCollection(
      () => getState().todoList.collectionTodoLists,
      () => todoListApi.index(),
      (info: CollectionInfo) =>
        dispatch(todoListAction.updateTodoListCollection(info)),
      (responseArray: Array<TodoListResponse>) =>
        dispatch(todoListAction.saveTodoListArray(responseArray)),
      forceReload,
    );
  };
};

export const loadTodoList = (
  id: number,
  forceReload: boolean = false,
): ThunkAction<ApiPromise<TodoListEntity>, RootState, undefined, AnyAction> => {
  return (dispatch, getState) => {
    return queryEntity(
      () => selectEntity(getState().todoList.todoLists, id),
      () => todoListApi.show(id),
      (response: TodoListResponse) =>
        dispatch(todoListAction.saveTodoList(response)),
      forceReload,
    );
  };
};

export const loadTodoListTodos = (
  todoListId: number,
  forceReload: boolean = false,
): ThunkAction<
  ApiPromise<EntityCollection>,
  RootState,
  undefined,
  AnyAction
> => {
  return (dispatch, getState) => {
    return queryEntityCollectionSet(
      () => getState().todoList.collectionSetTodoListTodos,
      todoListId,
      () => todoApi.index(todoListId),
      (info: CollectionInfo) =>
        dispatch(
          todoListAction.updateTodoListTodoCollectionSet({
            id: todoListId,
            info,
          }),
        ),
      (responseArray: Array<TodoResponse>) =>
        dispatch(todoListAction.saveTodoArray(responseArray)),
      forceReload,
    );
  };
};
