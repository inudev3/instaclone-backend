import {getUser, protectResolver} from "./users/users.utils";
import {graphqlUploadExpress} from "graphql-upload";
import express from "apollo-server-express";

require("dotenv").config(); //dotenv는 한번 로드하면 전역임 다른곳에서 import필요 X, process.env에 접근할 수 있음
import {ApolloServer} from "apollo-server"; //최신문법
//DB URL은 절대! 노출시키면 안됨!
import {typeDefs, resolvers} from "./schema";
import client from "./client";


// <- here is the problem
//package.json에서 type:module해도 되지만 node됨버전이 낮으면 지원안함
//babel로 transfile 해주면 낮은 버전의 node.js에서도 사용이 가능해짐
//babel for nodejs: babel  공식문서에 가서 NODE 패키지를 찾아보면 됨
//babel.config.json을 생성하고 dev script를 node에서 babel-node로 바꿔주면 됨

//typedef와 gql파일은 같음

//prisma studio상에서 data를 수정하고 그대로 반영할 수 있다!!!
// 필터링도 할 수 있음 ㅍnp

const PORT = process.env.PORT;


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


server.listen(PORT).then(() => console.log(`Server is running on http://localhost:${PORT}`));

