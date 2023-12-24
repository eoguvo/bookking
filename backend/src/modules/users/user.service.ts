import { Inject, Service } from "typedi";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";

import { UserRepository } from "./user.repository";
import { PrismaErrorCodeUnique } from "@/constants/prisma";
import ServiceError, { REASON } from "@/errors/serviceError";
import userSchema from "./user.schema";
import { ZodError } from "zod";
import omitField from "@/utils/omitField";
import formatZodError from "@/utils/formatZodError";

@Service("UserService")
export class UserService {

    repository: UserRepository;

    constructor( @Inject("UserRepository") repository: UserRepository ) {

        this.repository = repository;

    }

    async create(user: Prisma.UserCreateInput) {

        try {

            await userSchema.parseAsync(user);

        }
        
        catch(error) {

            const isValidationError = 
                (error instanceof ZodError) &&
                (Array.isArray(error.issues));

            if (!isValidationError) {

                throw error;
                
            }

            const errors = error.issues.map(formatZodError);

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

        return this.repository.findById(id);

    }


    async findAll() {

        return this.repository.findAll();

    }

    async update(id: string, user: Prisma.UserUpdateInput) {

        return this.repository.update(id, user);

    }

    async delete(id: string) {

        return this.repository.delete(id);

    }

}