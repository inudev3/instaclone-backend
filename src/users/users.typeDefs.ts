import {gql} from "apollo-server-express";

export default gql`
    type User{
        id: Int!
        firsName:String!
        lastName:String
        username: String!
        email: String!
        password:String!
        createdAt: String!
        updatedAt: String!
        bio:String
        avatar:String
        following: [User]
        followers: [User]
        photos(lastId:Int!): [Photo]
        totalFollowing: Int! #computed fields
        totalFollowers: Int! #computed
        #type User can also have resolver 
        isFollowing: Boolean! #computed
        isMe: Boolean! #computed
    }


    #    


`;