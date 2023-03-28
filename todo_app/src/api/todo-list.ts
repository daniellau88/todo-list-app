import {ApiResponse, ListPayload} from '../typings/api';
import {
  TodoListResponse,
  TodoListStoreRequest,
  TodoListUpdateRequest,
} from '../typings/model';
import {BaseApi} from './base';

export class TodoListApi extends BaseApi {
  baseUrl = 'todo_lists';

  async index(): Promise<ApiResponse<ListPayload<TodoListResponse>>> {
    return this.get(this.baseUrl);
  }

  async show(id: number): Promise<ApiResponse<TodoListResponse>> {
    return this.get(`${this.baseUrl}/${id}`);
  }

  async store(
    data: TodoListStoreRequest,
  ): Promise<ApiResponse<TodoListResponse>> {
    return this.post(this.baseUrl, data);
  }

  async update(
    data: TodoListUpdateRequest,
  ): Promise<ApiResponse<TodoListResponse>> {
    return this.put(`${this.baseUrl}/${data.id}`, data);
  }

  async remove(id: number): Promise<ApiResponse<TodoListResponse>> {
    return this.delete(`${this.baseUrl}/${id}`);
  }
}
