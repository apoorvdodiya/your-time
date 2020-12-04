"use strict";
exports.__esModule = true;
exports.deleteActivity = exports.updateActivity = exports.getActivity = exports.addActivityData = exports.validateParams = void 0;
var _ = require("lodash");
var Boom = require("@hapi/boom");
var activity_model_1 = require("../models/activity.model");
exports.validateParams = function (req, res, next) {
    var params = req.body;
    if (_.isEmpty(params)) {
        return next(Boom.notFound('missing user id'));
    }
    else if (_.isEmpty(params.name)) {
        return next(Boom.notFound('missing activity name'));
    }
    else if (!params.limit) {
        return next(Boom.notFound('missing limit'));
    } else if (!params.user_id) {
        return next(Boom.notFound('missing user id'));
    } else if (!params.time) {
        return next(Boom.notFound('missing time'));
    }
    return next();
};
exports.addActivityData = function (req, res, next) {
    var activityData = {
        user_id: req.body.user_id,
        name: req.body.name,
        minutes: 0,
        limit: req.body.limit,
        time: req.body.time
    };
    activity_model_1.Activity.create(activityData)
        .then(function (res) {
        req.data = res;
        return next();
    })["catch"](function (err) {
        console.log('Error::', err);
        return next(err);
    });
};
exports.getActivity = function (req, res, next) {
    var params = req.params;
    var whereCondition = {
        where: {
            user_id: req.params.user_id
        }
    };
    activity_model_1.Activity.findAll(whereCondition)
        .then(function (res) {
        req.data = res;
        next();
    })["catch"](function (err) {
        console.log('Error::', err);
        next(err);
    });
};
exports.updateActivity = function (req, res, next) {
    var params = req.params;
    if (params && !params.activity_id) {
        return next(Boom.notFound('missing activity Id'));
    }
    else if (_.isNull(req.body.minutes)) {
        return next(Boom.notFound('missing parameter: minutes'));
    }
    var activityData = {
        minutes: req.body.minutes
    };
    var whereCondition = {
        where: {
            id: params.activity_id
        }
    };
    activity_model_1.Activity.update(activityData, whereCondition)
        .then(function (res) {
        req.data = {
            message: 'data updated'
        };
        return next();
    })["catch"](function (err) {
        console.log('Error::', err);
        return next(err);
    });
};
exports.deleteActivity = function (req, res, next) {
    var params = req.params;
    var whereCondition = {
        where: {
            id: params.activity_id
        }
    };
    activity_model_1.Activity.destroy(whereCondition)
        .then(function (res) {
        req.data = {
            deleted: res
        };
        return next();
    })["catch"](function (err) {
        console.log('Error::', err);
        return next(err);
    });
};
