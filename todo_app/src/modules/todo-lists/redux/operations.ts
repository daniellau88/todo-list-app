import {AnyAction, ThunkAction} from '@reduxjs/toolkit';
import {todoApi, todoListApi} from '../../../api';
import {CollectionInfo, EntityCollection} from '../../../typings/store';
import {
  executeOperationEntity,
  queryEntity,
  queryEntityCollection,
  queryEntityCollectionSet,
  selectEntity,
} from '../../../utils/store';
import {
  TodoEntity,
  TodoListEntity,
  TodoListResponse,
  TodoListStoreRequest,
  TodoListUpdateRequest,
  TodoResponse,
  TodoStoreRequest,
  TodoUpdateRequest,
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

export const storeTodoList = (
  req: TodoListStoreRequest,
): ThunkAction<ApiPromise<TodoListEntity>, RootState, undefined, AnyAction> => {
  return (dispatch, getState) => {
    return executeOperationEntity(
      () => getState().todoList.todoLists,
      () => todoListApi.store(req),
      response => dispatch(todoListAction.saveTodoList(response)),
      () => dispatch(todoListAction.resetTodoListCollection()),
    );
  };
};

export const updateTodoList = (
  req: TodoListUpdateRequest,
): ThunkAction<ApiPromise<TodoListEntity>, RootState, undefined, AnyAction> => {
  return (dispatch, getState) => {
    return executeOperationEntity(
      () => getState().todoList.todoLists,
      () => todoListApi.update(req),
      response => dispatch(todoListAction.saveTodoList(response)),
      () => dispatch(todoListAction.resetTodoListCollection()),
    );
  };
};

export const deleteTodoList = (
  todoListId: number,
): ThunkAction<ApiPromise<TodoListEntity>, RootState, undefined, AnyAction> => {
  return (dispatch, getState) => {
    return executeOperationEntity(
      () => getState().todoList.todoLists,
      () => todoListApi.remove(todoListId),
      response => dispatch(todoListAction.resetTodoList({id: response.id})),
      () => dispatch(todoListAction.resetTodoListCollection()),
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

export const loadTodoListTodo = (
  todoListId: number,
  id: number,
  forceReload: boolean = false,
): ThunkAction<ApiPromise<TodoEntity>, RootState, undefined, AnyAction> => {
  return (dispatch, getState) => {
    return queryEntity(
      () => selectEntity(getState().todoList.todos, id),
      () => todoApi.show(todoListId, id),
      (response: TodoResponse) => dispatch(todoListAction.saveTodo(response)),
      forceReload,
    );
  };
};

export const storeTodo = (
  todoListId: number,
  req: TodoStoreRequest,
): ThunkAction<ApiPromise<TodoEntity>, RootState, undefined, AnyAction> => {
  return (dispatch, getState) => {
    return executeOperationEntity(
      () => getState().todoList.todos,
      () => todoApi.store(todoListId, req),
      response => dispatch(todoListAction.saveTodo(response)),
    );
  };
};

export const updateTodo = (
  todoListId: number,
  req: TodoUpdateRequest,
): ThunkAction<ApiPromise<TodoEntity>, RootState, undefined, AnyAction> => {
  return (dispatch, getState) => {
    return executeOperationEntity(
      () => getState().todoList.todos,
      () => todoApi.update(todoListId, req),
      response => dispatch(todoListAction.saveTodo(response)),
    );
  };
};

export const deleteTodo = (
  todoListId: number,
  id: number,
): ThunkAction<ApiPromise<TodoEntity>, RootState, undefined, AnyAction> => {
  return (dispatch, getState) => {
    return executeOperationEntity(
      () => getState().todoList.todos,
      () => todoApi.remove(todoListId, id),
      response => dispatch(todoListAction.resetTodo({id: response.id})),
    );
  };
};
