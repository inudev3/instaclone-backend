import {Resolvers} from "../../types";
import {protectResolver} from "../../users/users.utils";

const resolvers: Resolvers = {
    Query: {
        seeFeed: protectResolver(async (_, {lastId, userId}, {
            loggedInUser,
            client
        }) => {
            if(userId){
                return await client.photo.findMany({
                    where:{userId}
                    , orderBy: {createdAt: "desc"},
                    take: lastId? 2: 9,
                    skip: lastId ? 1 : 0,
                    ...(lastId && {cursor: {id: lastId}})
                })
            }
            return await client.photo.findMany({
                    where:
                        {
                            OR: [
                                {user: {followers: {some: {id: loggedInUser.id}}}},
                                {userId: loggedInUser.id}]
                        }
                    , orderBy: {createdAt: "desc"},
                    take: lastId? 2: 9,
                    skip: lastId ? 1 : 0,
                    ...(lastId && {cursor: {id: lastId}})
                })
            }

        ),

    },

}

export default resolvers;