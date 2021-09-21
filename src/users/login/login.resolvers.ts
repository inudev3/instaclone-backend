import client from "../../client";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import {Resolvers} from "../../types";

const resolvers: Resolvers = {
    Mutation: {
        login: async (_, {username, password}, context) => {
            const user = await client.user.findFirst({where: {username}});
            if (!user) {
                return {
                    ok: false,
                    error: "User not found"
                }
            }
            const matchPassword = await bcrypt.compare(password, user.password); //boolean
            if (!matchPassword) {
                return {
                    ok: false,
                    error: "incorrect password"
                }
            }
            const token = await jwt.sign({id: user.id}, process.env.SECRET_KEY);
            return {
                ok: true,
                token,
            }
            //find user with args.username
            // check password with args.password
            //issue token and send to the user
            // try{}
        }
    }
}
export default resolvers;