import * as express from 'express';
import * as userService from '../service/user.service';
import * as authService from '../service/auth.service';
import * as profileService from '../service/profile.service';

const userRouter = express.Router();

userRouter.post('/register', [
  userService.validateParams,
  userService.registerUser,
  userService.generateToken
]);

userRouter.get('/', [
  userService.getAllUsers
]);

userRouter.get('/:id', [
  userService.getUser
]);

userRouter.post('/login', [
  userService.validateParams,
  userService.getUserByUsernameAndPassword,
  userService.generateToken
]);

export { userRouter };