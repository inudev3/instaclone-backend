import {Resolvers} from "../../types";
import {protectResolver} from "../../users/users.utils";
import {processHashtag} from "../photos.utils";

const resolvers: Resolvers = {
    Mutation: {
        editPhoto: protectResolver(async (_, {id, caption}, {loggedInUser, client}) => {


            const oldPhoto = await client.photo.findFirst({
                where: {id, userId: loggedInUser.id},
                include: {hashtags: {select: {hashtag: true}}}
            }); //unique하지 않은 필드로 탐색할 때는 findFirst를 써야함

            if (!oldPhoto) {
                return {
                    ok: false,
                    error: "Photo not found."
                }
            }
            const photo = await client.photo.update({
                    where: {id}, data: {
                        caption,
                        ...(caption && {
                            hashtags: {
                                disconnect: oldPhoto.hashtags,
                                connectOrCreate: processHashtag(caption),
                            }
                        })
                    }
                }
            )
            console.log(photo);
            return {
                ok: true,

            }
        }),
    }
}
export default resolvers;