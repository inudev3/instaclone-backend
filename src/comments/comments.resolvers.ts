import {Resolvers} from "../types";

const resolvers: Resolvers = {
    Comment: {
        isMine: ({userId}, _, {loggedInUser, client}) => {
            if (!loggedInUser) return false;
            return userId === loggedInUser.id;
        }
    }
}