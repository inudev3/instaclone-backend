"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resolvers = {
    Query: {
        searchPhotos: function (_, _a, _b) {
            var keyword = _a.keyword;
            var client = _b.client;
            return client.photo.findMany({
                where: {
                    caption: {
                        'mode': 'insensitive',
                        contains: keyword,
                    }
                }
            });
        },
    }
};
exports.default = resolvers;
