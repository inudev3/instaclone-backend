require("dotenv").config(); //dotenv는 한번 로드하면 전역임 다른곳에서 import필요 X, process.env에 접근할 수 있음
import {getUser, protectResolver} from "./users/users.utils";

import express from "express";
import logger from "morgan";
import {graphqlUploadExpress} from "graphql-upload";
import {SubscriptionServer} from "subscriptions-transport-ws";
import {execute, subscribe} from "graphql";
import {makeExecutableSchema} from "@graphql-tools/schema";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import {ApolloServer} from "apollo-server-express"; //최신문법
//DB URL은 절대! 노출시키면 안됨!
import {typeDefs, resolvers} from "./schema";
import client from "./client";
import * as http from "http";


const schema = makeExecutableSchema({typeDefs, resolvers});
const startServer = async () => {
        const server = new ApolloServer({
            schema,

            context: async ({req}) => {
                return {
                    loggedInUser: await getUser(req.headers.token),
                    client,

                }
            },
            plugins: [
                {
                    async serverWillStart() {
                        return {
                            async drainServer() {
                                subscriptionServer.close();
                            },
                        };
                    },
                },
            ],
        });
        await server.start();
        const app = express();
        app.use(logger("tiny"));
        app.use(graphqlUploadExpress());
        app.use("/static", express.static("uploads"));
        server.applyMiddleware(({app}));
        const httpServer = http.createServer(app);
        const subscriptionServer = SubscriptionServer.create(
                {
                    schema,
                    execute,
                    subscribe,
                    onConnect: async ({token}, webSocket, context) => {
                        if (!token) {
                            throw new Error("You can't listen.");
                        }
                        const loggedInUser = await getUser(token);
                        console.log("Connected!");
                        return {
                            loggedInUser,
                            client
                        }

                    },
                    onDisconnect: (webSocket, context) => {
                        console.log("Disconnected!");
                    },
                },
                {
                    server: httpServer,
                    path: server.graphqlPath,
                }
            )
        ;

        const PORT = process.env.PORT;
        httpServer.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`));
    }
;
startServer();