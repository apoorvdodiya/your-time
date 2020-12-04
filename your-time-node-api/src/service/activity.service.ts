import { NextFunction, Request, Response } from 'express';
import { IRequest } from '../interfaces/IRequest';
import * as _ from 'lodash';
import * as Boom from '@hapi/boom';
import { IActivity } from '../interfaces/IActivity';
import { Activity } from '../models/activity.model';

export const validateParams = (req: IRequest, res: Response, next: NextFunction) => {
  const params: Partial<IActivity> = req.body;
  if (_.isEmpty(params)) {
    return next(Boom.notFound('missing user id'));
  } else if (_.isEmpty(params.name)) {
    return next(Boom.notFound('missing activity name'));
  } else if (!params.limit) {
    return next(Boom.notFound('missing limit'));
  } else if (!params.user_id) {
    return next(Boom.notFound('missing user id'));
  }
  return next();
}

export const addActivityData = (req: IRequest, res: Response, next: NextFunction) => {
  const activityData: Partial<IActivity> = {
    user_id: req.body.user_id,
    name: req.body.name,
    minutes: 0,
    limit: req.body.limit,
    time: req.body.time
  };
  Activity.create(activityData)
    .then(res => {
      req.data = res;
      return next();
    })
    .catch(err => {
      console.log('Error::', err);
      return next(err);
    });
};

export const getActivity = (req: IRequest, res: Response, next: NextFunction) => {
  const params = req.params;
  const whereCondition = {
    where: {
      user_id: req.params.user_id
    }
  };
  Activity.findAll(whereCondition)
    .then(res => {
      req.data = res;
      next();
    })
    .catch(err => {
      console.log('Error::', err);
      next(err);
    });
};

export const updateActivity = (req: IRequest, res: Response, next: NextFunction) => {
  const params = req.params;
  if (params && !params.activity_id) {
    return next(Boom.notFound('missing activity Id'));
  } else if (_.isNull(req.body.minutes)) {
    return next(Boom.notFound('missing parameter: minutes'));
  }
  const activityData: Partial<IActivity> = {
    minutes: req.body.minutes,
  };
  const whereCondition = {
    where: {
      id: params.activity_id
    }
  };
  Activity.update(activityData, whereCondition)
    .then(res => {
      req.data = {
        message: 'data updated'
      };
      return next();
    })
    .catch(err => {
      console.log('Error::', err);
      return next(err);
    });
};

export const deleteActivity = (req: IRequest, res: Response, next: NextFunction) => {
  const params = req.params;
  const whereCondition = {
    where: {
      id: params.activity_id
    }
  };
  Activity.destroy(whereCondition)
    .then(res => {
      req.data = {
        deleted: res
      };
      return next();
    })
    .catch(err => {
      console.log('Error::', err);
      return next(err);
    })
};