import { contextType, nextType } from "../config/config.interface";

const consoleColor = {

    reset: "\u001B[49m\x1b[0m",

    red: "\x1b[31m",

    green: "\x1b[32m"

};

export async function requestLogger({ method, url, response }: contextType<unknown>, next: nextType) {

    await next();

    const responseTime = response.get("X-Response-Time");

    console.log(`${consoleColor.green} [${method}] ${consoleColor.reset} ${url} - ${consoleColor.red} ${responseTime} ${consoleColor.reset}`);

}

export async function setResponseTime(ctx: contextType<unknown>, next: nextType) {

    const start = Date.now();

    await next();

    const responseTime  = Date.now() - start;

    ctx.set("X-Response-Time", `${ responseTime }ms`);


}