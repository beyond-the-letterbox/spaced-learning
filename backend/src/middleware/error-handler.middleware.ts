import { NextFunction, Request, Response } from 'express';
import { ApiErrorService } from '../services';

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  const { statusCode, body } = ApiErrorService.format(err);

  console.error({
    time: new Date().toISOString(),
    path: `${req.method} ${req.originalUrl}`,
    message: body.message,
    code: (body as any).code,
    ...((body as any).stack ? { stack: (body as any).stack } : {})
  });

  res.status(statusCode).json(body);
}
