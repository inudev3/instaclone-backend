import {protectResolver} from "../users.utils";
import {Resolvers} from "../../types";

const resolvers: Resolvers = {
    Mutation: {
        toggleFollow: protectResolver(async (_, {username}, {loggedInUser, client}) => {
            const ok= await client.user.findFirst({where: {username}});

            if (!ok) {
                return {
                    ok: false,
                    error: "The user does not exist."
                }
            }
            const user = client.user.findFirst({where:{username,followers:{some:{id:loggedInUser.id}}}});
            if(user){
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
            }
            else {
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
            }
        }),

    },
};
export default resolvers;
