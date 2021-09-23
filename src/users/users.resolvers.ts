import {Resolvers} from "../types";
import {protectResolver} from "./users.utils";

const resolvers: Resolvers = {
    User: { //resolver for computed fields
        totalFollowing: async ({id}, _, {client}) => await client.user.count({where: {followers: {some: {id}}}}),//root is the Object holding this resolver
        totalFollowers: async ({id}, _, {client}) => await client.user.count({where: {following: {some: {id}}}}),
        isFollowing: async ({id}, __, {loggedInUser, client}) => {
            if (!loggedInUser) return false;
            const exists = await client.user.count({
                where: {
                    username: loggedInUser.username,
                    following: {
                        some: {id}
                    }
                }
            });
            return Boolean(exists);
        },
        isMe: ({id}, _, {loggedInUser, client}) => id === loggedInUser?.id,
        photos: ({id}, {lastId}, {client}) => client.photo.findMany({
            where: {userId: id},
            take: 9,
            skip: lastId ? 1 : 0, ...(lastId && {cursor: {id: lastId}})
        }),

    }
}
export default resolvers;