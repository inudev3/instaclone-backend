import {Resolvers} from "../../types";

const resolvers: Resolvers = {
    Query: {
        seePhotoLikes: async (_, {id}, {client}) => await client.user.findMany({where: {likes: {some: {photoId: id}}}})
        //     await client.user.findMany({
        //     where: {likes: {some: {photoId: id}}},
        //     select: {username: true}
        // }),

    }
}

export default resolvers;