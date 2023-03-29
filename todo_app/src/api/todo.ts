import {ApiPromise, ListPayload} from '../typings/api';
import {
  TodoResponse,
  TodoStoreRequest,
  TodoUpdateRequest,
} from '../typings/model';
import {BaseApi} from './base';

export class TodoApi extends BaseApi {
  baseUrl = 'todos';

  async index(): ApiPromise<ListPayload<TodoResponse>> {
    return this.get(this.baseUrl);
  }

  async show(id: number): ApiPromise<TodoResponse> {
    return this.get(`${this.baseUrl}/${id}`);
  }

  async store(data: TodoStoreRequest): ApiPromise<TodoResponse> {
    return this.post(this.baseUrl, data);
  }

  async update(data: TodoUpdateRequest): ApiPromise<TodoResponse> {
    return this.put(`${this.baseUrl}/${data.id}`, data);
  }

  async remove(id: number): ApiPromise<TodoResponse> {
    return this.delete(`${this.baseUrl}/${id}`);
  }
}
