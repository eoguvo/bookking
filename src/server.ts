import "reflect-metadata";

import Koa from "koa";

import middlewares from "./middlewares/index";
import router from "./router";

const app = new Koa();

middlewares.forEach(function(middleware) {

    app.use( middleware );

});

app.use( router.routes() ).use( router.allowedMethods() );

export default app;