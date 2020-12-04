import * as express from 'express';
import * as authService from '../service/auth.service';
import * as activityService from '../service/activity.service';

const activityRouter = express.Router();

/**
 * Create Activity
 */
activityRouter.post('/', [
  authService.validateToken,
  activityService.validateParams,
  activityService.addActivityData
]);

/**
 * Create User's Activity
 */
activityRouter.get('/:user_id', [
  authService.validateToken,
  activityService.getActivity
]);

/**
 * Update Activity by Id
 */
activityRouter.put('/:activity_id', [
  authService.validateToken,
  activityService.updateActivity
]);

/**
 * Delete Activity
 */
activityRouter.delete('/:activity_id', [
  authService.validateToken,
  activityService.deleteActivity
]);

export { activityRouter };