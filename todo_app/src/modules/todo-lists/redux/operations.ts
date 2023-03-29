import {AnyAction, ThunkAction} from '@reduxjs/toolkit';
import {todoListApi} from '../../../api';
import {CollectionInfo} from '../../../typings/store';
import {queryEntityCollection} from '../../../utils/store';
import {TodoListResponse} from '../../../typings/model';
import {todoListAction} from './reducer';
import {RootState} from '../../../reducer';

export const loadTodoLists = (
  forceReload: boolean = false,
): ThunkAction<Promise<any>, RootState, undefined, AnyAction> => {
  return (dispatch, getState) => {
    return queryEntityCollection(
      () => getState().todoList.collectionTodoLists,
      () => todoListApi.index(),
      (info: CollectionInfo) =>
        dispatch(todoListAction.updateTodoListCollection(info)),
      (entityArray: Array<TodoListResponse>) =>
        dispatch(todoListAction.saveTodoListArray(entityArray)),
      forceReload,
    );
  };
};
