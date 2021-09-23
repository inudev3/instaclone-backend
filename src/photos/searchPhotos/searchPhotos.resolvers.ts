import {Resolvers} from "../../types";

const resolvers: Resolvers = {
    Query: {
        searchPhotos: (_, {keyword}, {client}) => client.photo.findMany({
            where: {
                caption: {
                    'mode': 'insensitive',
                    contains: keyword,
                }
            }
        }),

    }
}


export default resolvers;