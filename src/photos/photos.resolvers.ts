import {Resolvers} from "../types";

const resolvers: Resolvers = {
    Photo: {
        user: ({userId}, _, {client}) => client.user.findUnique({where: {id: userId}}),
        //userId는 schema에는 없지만 db에는 있음
        hashtags: ({id}, _, {client}) => client.photo.findUnique({where: {id}}).hashtags(),
        likes: ({id}, _, {client}) => client.like.count({where: {photoId: id}}),
        comments: ({id}, _, {client}) => client.comment.findMany({where: {photoId: id}, include: {user: true}}),
        commentNumber: ({id}, _, {client}) => client.comment.count({where: {photoId: id}}),
        isMine: ({userId}, _, {client, loggedInUser}) => {
            if (!loggedInUser) {
                return false;
            }
            return userId === loggedInUser.id;
        },
        isLiked: async ({id}, _, {client, loggedInUser}) => {
            if (!loggedInUser) {
                return false;
            }
            const ok = await client.like.findUnique({
                where:{
                    photoId_userId: {
                        photoId:id,
                        userId:loggedInUser.id
                    }
                },
                select:{id:true}
            })
            if (ok) {

                return true
            }
            return false;
        }

    },
    Hashtag: {
        photos: ({id}, {lastId}, {client}) => client.photo.findMany({
            where: {hashtags: {some: {id}}},
            take: 5,
            skip: lastId ? 1 : 0,
            ...(lastId && {cursor: {id: lastId}}) //computed fields도 args를 가질 수 있다.
        }),
        totalPhotos: ({id}, _, {client}) => client.photo.count({where: {hashtags: {some: {id}}}}),
    }
}
export default resolvers;