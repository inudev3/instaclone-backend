import {Resolvers} from "../types";

const resolvers: Resolvers = {
    Comment: {
        isMine: ({userId}, _, {loggedInUser, client}) => {
            if(!loggedInUser){
                return false;
            }
            return userId === loggedInUser.id
        },
        user:({userId}, _ ,{loggedInUser, client})=> client.user.findUnique({where:{id:userId}}),
        photo:({photoId}, _, {loggedInUser, client})=>client.photo.findUnique({where:{id:photoId}})

    }
}