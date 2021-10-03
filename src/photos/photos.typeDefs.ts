import {gql} from "apollo-server-express";

export default gql`
    type Photo{
        id: Int!
        user: User! #user는 graphQL에서 필요, userId는 db에서 필요
        createdAt: String!
        updatedAt: String!
        caption:String
        file:String!
        hashtags:[Hashtag]
        likes: Int!
        isMine:Boolean!
        isLiked:Boolean!
        comments:[Comment]
        commentNumber: Int!
    }
    type Hashtag{
        id: Int!
        hashtag: String!
        photos(lastId:Int!): [Photo] #type에서 args를 정의해서 computed fields에 쓴다
        createdAt: String!
        updatedAt: String!
        totalPhotos: Int!
    }
    type Like{
        id: Int!
        photo: Photo!
        user: User!
        createdAt: String!
        updatedAt: String!
    }

`; //의존성이 높으면 같은 module안에 둬라