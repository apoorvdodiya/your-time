"use strict";
exports.__esModule = true;
exports.getProfile = exports.addProfileData = exports.validateParams = void 0;
var _ = require("lodash");
var Boom = require("@hapi/boom");
var profile_model_1 = require("../models/profile.model");
exports.validateParams = function (req, res, next) {
    var params = req.body;
    console.log(params);
    if (_.isEmpty(params)) {
        return next(Boom.notFound('missing user id'));
    }
    else if (_.isEmpty(params.first_name)) {
        return next(Boom.notFound('missing first name'));
    }
    else if (_.isEmpty(params.first_name)) {
        return next(Boom.notFound('missing last name'));
    }
    else if (!params.user_id) {
        return next(Boom.notFound('missing user id'));
    }
    return next();
};
exports.addProfileData = function (req, res, next) {
    var profileData = {
        user_id: req.body.user_id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        profile_picture: req.body.profile_picture || ' ',
        background: req.body.background || ' '
    };
    profile_model_1.Profile.create(profileData)
        .then(function (res) {
        req.data = res;
        return next();
    })["catch"](function (err) {
        console.log('Error::', err);
        return next(err);
    });
};
exports.getProfile = function (req, res, next) {
    var params = req.params;
    var whereCondition = {
        where: {
            user_id: req.params.user_id
        }
    };
    profile_model_1.Profile.findOne(whereCondition)
        .then(function (res) {
        req.data = res;
        next();
    })["catch"](function (err) {
        console.log('Error::', err);
        next(err);
    });
};
