import {Resolvers} from "../../types";

const resolvers: Resolvers = {
    Query: {
        seeFollowing: async (_, {username, lastId}, {client}) => {
            const ok = await client.user.findUnique({where: {username}, select: {id: true}}); //optimization
            if (!ok) {
                return {
                    ok: false,
                    error: "User not found."
                }
            }

            const following = await client.user.findMany({
                where: {followers: {some: {username}}},
                take: 5,
                skip: lastId ? 1 : 0,
                ...(lastId && {cursor: {id: lastId}})//cursor는 결과물에서 나의 위치이며/ unique field를 가리켜야 하고 여기선 id
            });
            return {
                ok: true,
                following
            }

        }
    }
}
export default resolvers;