import {protectResolver} from "../users.utils";
import {Resolvers} from "../../types";

const resolvers: Resolvers = {
    Query: {
        seeProfile: protectResolver(async (_, {username, lastId}, {client}) => {
            try {
                const user = await client.user.findUnique({
                        where: {
                            username
                        },
                        include: {
                            following: false,
                            followers: true,
                        } //relation을 로드하려면 include를 적어야함, relation이 헤비한 경우 포함하지 말아야함
                    },
                ); //findUnique just look for @unique field(here it is username)
                if (!user) {
                    throw new Error("there is no such user");
                }
                const photos = await client.photo.findMany({where:{userId:user.id},
                    take: 9,
                    skip: lastId ? 1 : 0,
                    ...(lastId && {cursor: {id: lastId}})})
                return {
                    ...user,
                    photos
                };
            } catch (e) {
                return e;
            }
        })
    },
}
export default resolvers;