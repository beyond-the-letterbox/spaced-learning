import { FormattedApiError, FormattedErrorBody } from '../models';
import { ApiError } from '../utils';


export class ApiErrorService {
  public static format(error: unknown): FormattedApiError {
    let statusCode = 500;
    let body: FormattedErrorBody = {
      status: 'error',
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred.'
    };

    if (error instanceof ApiError) {
      statusCode = error.statusCode || 500;
      body = error.toJSON();
    } else if (error instanceof Error) {
      body = { ...body, message: error.message };
    }

    if (process.env.NODE_ENV === 'development' && error instanceof Error) {
      body = { ...body, stack: error.stack };
    }

    return { statusCode, body };
  }
}
