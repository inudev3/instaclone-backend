"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var users_utils_1 = require("../users.utils");
var resolvers = {
    Query: {
        me: (0, users_utils_1.protectResolver)(function (_, __, _a) {
            var client = _a.client, loggedInUser = _a.loggedInUser;
            return client.user.findUnique({ where: { id: loggedInUser.id } });
        })
    }
};
exports.default = resolvers;
