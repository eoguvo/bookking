import "reflect-metadata";

import Koa from "koa";

import { RoutingControllersOptions, useContainer, useKoaServer } from "routing-controllers";

import { UserController } from "./modules/users";
import Container from "typedi";
import bodyParser from "koa-bodyparser";

const koa = new Koa();

const serverConfig = { 

    controllers: [ UserController ]

} as RoutingControllersOptions;

koa.use(bodyParser());

useContainer(Container);

const app = useKoaServer(koa, serverConfig);

export default app;