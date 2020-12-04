import * as express from 'express';
import * as authService from '../service/auth.service';
import * as profileService from '../service/profile.service';

const profileRouter = express.Router();

profileRouter.post('/', [
  authService.validateToken,
  profileService.validateParams,
  profileService.addProfileData
]);

profileRouter.get('/:user_id', [
  authService.validateToken,
  profileService.getProfile
]);

export { profileRouter };