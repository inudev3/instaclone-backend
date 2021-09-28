import * as jwt from "jsonwebtoken";
import client from "../client";


export const getUser = async (token) => {
    try {
        if (!token) {
            return null;
        }
        const verifiedToken: any = await jwt.verify(token, process.env.SECRET_KEY);
        if ("id" in verifiedToken) {
            const user = await client.user.findUnique({where: {id: verifiedToken["id"]}});
            return user ? user : null;
        }
    } catch (error) {
        return null;
    }
}

export const protectResolver = (ourResolver) => (root, args, context, info) => { //currying function으로 resolver의
    // context가 로그인 되어있는지 체크
    if (!context.loggedInUser) {
        const {operation} = info.operation;
        if (operation === "query") {
            return null;
        } else {
            return {
                ok: false,
                error: "Please log in to perform this action",
            }
        }
    }

    return ourResolver(root, args, context, info);
}