import { NextFunction, Request, Response } from 'express';
import { IRequest } from '../interfaces/IRequest';
import * as _ from 'lodash';
import * as jwt from 'jsonwebtoken';
import * as Boom from '@hapi/boom';

export const validateToken = (req: IRequest, res: Response, next: NextFunction) => {
  const authHeader: string = req.header('authentication');
  if (authHeader) {
    const token = authHeader.split(' ')[1]; 
    if (token) {
      jwt.verify(token, process.env.SECRET, (err, res) => {
        if (err) {
          console.log('err ', err);
          return next(err);
        }
        if (res) {
          req.data = res;
          return next();
        }
      });
    } else {
      console.log('Error::', 'no token');
      return next(Boom.notFound('No Token Found'));
    }
  } else {
    console.log('Error::', 'no token');
    return next(Boom.notFound('No Token Found'));
  }
}