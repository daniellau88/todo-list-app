import {TodoListState} from '../modules/todo-lists/redux/types';

export type SelectionKey = number;

export interface AppState {
  todoList: TodoListState;
}

export interface WithId {
  id: number;
}

export interface EntityMetadata {
  last_update: number;
  last_full_update: number;
}

export interface EntityStore<T extends WithId, U extends T = T> {
  byId: {[id: number]: T & Partial<U> & EntityMetadata};
}

export interface EntityCollection {
  ids: Array<number>;
  last_update: number;
}

export interface CollectionInfo {
  ids: Array<number>;
}
