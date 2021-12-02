"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resolvers = {
    Query: {
        seeHashtag: function (_, _a, _b) {
            var hashtag = _a.hashtag;
            var client = _b.client;
            return client.hashtag.findUnique({ where: { hashtag: hashtag } });
        }
    }
};
exports.default = resolvers;
