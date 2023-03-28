export enum ApiResponseStatus {
  Success = 0,
}

export interface ApiResponse<T> {
  messages: Array<string>;
  payload: T;
  status: ApiResponseStatus;
}

export interface ListPayload<T> {
  items: Array<T>;
}
