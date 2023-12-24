import { Prisma, Role } from "@prisma/client";
import { Service } from "typedi";
import { prisma } from "@/utils/db";

interface IUser {

    id: string;
    email: string;
    password: string;
    name: string;
    role: Role;

}

@Service("UserRepository")
export class UserRepository {

    async create(data: Prisma.UserCreateInput): Promise<IUser> {
        
        return await prisma.user.create({ data });

    }

    async delete(id: string): Promise<IUser> {

        return await prisma.user.delete({

            where: {

                id

            }

        });
        
    }

    async findAll(): Promise<IUser[]> {

        return await prisma.user.findMany();
        
    }

    async findById(id: string): Promise<IUser | null> {

        return await prisma.user.findFirst({

            where: {

                id: { equals: id }

            }
        
        });
        
    }

    async update(id: string, data: Prisma.UserUpdateInput): Promise<IUser> {

        return await prisma.user.update({

            where: {

                id

            },

            data
        
        });
        
    }

}