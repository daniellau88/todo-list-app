import {ApiPromise, ListPayload} from '../typings/api';
import {
  TodoResponse,
  TodoStoreRequest,
  TodoUpdateRequest,
} from '../typings/model';
import {BaseApi} from './base';

export class TodoApi extends BaseApi {
  private getBaseUrl(todoListId: number) {
    return `todo_lists/${todoListId}/todos`;
  }

  async index(todoListId: number): ApiPromise<ListPayload<TodoResponse>> {
    return this.get(this.getBaseUrl(todoListId));
  }

  async show(todoListId: number, id: number): ApiPromise<TodoResponse> {
    return this.get(`${this.getBaseUrl(todoListId)}/${id}`);
  }

  async store(
    todoListId: number,
    data: TodoStoreRequest,
  ): ApiPromise<TodoResponse> {
    return this.post(`${this.getBaseUrl(todoListId)}`, data);
  }

  async update(
    todoListId: number,
    data: TodoUpdateRequest,
  ): ApiPromise<TodoResponse> {
    return this.put(`${this.getBaseUrl(todoListId)}/${data.id}`, data);
  }

  async remove(todoListId: number, id: number): ApiPromise<TodoResponse> {
    return this.delete(`${this.getBaseUrl(todoListId)}/${id}`);
  }
}
