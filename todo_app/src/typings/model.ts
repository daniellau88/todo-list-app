export interface TodoListResponse {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface TodoResponse {
  id: number;
  description: string;
  is_done: boolean;
  todo_list_id: number;
  created_at: string;
  updated_at: string;
}

export interface TodoListEntity {
  id: number;
  name: string;
  created_at: number;
  updated_at: number;
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
}

export interface TodoUpdateRequest {
  id: number;
  description: string;
  is_done: boolean;
}
