import fs from "fs";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {protectResolver} from "../users.utils";
import {GraphQLUpload} from "graphql-upload";
import {Resolvers} from "../../types";
import {uploadS3} from "../../shared/shared.utils";

const resolvers: Resolvers = {
    Upload: GraphQLUpload,
    Mutation: {
        editProfile: protectResolver(async (
            _,
            {firstName, lastName, username, email, password: newPassword, bio, avatar}, {loggedInUser, client}, info
        ) => { //context는 전역 객체, 하지만 resolvers에선 설정할 수 없고 new Apolloserver에서 설정함
            // instead of write token in every mutation, write token in http headers(like cookie)
            let avatarUrl = null;
            if (avatar) {
                avatarUrl = await uploadS3(avatar, loggedInUser.id, "avatars");
                // const {filename, createReadStream} = await avatar;
                // const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
                // const readStream = createReadStream();
                // const writeStream = fs.createWriteStream(process.cwd() + "/uploads/" + newFilename);
                // readStream.pipe(writeStream);
                // avatarUrl = `http://localhost:4000/static/${newFilename}`;
            }
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
                    ...(uglyPassword && {password: uglyPassword}),
                    ...(avatarUrl && {avatar: avatarUrl})
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

