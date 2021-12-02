"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
exports.default = (0, apollo_server_express_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    type editPhotoResult{\n        ok:Boolean!\n        error:String\n    }\n    type Mutation{\n        editPhoto(caption:String, id:Int!):editPhotoResult!\n    }\n"], ["\n    type editPhotoResult{\n        ok:Boolean!\n        error:String\n    }\n    type Mutation{\n        editPhoto(caption:String, id:Int!):editPhotoResult!\n    }\n"])));
var templateObject_1;
