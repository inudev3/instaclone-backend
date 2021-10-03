import {Resolvers} from "../../types";
import {protectResolver} from "../../users/users.utils";
import {processHashtag} from "../photos.utils";
import {uploadS3} from "../../shared/shared.utils";

const resolvers: Resolvers = {
    Mutation: {
        uploadPhoto: protectResolver(async (_, {file, caption}, {loggedInUser, client}) => {
            let hashtagObj = [];
            if (caption) {
                hashtagObj = processHashtag(caption);
            }
            const fileUrl = await uploadS3(file, loggedInUser.id, "uploads");
            return client.photo.create({
                data: {
                    file: fileUrl,
                    caption,
                    user: {
                        connect: {id: loggedInUser.id}
                    },
                    ...(hashtagObj?.length > 0 && {
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