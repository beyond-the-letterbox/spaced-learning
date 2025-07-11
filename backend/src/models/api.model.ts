export interface ApiSuccess<T> {
  status: 'success',
  data?: T;
}

export interface FormattedApiError {
  statusCode: number;
  body: FormattedErrorBody;
}

export interface ApiErrorOptions {
  statusCode?: number;
  code?: string;
  message: string;
  details?: unknown;
  cause?: unknown;
  isOperational?: boolean;
}

export interface FormattedErrorBody {
  status: string;
  code: string;
  message: string;
  stack?: string;
  details?: unknown;
  cause?: unknown;
}
