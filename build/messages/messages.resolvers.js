"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resolvers = {
    Room: {
        users: function (_a, _, _b) {
            var id = _a.id;
            var client = _b.client;
            return client.room.findUnique({ where: { id: id } }).users();
        },
        messages: function (_a, _, _b) {
            var id = _a.id;
            var client = _b.client;
            return client.message.findMany({ where: { roomId: id }, orderBy: { createdAt: "asc" } });
        },
        unreadTotal: function (_a, _, _b) {
            var id = _a.id;
            var loggedInUser = _b.loggedInUser, client = _b.client;
            if (!loggedInUser)
                return 0;
            return client.message.count({ where: { read: false, roomId: id, userId: { not: loggedInUser.id } } });
        }
    },
    Message: {
        user: function (_a, _, _b) {
            var id = _a.id;
            var client = _b.client;
            return client.message.findUnique({ where: { id: id } }).user();
        }
    }
};
exports.default = resolvers;
