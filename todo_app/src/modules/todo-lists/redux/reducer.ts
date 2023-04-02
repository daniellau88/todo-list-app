import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {TodoListState} from './types';
import {
  createEntityCollection,
  createEntityCollectionSet,
  createEntityStore,
  resetEntity,
  resetEntityCollection,
  saveEntityArrayToStore,
  saveEntityToStore,
  saveInfoToCollection,
  saveInfoToCollectionSet,
} from '../../../utils/store';
import {
  TodoListEntity,
  TodoListResponse,
  TodoResponse,
} from '../../../typings/model';
import {CollectionInfo} from '../../../typings/store';
import {convertDateStringToDateSinceEpoch} from '../../../utils/date';

const initialState: TodoListState = {
  collectionTodoLists: createEntityCollection(),
  todoLists: createEntityStore(),

  collectionSetTodoListTodos: createEntityCollectionSet(),
  todos: createEntityStore(),
};

const todoListSlice = createSlice({
  name: 'todo-list',
  initialState: initialState,
  reducers: {
    saveTodoListArray: (
      state,
      action: PayloadAction<Array<TodoListResponse>>,
    ) => {
      const data = action.payload.map(x => {
        return {
          ...x,
          created_at: convertDateStringToDateSinceEpoch(x.created_at),
          updated_at: convertDateStringToDateSinceEpoch(x.updated_at),
        };
      });
      saveEntityArrayToStore(state.todoLists, data, false);
    },
    saveTodoList: (state, action: PayloadAction<TodoListResponse>) => {
      const data = action.payload;
      const entity: TodoListEntity = {
        ...data,
        created_at: convertDateStringToDateSinceEpoch(data.created_at),
        updated_at: convertDateStringToDateSinceEpoch(data.updated_at),
      };
      saveEntityToStore<TodoListEntity, TodoListEntity>(
        state.todoLists,
        entity,
      );
    },
    removeTodoList: (state, action: PayloadAction<{id: number}>) => {
      const todoListId = action.payload.id;
      resetEntity(state.todoLists, todoListId);
    },
    updateTodoListCollection: (
      state,
      action: PayloadAction<CollectionInfo>,
    ) => {
      const data = action.payload;
      saveInfoToCollection(state.collectionTodoLists, data);
    },
    resetTodoListCollection: state => {
      resetEntityCollection(state.collectionTodoLists);
    },
    saveTodoArray: (state, action: PayloadAction<Array<TodoResponse>>) => {
      const data = action.payload.map(x => {
        return {
          ...x,
          created_at: convertDateStringToDateSinceEpoch(x.created_at),
          updated_at: convertDateStringToDateSinceEpoch(x.updated_at),
        };
      });
      saveEntityArrayToStore(state.todos, data, false);
    },
    updateTodoListTodoCollectionSet: (
      state,
      action: PayloadAction<{id: number; info: CollectionInfo}>,
    ) => {
      saveInfoToCollectionSet(
        state.collectionSetTodoListTodos,
        action.payload.id,
        action.payload.info,
      );
    },
  },
});

export const todoListReducer = todoListSlice.reducer;

export const todoListAction = todoListSlice.actions;
