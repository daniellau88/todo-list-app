import {ApiPromise, ListPayload} from '../typings/api';
import {
  TodoListResponse,
  TodoListStoreRequest,
  TodoListUpdateRequest,
} from '../typings/model';
import {BaseApi} from './base';

export class TodoListApi extends BaseApi {
  baseUrl = 'todo_lists';

  async index(): ApiPromise<ListPayload<TodoListResponse>> {
    return this.get(this.baseUrl);
  }

  async show(id: number): ApiPromise<TodoListResponse> {
    return this.get(`${this.baseUrl}/${id}`);
  }

  async store(data: TodoListStoreRequest): ApiPromise<TodoListResponse> {
    return this.post(this.baseUrl, data);
  }

  async update(data: TodoListUpdateRequest): ApiPromise<TodoListResponse> {
    return this.put(`${this.baseUrl}/${data.id}`, data);
  }

  async remove(id: number): ApiPromise<TodoListResponse> {
    return this.delete(`${this.baseUrl}/${id}`);
  }
}
