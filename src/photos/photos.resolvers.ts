import {Resolvers} from "../types";

const resolvers: Resolvers = {
    Photo: {
        user: ({userId}, _, {client}) => client.user.findUnique({where: {id: userId}}),
        //userId는 schema에는 없지만 db에는 있음
        hashtags: ({id}, _, {client}) => client.hashtag.findMany({where: {photos: {some: {id}}}}),

    },
    Hashtag: {
        photos: ({id}, {lastId}, {client}) => client.photo.findMany({
            where: {hashtags: {some: {id}}},
            take: 5,
            skip: lastId ? 1 : 0,
            ...(lastId && {cursor: {id: lastId}}) //computed fields도 args를 가질 수 있다.
        }),
        totalPhotos: ({id}, _, {client}) => client.photo.count({where: {hashtags: {some: {id}}}}),
    }
}
export default resolvers;