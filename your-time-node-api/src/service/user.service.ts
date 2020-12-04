import { NextFunction, Request, Response } from 'express';
import { IRequest } from '../interfaces/IRequest';
import * as _ from 'lodash';
import { IUser } from '../interfaces/IUser';
import { User } from '../models/user.model';
import * as Boom from '@hapi/boom';
import * as jwt from 'jsonwebtoken';

export const validateParams = (req: IRequest, res: Response, next: NextFunction) => {
  const params: IUser = req.body;
  if (_.isEmpty(params)) {
    return next(Boom.notFound('missing user data'));
  } else if (_.isEmpty(params.email)) {
    return next(Boom.notFound('missing email'));
  } else if (_.isEmpty(params.password)) {
    return next(Boom.notFound('missing password'));
  }
  return next();
}

export const registerUser = (req: IRequest, res: Response, next: NextFunction) => {
  const userData = {
    email: req.body.email,
    password: req.body.password
  };
  User.create(userData)
    .then(res => {
      req.data = res;
      return next();
    })
    .catch(err => {
      console.log('Error::', err);
      return next(err);
    });
}

export const getAllUsers = (req: IRequest, res: Response, next: NextFunction) => {
  User.findAll()
    .then(res => {
      req.data = res;
      return next();
    })
    .catch(err => {
      console.log('Error::', err);
      return next(err);
    });
}

export const getUser = (req: IRequest, res: Response, next: NextFunction) => {
  if (_.isEmpty(req.params)) {
    return next(Boom.notFound('please provide id'));
  }
  const userData = {
    id: req.params.id
  };
  const whereComdition = {
    where: userData
  }
  User.findOne(whereComdition)
    .then(res => {
      req.data = res;
      return next();
    })
    .catch(err => {
      console.log('Error::', err);
      return next(err);
    })
}

export const getUserByUsernameAndPassword = (req: IRequest, res: Response, next: NextFunction) => {
  const userData = {
    email: req.body.email,
    password: req.body.password
  };
  const whereCondition = {
    where: userData
  };
  User.findOne(whereCondition)
    .then(res => {
      req.data = res;
      return next();
    })
    .catch(err => {
      console.log('Error::', err);
      return next(err);
    })
}

export const generateToken = (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const token = jwt.sign({ user: req.body.email }, process.env.SECRET);
    req.data.dataValues.token = token;
    return next();
  } catch (err) {
    console.log('Error::', err);
    return next(err);
  }
}
