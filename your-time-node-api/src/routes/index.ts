import * as express from 'express';
import { profileRouter } from './profile.routes';
import { testRouter } from './test.routes';
import { userRouter } from './users.routes';
import { activityRouter } from './activity.routes';

const router = express.Router();

router.use('/api', [testRouter]);
router.use('/api/user', [userRouter]);
router.use('/api/profile', [profileRouter]);
router.use('/api/activity', [activityRouter]);

export { router };