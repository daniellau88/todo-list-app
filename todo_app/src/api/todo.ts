import {ApiResponse, ListPayload} from '../typings/api';
import {
  TodoResponse,
  TodoStoreRequest,
  TodoUpdateRequest,
} from '../typings/model';
import {BaseApi} from './base';

export class TodoApi extends BaseApi {
  baseUrl = 'todos';

  async index(): Promise<ApiResponse<ListPayload<TodoResponse>>> {
    return this.get(this.baseUrl);
  }

  async show(id: number): Promise<ApiResponse<TodoResponse>> {
    return this.get(`${this.baseUrl}/${id}`);
  }

  async store(data: TodoStoreRequest): Promise<ApiResponse<TodoResponse>> {
    return this.post(this.baseUrl, data);
  }

  async update(data: TodoUpdateRequest): Promise<ApiResponse<TodoResponse>> {
    return this.put(`${this.baseUrl}/${data.id}`, data);
  }

  async remove(id: number): Promise<ApiResponse<TodoResponse>> {
    return this.delete(`${this.baseUrl}/${id}`);
  }
}
