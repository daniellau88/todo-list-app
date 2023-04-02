export enum ApiResponseStatus {
  Success = 0,
  NoConnection = 100,
}

export interface ApiResponse<T> {
  messages: Array<string>;
  payload: T;
  status: ApiResponseStatus;
}

export type ApiPromise<T> = Promise<ApiResponse<T>>;

export interface ListPayload<T> {
  items: Array<T>;
}
