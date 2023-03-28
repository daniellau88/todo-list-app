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

export interface EntityBase {
  last_queried_at: number;
}

export interface TodoListEntity extends EntityBase {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  todos: Array<number>;
}

export interface TodoEntity extends EntityBase {
  id: number;
  description: string;
  is_done: boolean;
  todo_list_id: number;
  created_at: string;
  updated_at: string;
}
