import { Context, Next } from "koa";

import { verifyToken } from "@/utils/token";
import ServiceError, { REASON } from "@/errors/serviceError";

async function authenticate(context: Context, next: Next) {
    const authHeader = context.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {

        throw new ServiceError({
            message: "Missing or invalid authorization token",
            name: "token",
            reason: REASON.UNAUTHORIZED,
            errors: [{ message: "Invalid authorization header", reason: "invalid_header" }]
        });

    }

    const token = authHeader.split(" ")[1];

    try {

        context.user = await verifyToken(token);
        next();

    } catch (error) {

        throw new ServiceError({
            message: "Invalid token",
            name: "token",
            reason: REASON.UNAUTHORIZED,
            errors: [{ message: "Invalid token", reason: "invalid_token" }]
        });

    }
}

export default authenticate;