import {Resolvers} from "../../types";

const resolvers:Resolvers = {
    Query:{
        seePhotoComments:async (_,{id}, {client, loggedInUser})=>{
            console.log(loggedInUser);
            return await client.comment.findMany({where:{photoId:id}, orderBy:{
                    createdAt:"asc"
                }, include:{user:true, photo:true,}})
        }

    }
}
export default resolvers;