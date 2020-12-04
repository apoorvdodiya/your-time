"use strict";
exports.__esModule = true;
exports.testRouter = void 0;
var express = require("express");
var testRouter = express.Router();
exports.testRouter = testRouter;
testRouter.get('/', function (req, res, next) {
    res.json({
        message: 'API is UP'
    });
});
