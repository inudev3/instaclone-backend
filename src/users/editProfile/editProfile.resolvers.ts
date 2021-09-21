import client from "../../client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {protectResolver} from "../users.utils";
import {Resolvers} from "../../types";
import {GraphQLUpload} from "graphql-upload";

const resolvers: Resolvers = {
    Mutation: {
        editProfile: protectResolver(async (
            _,
            {firstName, lastName, username, email, password: newPassword, bio, avatar}, {loggedInUser}, info
        ) => { //context는 전역 객체, 하지만 resolvers에선 설정할 수 없고 new Apolloserver에서 설정함
            // instead of write token in every mutation, write token in http headers(like cookie)
            console.log(avatar);
            let uglyPassword = null;
            if (newPassword) {
                uglyPassword = await bcrypt.hash(newPassword, 10);
            }
            const updatedUser = await client.user.update({
                where: {
                    id: loggedInUser.id,
                },
                data: {
                    firstName,
                    lastName,
                    username,
                    email,
                    bio,

                    ...(uglyPassword && {password: uglyPassword})
                },
            });
            if (updatedUser.id) {
                return {ok: true}
            } else {
                return {ok: false, error: "Could not update profile"}
            }
        }),
    },
};
export default resolvers;