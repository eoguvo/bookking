import { Service } from "typedi";
import { Prisma } from "@prisma/client";

import { prisma } from "@/utils/db";

interface IRefreshToken {

    id: string
    expiryDate: Date | string
    createdAt: Date | string
    updatedAt: Date | string
    userId: string

}

@Service("RefreshTokenRepository")
export class RefreshTokenRepository {

    async create(data: { expiryDate: Date, userId: string }): Promise<IRefreshToken> {
        
        return await prisma.refreshToken.create({ data });

    }

    async delete(id: string): Promise<IRefreshToken> {

        return await prisma.refreshToken.delete({

            where: {

                id

            }

        });
        
    }

    async findAll(): Promise<IRefreshToken[]> {

        return await prisma.refreshToken.findMany();
        
    }

    async findById(id: string): Promise<IRefreshToken | null> {

        return await prisma.refreshToken.findFirst({

            where: {

                id: { equals: id }

            }
        
        });
        
    }

    async update(id: string, data: Prisma.RefreshTokenUpdateInput): Promise<IRefreshToken> {

        return await prisma.refreshToken.update({

            where: {

                id

            },

            data
        
        });
        
    }

}