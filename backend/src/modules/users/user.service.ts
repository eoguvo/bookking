import bcrypt from "bcryptjs";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { Inject, Service } from "typedi";

import omitField from "@/utils/omitField";
import formatZodError from "@/utils/formatZodError";
import { PrismaErrorCodeUnique } from "@/constants/prisma";
import ServiceError, { REASON } from "@/errors/serviceError";

import userSchema from "@/modules/users/user.schema";
import { UserRepository } from "@/modules/users/user.repository";
import { RefreshTokenService } from "@/modules/refreshToken/refreshToken.service";

@Service("UserService")
export class UserService {

    repository: UserRepository;

    refreshTokenService: RefreshTokenService;

    constructor( @Inject("UserRepository") repository: UserRepository, @Inject("RefreshTokenService") refreshTokenService: RefreshTokenService ) {

        this.repository = repository;

        this.refreshTokenService = refreshTokenService;

    }

    async create(user: Prisma.UserCreateInput) {

        try {

            await userSchema.parseAsync(user);

        }
        
        catch(error) {

            const isValidationError = 
                (error instanceof ZodError);

            console.log({ error });

            if (!isValidationError) {

                throw error;
                
            }

            const targetErrorList = Array.isArray(error) ? error : error.issues || error.errors;

            const errors = targetErrorList.map(formatZodError);

            throw new ServiceError({ errors, message: "Invalid data", name: error.name, reason: REASON.VALIDATION });

        }

        const salt = await bcrypt.genSalt();

        const encryptedPassword = await bcrypt.hash(user.password, salt);

        const userWithEncryptedPassword = { ...user, password: encryptedPassword };

        try {
    
            const createdUser = await this.repository.create(userWithEncryptedPassword);
    
            const userWithoutPassword = omitField(createdUser, "password");
            
            return userWithoutPassword;

        }
        
        catch (error) {

            const isEmailDuplicated = 
                (error instanceof Prisma.PrismaClientKnownRequestError) &&
                (error.code === PrismaErrorCodeUnique);

            if (!isEmailDuplicated) {

                throw error;

            }
            
            throw new ServiceError({
                
                message: "User with this email already exists",
                
                name: error.name,
                
                reason: REASON.UNIQUE,

                errors: [{
                    
                    message: "Email conflicts with another in the database",
                
                    reason: "invalid_email"

                }]
            
            });

        }

    }

    async findById(id: string) {

        const user = await this.repository.findById(id);

        const serializedUser = user ? omitField(user, "password") : null;

        return serializedUser;

    }


    async findAll() {

        const users = await this.repository.findAll();

        const serializedUsers = users.map(function(user) {
            
            return omitField(user, "password");

        });

        return serializedUsers;

    }

    async update(id: string, user: Prisma.UserUpdateInput) {

        return this.repository.update(id, user);

    }

    async delete(id: string) {

        return this.repository.delete(id);

    }

}