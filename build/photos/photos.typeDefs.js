"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var apollo_server_express_1 = require("apollo-server-express");
exports.default = (0, apollo_server_express_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    type Photo{\n        id: Int!\n        user: User! #user\uB294 graphQL\uC5D0\uC11C \uD544\uC694, userId\uB294 db\uC5D0\uC11C \uD544\uC694\n        createdAt: String!\n        updatedAt: String!\n        caption:String\n        file:String!\n        hashtags:[Hashtag]\n        likes: Int!\n        isMine:Boolean!\n        isLiked:Boolean!\n        comments:[Comment]\n        commentNumber: Int!\n    }\n    type Hashtag{\n        id: Int!\n        hashtag: String!\n        photos(lastId:Int!): [Photo] #type\uC5D0\uC11C args\uB97C \uC815\uC758\uD574\uC11C computed fields\uC5D0 \uC4F4\uB2E4\n        createdAt: String!\n        updatedAt: String!\n        totalPhotos: Int!\n    }\n    type Like{\n        id: Int!\n        photo: Photo!\n        user: User!\n        createdAt: String!\n        updatedAt: String!\n    }\n\n"], ["\n    type Photo{\n        id: Int!\n        user: User! #user\uB294 graphQL\uC5D0\uC11C \uD544\uC694, userId\uB294 db\uC5D0\uC11C \uD544\uC694\n        createdAt: String!\n        updatedAt: String!\n        caption:String\n        file:String!\n        hashtags:[Hashtag]\n        likes: Int!\n        isMine:Boolean!\n        isLiked:Boolean!\n        comments:[Comment]\n        commentNumber: Int!\n    }\n    type Hashtag{\n        id: Int!\n        hashtag: String!\n        photos(lastId:Int!): [Photo] #type\uC5D0\uC11C args\uB97C \uC815\uC758\uD574\uC11C computed fields\uC5D0 \uC4F4\uB2E4\n        createdAt: String!\n        updatedAt: String!\n        totalPhotos: Int!\n    }\n    type Like{\n        id: Int!\n        photo: Photo!\n        user: User!\n        createdAt: String!\n        updatedAt: String!\n    }\n\n"]))); //의존성이 높으면 같은 module안에 둬라
var templateObject_1;