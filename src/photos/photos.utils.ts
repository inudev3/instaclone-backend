export const processHashtag = (caption) => {
    if (caption) {
        const hashtags = caption.match(/#[\w]+/g);
        return hashtags?.map(hashtag => ({where: {hashtag}, create: {hashtag}}));
    }
}