import { Response } from 'express';
import { AuthenticatedRequest } from '../models';
import { ApiError } from '../errors';

export abstract class BaseController {
  protected extractAuthenticatedUserId(req: AuthenticatedRequest, res: Response): number  {
    const userId = req.user?.id;

    if (!userId) {
      throw new ApiError({
        message: 'User not authenticated',
        code: 'UNAUTHORIZED',
        statusCode: 401,
        details: { userId }
      });
    }

    return userId;
  }

  protected getValidatedParameterValue(
    req: AuthenticatedRequest,
    res: Response,
    paramName: string = 'id'
  ): number {
    const id = parseInt(req.params[paramName], 10);

    if (isNaN(id)) {
      throw new ApiError({
        message: `Invalid ${paramName}`,
        code: 'INVALID_INPUT',
        statusCode: 400,
        details: { paramName, id }
      });
    }

    return id;
  }
}
