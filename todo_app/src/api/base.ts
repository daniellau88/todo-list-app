import axios from 'axios';
import {ApiResponse} from '../typings/api';

axios.defaults.baseURL = 'https://todo.dlau.one/api/';

export class BaseApi {
  protected async get<T>(url: string, params?: any): Promise<ApiResponse<T>> {
    const response = await axios.get(url, params);
    return response.data as ApiResponse<T>;
  }

  protected async post<T>(
    url: string,
    data: any = {},
  ): Promise<ApiResponse<T>> {
    const response = await axios.post(url, data);
    return response.data as ApiResponse<T>;
  }

  protected async put<T>(url: string, data: any = {}): Promise<ApiResponse<T>> {
    const response = await axios.put(url, data);
    return response.data as ApiResponse<T>;
  }

  protected async delete<T>(
    url: string,
    data: any = {},
  ): Promise<ApiResponse<T>> {
    const response = await axios.delete(url, data);
    return response.data as ApiResponse<T>;
  }
}
