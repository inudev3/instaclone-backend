import {Resolvers} from "../../types";
import {protectResolver} from "../../users/users.utils";
import {processHashtag} from "../photos.utils";

const resolvers: Resolvers = {
    Mutation: {
        uploadPhoto: protectResolver(async (_, {file, caption}, {loggedInUser, client}) => {
            const hashtagObj = processHashtag(caption);
            return client.photo.create({
                data: {
                    file,
                    caption,
                    user: {
                        connect: {id: loggedInUser.id}
                    },
                    ...(hashtagObj.length > 0 && {
                        hashtags: {
                            connectOrCreate: hashtagObj
                        }
                    })
                }
            })

        })
    }
    //save the photo with the parsed hashtags
    //add the photo to the hashtags
}

export default resolvers;