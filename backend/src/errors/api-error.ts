import { ApiErrorOptions, FormattedErrorBody } from '../models';

export class ApiError extends Error {
  public readonly statusCode?: number;
  public readonly code?: string;
  public readonly details?: unknown;
  public readonly cause?: unknown;
  public readonly isOperational?: boolean;

  constructor({
    message,
    statusCode = 500,
    code = 'UNKNOWN_ERROR',
    details,
    cause,
    isOperational = true
  }: ApiErrorOptions) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.cause = cause;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }

  toJSON(): FormattedErrorBody {
    const payload: FormattedErrorBody = {
      status: 'error',
      code: this.code || 'UNKNOWN_ERROR',
      message: this.message
    };

    if (this.details !== undefined) {
      payload.details = this.details;
    }

    if (this.cause !== undefined) {
      payload.cause = this.cause;
    }

    return payload;
  }
}
