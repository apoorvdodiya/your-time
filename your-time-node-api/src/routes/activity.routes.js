"use strict";
exports.__esModule = true;
exports.activityRouter = void 0;
var express = require("express");
var authService = require("../service/auth.service");
var activityService = require("../service/activity.service");
var activityRouter = express.Router();
exports.activityRouter = activityRouter;
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
activityRouter["delete"]('/:activity_id', [
    authService.validateToken,
    activityService.deleteActivity
]);
