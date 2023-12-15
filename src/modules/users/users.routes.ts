

import { TypeRoutes } from "../../config/config.interface";

import { prisma } from "../../utils/db";

import { IUser } from "./user.interface";
import { UserService } from "./user.service";
import { UserRepostory } from "./user.repository";
import { UserController } from "./user.controller";
import Router from "@koa/router";
import applyRoutes from "../../utils/applyRoutes";

const userRepostory = new UserRepostory(prisma);

const userService = new UserService(userRepostory);

const userController = new UserController(userService);

const userRouter = new Router({ prefix: "users" });

const userRoutes: TypeRoutes<IUser> = [

    { method: "get", path: "/", handler: userController.findAll },

    { method: "get", path: "/:id", handler: userController.findById },

    { method: "post", path: "/", handler: userController.create },

    { method: "patch", path: "/", handler: userController.update },

    { method: "delete", path: "/", handler: userController.delete }

];

applyRoutes(userRouter, userRoutes);

export default userRouter;