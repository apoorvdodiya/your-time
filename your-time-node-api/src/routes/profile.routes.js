"use strict";
exports.__esModule = true;
exports.profileRouter = void 0;
var express = require("express");
var authService = require("../service/auth.service");
var profileService = require("../service/profile.service");
var profileRouter = express.Router();
exports.profileRouter = profileRouter;
profileRouter.post('/', [
    authService.validateToken,
    profileService.validateParams,
    profileService.addProfileData
]);
profileRouter.get('/:user_id', [
    authService.validateToken,
    profileService.getProfile
]);
