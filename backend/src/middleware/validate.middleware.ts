import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AnyZodObject } from 'zod';
import { Next } from 'mysql2/typings/mysql/lib/parsers/typeCast';

export default function validate(schema: AnyZodObject): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    const toValidate = {
      params: req.params,
      query: req.query,
      body: req.body,
    }

    const result = schema.safeParse(toValidate);

    if (!result.success) {
      const errors = result.error.flatten();
      res.status(400).json({ errors });
    }

    Object.assign(req, result.data);
    next();
  }
}