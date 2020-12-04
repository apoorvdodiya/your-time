import { IRequest } from "../interfaces/IRequest";
import { NextFunction, Response } from 'express';
import * as Boom from '@hapi/boom';

export const handleSuccess = (req: IRequest, res: Response, next: NextFunction) => {
  if (req.data === undefined) {
    console.log('Return from undefined req.session.data ');
    return next();
  }
  const resObject: any = req.data || [];
  return res.json(resObject);
}

export const handleError = (err: any, req: IRequest, res: Response, next: NextFunction) => {
  if (!err) {
    return next();
  }
  let errorResponse = {};
  if (err.output && err.output.payload) {
    errorResponse = {
      stack: err.stack,
      error: err.output.payload.message,
      message: err.output.payload.error,
      statusCode: err.output.payload.statusCode || 404
    };
  } else {
    errorResponse = {
      stack: err.stack,
      error: err.error || err.type || err.message,
      message: err.message,
      statusCode: err.statusCode || 404
    };
  }

  res.status(err.statusCode ? err.statusCode : err.statusCode || 404).json(errorResponse);
  res.end();
}

export const handle404 = (req: IRequest, res: Response, next: NextFunction) => {
  return next(Boom.notFound('' + req.method + ': Invalid request ' + req.url));
}

export const urlLogger = (req: IRequest, res: Response, next: NextFunction) => {
  console.log('Logger: ', req.url);
  next();
}

export const handleOptionRequest = (req: IRequest, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end();
  }
}