import {gql} from "apollo-server-express";

export default gql`
    type Mutation{
        followUser(username:String!):followUserResult!
        
    }
    type followUserResult{
        ok:Boolean!
        error: String
    }
`;