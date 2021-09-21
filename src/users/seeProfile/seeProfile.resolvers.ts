import {Resolvers} from "../../types";
import {protectResolver} from "../users.utils";

const resolvers: Resolvers = {
    Query: {
        seeProfile: protectResolver(async (_, {username}, {client}) => {
            try {
                const user = await client.user.findUnique({where: {username}}); //findUnique just look for @unique field(here it is username)
                if (!user) {
                    throw new Error("there is no such user");
                }
                return user;
            } catch (e) {
                return e;
            }
        })
    },
}
export default resolvers;