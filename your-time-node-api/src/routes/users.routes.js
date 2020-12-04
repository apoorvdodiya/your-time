"use strict";
exports.__esModule = true;
exports.userRouter = void 0;
var express = require("express");
var userService = require("../service/user.service");
var userRouter = express.Router();
exports.userRouter = userRouter;
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
