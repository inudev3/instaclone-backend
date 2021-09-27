import {Resolvers} from "../../types";
import {withFilter} from "graphql-subscriptions";
import pubsub from "../../pubsub";
import NEW_MESSAGE from "../../constants";

const resolvers: Resolvers = {
    Subscription: {
        roomUpdates: {
            subscribe: async (root, {id}, {loggedInUser, client}, info) => {
                const room = await client.room.findFirst({
                    where: {
                        id,
                        users: {
                            some: {id: loggedInUser.id}
                        }
                    },
                    select: {id: true}
                })
                if (!room) {
                    throw new Error("You shall not see this");
                }
                return withFilter(() => pubsub.asyncIterator(NEW_MESSAGE), async ({roomUpdates}, {id}, {
                    loggedInUser,
                    client
                }) => {
                    if (roomUpdates.roomId === id) {
                        const room = await client.room.findFirst({
                            where: {
                                id,
                                users: {some: {id: loggedInUser.id}}
                            },
                            select: {id: true}
                        });
                        if (!room) {
                            return false
                        }
                        return true;
                    }
                })(root, {id}, {loggedInUser, client}, info);
            }
        }
    }
}
export default resolvers;