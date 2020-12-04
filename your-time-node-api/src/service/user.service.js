"use strict";
exports.__esModule = true;
exports.generateToken = exports.getUserByUsernameAndPassword = exports.getUser = exports.getAllUsers = exports.registerUser = exports.validateParams = void 0;
var _ = require("lodash");
var user_model_1 = require("../models/user.model");
var Boom = require("@hapi/boom");
var jwt = require("jsonwebtoken");
exports.validateParams = function (req, res, next) {
    var params = req.body;
    if (_.isEmpty(params)) {
        return next(Boom.notFound('missing user data'));
    }
    else if (_.isEmpty(params.email)) {
        return next(Boom.notFound('missing email'));
    }
    else if (_.isEmpty(params.password)) {
        return next(Boom.notFound('missing password'));
    }
    return next();
};
exports.registerUser = function (req, res, next) {
    var userData = {
        email: req.body.email,
        password: req.body.password
    };
    user_model_1.User.create(userData)
        .then(function (res) {
        req.data = res;
        return next();
    })["catch"](function (err) {
        console.log('Error::', err);
        return next(err);
    });
};
exports.getAllUsers = function (req, res, next) {
    user_model_1.User.findAll()
        .then(function (res) {
        req.data = res;
        return next();
    })["catch"](function (err) {
        console.log('Error::', err);
        return next(err);
    });
};
exports.getUser = function (req, res, next) {
    if (_.isEmpty(req.params)) {
        return next(Boom.notFound('please provide id'));
    }
    var userData = {
        id: req.params.id
    };
    var whereComdition = {
        where: userData
    };
    user_model_1.User.findOne(whereComdition)
        .then(function (res) {
        req.data = res;
        return next();
    })["catch"](function (err) {
        console.log('Error::', err);
        return next(err);
    });
};
exports.getUserByUsernameAndPassword = function (req, res, next) {
    var userData = {
        email: req.body.email,
        password: req.body.password
    };
    var whereCondition = {
        where: userData
    };
    user_model_1.User.findOne(whereCondition)
        .then(function (res) {
        req.data = res;
        return next();
    })["catch"](function (err) {
        console.log('Error::', err);
        return next(err);
    });
};
exports.generateToken = function (req, res, next) {
    try {
        var token = jwt.sign({ user: req.body.email }, process.env.SECRET);
        req.data.dataValues.token = token;
        return next();
    }
    catch (err) {
        console.log('Error::', err);
        return next(err);
    }
};
