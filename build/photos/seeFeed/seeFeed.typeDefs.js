"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
exports.default = (0, apollo_server_express_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    type Query{\n        seeFeed(lastId:Int, userId:Int):[Photo] #\uB0B4 \uD314\uB85C\uC789 \uBAA9\uB85D\uC5D0 \uC788\uB294 \uC0AC\uB78C\uB4E4\uC758 photo\uB97C \uC870\uD68C\n    }\n   \n"], ["\n    type Query{\n        seeFeed(lastId:Int, userId:Int):[Photo] #\uB0B4 \uD314\uB85C\uC789 \uBAA9\uB85D\uC5D0 \uC788\uB294 \uC0AC\uB78C\uB4E4\uC758 photo\uB97C \uC870\uD68C\n    }\n   \n"])));
var templateObject_1;
