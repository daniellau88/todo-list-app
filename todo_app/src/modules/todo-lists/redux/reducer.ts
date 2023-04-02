import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {TodoListState} from './types';
import {
  createEntityCollection,
  createEntityCollectionSet,
  createEntityStore,
  resetEntity,
  resetEntityCollection,
  resetEntityCollectionFromSet,
  saveEntityArrayToStore,
  saveEntityToStore,
  saveInfoToCollection,
  saveInfoToCollectionSet,
} from '../../../utils/store';
import {
  TodoEntity,
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
    resetTodoList: (state, action: PayloadAction<{id: number}>) => {
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
    saveTodo: (state, action: PayloadAction<TodoResponse>) => {
      const data = action.payload;
      const entity: TodoEntity = {
        ...data,
        created_at: convertDateStringToDateSinceEpoch(data.created_at),
        updated_at: convertDateStringToDateSinceEpoch(data.updated_at),
      };
      saveEntityToStore<TodoEntity, TodoEntity>(state.todos, entity);
    },
    resetTodo: (state, action: PayloadAction<{id: number}>) => {
      const todoId = action.payload.id;
      resetEntity(state.todos, todoId);
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
    resetTodoListCollectionSet: (
      state,
      action: PayloadAction<{id: number}>,
    ) => {
      resetEntityCollectionFromSet(
        state.collectionSetTodoListTodos,
        action.payload.id,
      );
    },
    addToTodoListCollectionSet: (
      state,
      action: PayloadAction<{todoListId: number; id: number}>,
    ) => {
      state.collectionSetTodoListTodos.byId[action.payload.todoListId].ids.push(
        action.payload.id,
      );
    },
  },
});

export const todoListReducer = todoListSlice.reducer;

export const todoListAction = todoListSlice.actions;
