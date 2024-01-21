import { Context, Next } from "koa";

import ServiceError from "@/errors/serviceError";

const consoleColor = {

    reset: "\u001B[49m\x1b[0m",

    red: "\x1b[31m",

    green: "\x1b[32m"

};

export async function errorHandle(context: Context, next: Next) {

    try {

        await next();

    }

    catch (error) {

        const { method, url } = context;


        const hasMessage = error && typeof error === "object" && "message" in error;

        const message = (hasMessage) ? error.message : "no_message";


        const header = `${consoleColor.green} [${ method }] ${consoleColor.reset} ${ url }`;

        const body = `${consoleColor.red} ${ message } ${consoleColor.reset}`;

        console.log(`${ header } - ${ body }`);


        const isExpectedError = (error instanceof ServiceError);

        if (!isExpectedError) {

            context.status = 500;

            return { status: 500, message: "Oops, something went wrong", result: null, errors: []};

        }

        const statusFromReason = {

            "VALIDATION": 422,

            "UNIQUE": 409,

            "UNAUTHORIZED": 401

        };

        const status = statusFromReason[error.reason];

        context.status = status;
        
        return { status, message: error.message, result: null, errors: error.errors };

    }

}