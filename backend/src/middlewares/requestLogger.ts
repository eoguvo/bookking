import { Context, Next } from "koa";

const consoleColor = {

    reset: "\u001B[49m\x1b[0m",

    red: "\x1b[31m",

    green: "\x1b[32m"

};

export async function requestLogger({ method, url }: Context, next: Next) {

    const start = Date.now();

    await next();

    const responseTime = Date.now() - start;

    console.log(`${consoleColor.green} [${method}] ${consoleColor.reset} ${url} - ${consoleColor.red} ${responseTime} ${consoleColor.reset}`);

}