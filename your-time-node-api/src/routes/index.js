"use strict";
exports.__esModule = true;
exports.router = void 0;
var express = require("express");
var profile_routes_1 = require("./profile.routes");
var test_routes_1 = require("./test.routes");
var users_routes_1 = require("./users.routes");
var activity_routes_1 = require("./activity.routes");
var router = express.Router();
exports.router = router;
router.use('/api', [test_routes_1.testRouter]);
router.use('/api/user', [users_routes_1.userRouter]);
router.use('/api/profile', [profile_routes_1.profileRouter]);
router.use('/api/activity', [activity_routes_1.activityRouter]);
