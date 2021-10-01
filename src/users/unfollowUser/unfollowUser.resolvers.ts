import {Resolvers} from "../../types";
import {protectResolver} from "../users.utils";

const resolvers: Resolvers = {
    Mutation: {
        unfollowUser: protectResolver(async (_, {username}, {loggedInUser, client}) => {
            try {
                await client.user.update({
                    where: {id: loggedInUser.id},
                    data: {
                        following: {
                            disconnect: {
                                username
                            }
                        }
                    }
                });
                return {
                    ok: true,
                }
            } catch (error) {
                return {
                    ok: false,
                    error: "You need to follow user first to unfollow the user",
                }
            }
        })
    }

}
export default resolvers;