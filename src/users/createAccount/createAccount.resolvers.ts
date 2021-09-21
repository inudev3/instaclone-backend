import client from "../../client";
import bcrypt from "bcrypt";
import {Resolvers} from "../../types";

const resolvers: Resolvers = {
    Mutation: {
        createAccount: async (_, { //username과 email은 unique, db에서 중복되면 에러를 내는데, user가 에러를 보기 전에 에러체크함
            firstName,
            lastName,
            username,
            email,
            password,
        }) => {
            //check if username or email is unique
            //prisma client returns promise
            //db에 비밀번호를 저장할 때는 hash로 변환한 상태의 비밀번호를 본다. hash는 단방향 function
            //로그인할 때도 hashing, 계정 생성할 때도 hashing. bcrpyt는 hashing utility
            //on login, bcrypt.compare(pw,hash).then....
            //on create, bcrypt.hash(pw,saltRounds).then...
            try {
                const existingUser = await client.user.findFirst({
                    where: {
                        OR: [
                            {username}, {email}
                        ]
                    }
                });
                if (existingUser) {
                    throw new Error("this username/email is already taken");
                }
                const uglyPassword = await bcrypt.hash(password, 10);
                return client.user.create({
                    data: {
                        username, email, firstName, lastName, password: uglyPassword
                    }
                });
            } catch (e) {
                return e;
            }

            //hash password
            //save and return the user
        },
    }
}
export default resolvers;