"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resolvers = {
    Comment: {
        isMine: function (_a, _, _b) {
            var userId = _a.userId;
            var loggedInUser = _b.loggedInUser, client = _b.client;
            if (!loggedInUser) {
                return false;
            }
            return userId === loggedInUser.id;
        },
        user: function (_a, _, _b) {
            var userId = _a.userId;
            var loggedInUser = _b.loggedInUser, client = _b.client;
            return client.user.findUnique({ where: { id: userId } });
        },
        photo: function (_a, _, _b) {
            var photoId = _a.photoId;
            var loggedInUser = _b.loggedInUser, client = _b.client;
            return client.photo.findUnique({ where: { id: photoId } });
        }
    }
};
exports.default = resolvers;
