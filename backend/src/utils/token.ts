import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";

import tokens from "@/config/tokens";

interface IPayload {

    role: Role;

    uid: string;

}

export function signToken(payload: IPayload) {

    return jwt.sign(payload, tokens.privateKey, tokens.signOptions);

}


type callbackData = string | jwt.JwtPayload | undefined;

type callbackError = jwt.VerifyErrors | null;

export function verifyToken(token: string) {

    return new Promise(function(resolve, reject) {

        function tokenCallback(error:  callbackError, data: callbackData) {

            return (error) ? reject(error) : resolve(data);

        }

        jwt.verify(token, tokens.publicKey, tokenCallback);

    });

}