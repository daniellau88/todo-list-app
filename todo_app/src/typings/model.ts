import {DateTime} from 'luxon';

export interface TodoListCollectionResponse {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface TodoListResponse {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  todos: Array<TodoResponse>;
}

export interface TodoResponse {
  id: number;
  description: string;
  is_done: boolean;
  todo_list_id: number;
  created_at: string;
  updated_at: string;
}

export interface TodoListMiniEntity {
  id: number;
  name: string;
  created_at: number;
  updated_at: number;
}

export interface TodoListEntity {
  id: number;
  name: string;
  created_at: number;
  updated_at: number;
  todos: Array<number>;
}

export interface TodoEntity {
  id: number;
  description: string;
  is_done: boolean;
  created_at: number;
  updated_at: number;
  todo_list_id: number;
}

export interface TodoListStoreRequest {
  name: string;
}

export interface TodoListUpdateRequest {
  id: number;
  name: string;
}

export interface TodoStoreRequest {
  description: string;
  is_done: boolean;
  todo_list_id: number;
}

export interface TodoUpdateRequest {
  id: number;
  description: string;
  is_done: boolean;
  todo_list_id: number;
}
