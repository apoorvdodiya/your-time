"use strict";
exports.__esModule = true;
exports.validateToken = void 0;
var jwt = require("jsonwebtoken");
var Boom = require("@hapi/boom");
exports.validateToken = function (req, res, next) {
    var authHeader = req.header('authentication');
    if (authHeader) {
        var token = authHeader.split(' ')[1];
        if (token) {
            jwt.verify(token, process.env.SECRET, function (err, res) {
                if (err) {
                    console.log('err ', err);
                    return next(err);
                }
                if (res) {
                    req.data = res;
                    return next();
                }
            });
        }
        else {
            console.log('Error::', 'no token');
            return next(Boom.notFound('No Token Found'));
        }
    }
    else {
        console.log('Error::', 'no token');
        return next(Boom.notFound('No Token Found'));
    }
};
