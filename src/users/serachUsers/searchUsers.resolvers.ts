import {Resolvers} from "../../types";

const resolvers: Resolvers = {
    Query: {
        searchUsers: async (_, {keyword, lastId}, {client}) => {
            const found = await client.user.findMany({
                where: {
                    username: {
                        "mode": "insensitive",
                        startsWith: keyword,
                    }
                },
                take: 5,
                skip: lastId ? 1 : 0,
                ...(lastId && {cursor: {id: lastId}})
            });
            console.log(found);
            return found;
        }

    }
}

export default resolvers;