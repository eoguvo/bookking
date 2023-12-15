import Router from "@koa/router";

import { usersRouter } from "./modules/users";

const router = new Router();

const appRouters = [ usersRouter ];

appRouters.forEach(function(appRouter) {

    router
        .use(appRouter.routes())
        .use(appRouter.allowedMethods());

});

export default router;