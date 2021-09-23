import {Resolvers} from "../../types";

const resolvers: Resolvers = {
    Query: {
        seeFollowers: async (_, {username, page}, {client}) => {
            const ok = await client.user.findUnique({where: {username}, select: {id: true}}); //select로 field를 한개만 찾도록 해서 optimization
            if (!ok) {
                return {
                    ok: false,
                    error: "User not found."
                }
            }
            // // 1. look for user and call function followers /
            // const aFollowers = await client.user.findUnique({where: {username}}).followers({take:5, });
            //2. look for followers who has the user in following
            const followers = await client.user.findMany({
                where: {
                    following: {
                        some: {username,},
                    }
                },
                take: 5,
                skip: (page - 1) * 5,
            });

            const totalFollowers = await client.user.count({where: {following: {some: {username}}}});
            return {
                ok: true,
                followers,
                totalPages: Math.ceil(totalFollowers / 5),
            }

        },
    },
};
export default resolvers;
