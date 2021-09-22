import {protectResolver} from "../users.utils";
import {Resolvers} from "../../types";

const resolvers: Resolvers = {
    Mutation: {
        followUser: protectResolver(async (_, {username}, {loggedInUser, client}) => {
            const ok = await client.user.findUnique({where: {username}});
            if (!ok) {
                return {
                    ok: false,
                    error: "The user does not exist."
                }
            }
            await client.user.update({
                where: {
                    id: loggedInUser.id,
                },
                data: {
                    following: {
                        connect: {
                            username,
                        },
                    },
                },
            });
            return {
                ok: true,
            };
        }),

    },
};
export default resolvers;
