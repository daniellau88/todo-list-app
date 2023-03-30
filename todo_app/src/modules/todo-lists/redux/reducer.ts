import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {TodoListState} from './types';
import {
  createEntityCollection,
  createEntityStore,
  saveEntityArrayToStore,
  saveEntityToStore,
  saveInfoToCollection,
} from '../../../utils/store';
import {
  TodoListCollectionResponse,
  TodoListEntity,
  TodoListMiniEntity,
  TodoListResponse,
} from '../../../typings/model';
import {CollectionInfo} from '../../../typings/store';
import {convertDateStringToDateSinceEpoch} from '../../../utils/date';

const initialState: TodoListState = {
  collectionTodoLists: createEntityCollection(),
  todoLists: createEntityStore(),
};

const todoListSlice = createSlice({
  name: 'todo-list',
  initialState: initialState,
  reducers: {
    saveTodoListArray: (
      state,
      action: PayloadAction<Array<TodoListCollectionResponse>>,
    ) => {
      const data = action.payload.map(x => {
        return {
          ...x,
          created_at: convertDateStringToDateSinceEpoch(x.created_at),
          updated_at: convertDateStringToDateSinceEpoch(x.updated_at),
        };
      });
      saveEntityArrayToStore(state.todoLists, data);
    },
    saveTodoList: (state, action: PayloadAction<TodoListResponse>) => {
      const data = action.payload;
      const entity: TodoListEntity = {
        ...data,
        created_at: convertDateStringToDateSinceEpoch(data.created_at),
        updated_at: convertDateStringToDateSinceEpoch(data.updated_at),
        todos: data.todos.map(x => x.id),
      };
      saveEntityToStore<TodoListMiniEntity, TodoListEntity>(
        state.todoLists,
        entity,
      );
    },
    updateTodoListCollection: (
      state,
      action: PayloadAction<CollectionInfo>,
    ) => {
      const data = action.payload;
      saveInfoToCollection(state.collectionTodoLists, data);
    },
  },
});

export const todoListReducer = todoListSlice.reducer;

export const todoListAction = todoListSlice.actions;
