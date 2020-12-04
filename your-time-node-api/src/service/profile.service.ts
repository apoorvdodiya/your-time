import { NextFunction, Request, Response } from 'express';
import { IRequest } from '../interfaces/IRequest';
import * as _ from 'lodash';
import * as Boom from '@hapi/boom';
import { IProfile } from '../interfaces/IProfile';
import { Profile } from '../models/profile.model';

export const validateParams = (req: IRequest, res: Response, next: NextFunction) => {
  const params: IProfile = req.body;
  console.log(params);
  if (_.isEmpty(params)) {
    return next(Boom.notFound('missing user id'));
  } else if (_.isEmpty(params.first_name)) {
    return next(Boom.notFound('missing first name'));
  } else if (_.isEmpty(params.first_name)) {
    return next(Boom.notFound('missing last name'));
  } else if (!params.user_id) {
    return next(Boom.notFound('missing user id'));
  }
  return next();
}

export const addProfileData = (req: IRequest, res: Response, next: NextFunction) => {
  const profileData: Partial<IProfile> = {
    user_id: req.body.user_id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    profile_picture: req.body.profile_picture || ' ',
    background: req.body.background || ' '
  };
  Profile.create(profileData)
    .then(res => {
      req.data = res;
      return next();
    })
    .catch(err => {
      console.log('Error::', err);
      return next(err);
    })
}

export const getProfile = (req: IRequest, res: Response, next: NextFunction) => {
  const params = req.params;
  const whereCondition = {
    where: {
      user_id: req.params.user_id
    }
  };
  Profile.findOne(whereCondition)
    .then(res => {
      req.data = res;
      next();
    })
    .catch(err => {
      console.log('Error::', err);
      next(err);
    })
}