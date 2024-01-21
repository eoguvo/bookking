import { Body, Ctx, Delete, Get, JsonController, Param, Post, Put } from "routing-controllers";

import type { BaseContext, Context } from "koa";
import { Prisma } from "@prisma/client";
import { Inject, Service } from "typedi";

import { UserService } from "@/modules/users/user.service";
import { RefreshTokenService } from "../refreshToken/refreshToken.service";

@Service()
@JsonController("/users")
export class UserController {

    service: UserService;

    refreshTokenService: RefreshTokenService;

    constructor( @Inject("UserService") service: UserService, @Inject("RefreshTokenService") refreshTokenService: RefreshTokenService ) {

        this.service = service;

        this.refreshTokenService = refreshTokenService;

    }

    @Get("/:id")
    public async findById(@Param("id") id: string) {

        const user = await this.service.findById(id);

        return { status: 200, message: "User finded", result: user, errors: []};

    }

    @Get("/")
    public async findAll() {

        const users = await this.service.findAll();

        return { status: 200, message: "Users finded", result: users, errors: []};

    }

    @Post("/")
    public async create(@Body() data: Prisma.UserCreateInput, @Ctx() context: Context) {

        const user = await this.service.create(data);

        const refreshToken = await this.refreshTokenService.create(user.id);

        const expires = new Date(refreshToken.expiryDate);

        const cookieOptions = {

            expires,
            
            maxAge: expires.getTime() - Date.now(),
            
            httpOnly: true,

        };

        context.cookies.set("refreshToken", refreshToken.id, cookieOptions);

        return { status: 200, message: "User created", result: user, errors: []};

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