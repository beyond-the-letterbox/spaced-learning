import { Response } from 'express';
import { AuthenticatedRequest } from '../models';

export abstract class BaseController {
  protected extractAuthenticatedUserId(req: AuthenticatedRequest, res: Response) {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: 'User not authenticated' });
      return null;
    }

    return userId;
  }

  protected getValidatedParameterValue(
    req: AuthenticatedRequest,
    res: Response,
    paramName: string = 'id'
  ): number | null {
    const id = parseInt(req.params[paramName], 10);

    if (isNaN(id)) {
      res.status(400).json({ error: `Invalid ${paramName}` });
      return null;
    }

    return id;
  }
}
