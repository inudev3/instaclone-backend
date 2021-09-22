import {getUser, protectResolver} from "./users/users.utils";

import express from "express";
import logger from "morgan";
import {graphqlUploadExpress} from "graphql-upload";

require("dotenv").config(); //dotenv는 한번 로드하면 전역임 다른곳에서 import필요 X, process.env에 접근할 수 있음
import {ApolloServer} from "apollo-server-express"; //최신문법
//DB URL은 절대! 노출시키면 안됨!
import {typeDefs, resolvers} from "./schema";
import client from "./client";

const startServer = async () => {
    const server = new ApolloServer({
        resolvers,
        typeDefs,
        context: async ({req}) => {
            return {
                loggedInUser: await getUser(req.headers.token),
                client,

            }
        },

    });
    await server.start();
    const app = express();
    app.use(logger("tiny"));
    app.use(graphqlUploadExpress());
    app.use("/static", express.static("uploads"));
    server.applyMiddleware(({app}));
    const PORT = process.env.PORT;
    app.listen({port: PORT}, () => console.log(`Server is running on http://localhost:${PORT}/graphql`));
};
startServer();