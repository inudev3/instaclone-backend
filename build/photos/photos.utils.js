"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processHashtag = void 0;
var processHashtag = function (caption) {
    if (caption) {
        var hashtags = caption.match(/#[\w]+/g);
        return hashtags === null || hashtags === void 0 ? void 0 : hashtags.map(function (hashtag) { return ({ where: { hashtag: hashtag }, create: { hashtag: hashtag } }); });
    }
};
exports.processHashtag = processHashtag;
