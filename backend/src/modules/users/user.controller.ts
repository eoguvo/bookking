import type { BaseContext, Context } from "koa";
import { Prisma } from "@prisma/client";
import { Inject, Service } from "typedi";
import { Body, Ctx, Delete, Get, JsonController, Param, Post, Put } from "routing-controllers";

import { UserService } from "./user.service";
import ServiceError from "@/errors/serviceError";

@Service()
@JsonController("/users")
export class UserController {

    service: UserService;

    constructor( @Inject("UserService") service: UserService ) {

        this.service = service;

    }

    @Get("/:id")
    public async findById(@Param("id") id: string) {

        const user = await this.service.findById(id);

        return { status: 200, message: "User finded", result: user, errors: []};

    }

    @Get("/")
    public async findAll() {

        console.log(this);

        const users = await this.service.findAll();

        return { status: 200, message: "Users finded", result: users, errors: []};

    }

    @Post("/")
    public async create(@Body() data: Prisma.UserCreateInput, @Ctx() context: Context) {

        try {

            const user = await this.service.create(data);
    
            return { status: 200, message: "User created", result: user, errors: []};

        }

        catch (error) {

            const isExpectedError = (error instanceof ServiceError);

            if (!isExpectedError) {

                context.status = 500;

                return { status: 500, message: "Oops, something went wrong", result: null, errors: []};

            }

            const statusFromReason = {

                "VALIDATION": 422,

                "UNIQUE": 409

            };

            const status = statusFromReason[error.reason];

            context.status = status;

            return { status, message: error.message, result: null, errors: error.errors };

        }

    }

    @Put("/")
    public async update(@Param("id") id: string, @Body() data: Prisma.UserCreateInput) {

        return await this.service.update(id, data);

    }

    @Delete("/")
    public async delete(@Ctx() context: BaseContext) {

        const id = context.querystring;

        return await this.service.delete(id);

    }

}