import { PrismaClient } from "@prisma/client";
import { BaseRepository } from "../base/index";
import { IUser } from "./user.interface";

export class UserRepostory extends BaseRepository<IUser> {

    constructor(db: PrismaClient) {

        super(db);

    }

    async create(data: IUser): Promise<IUser> {
        
        return await this.db.user.create({ data });

    }

    async delete(id: string): Promise<IUser> {

        return await this.db.user.delete({

            where: {

                id

            }

        });
        
    }

    async findAll(): Promise<IUser[]> {

        return await this.db.user.findMany();
        
    }

    async findById(id: string): Promise<IUser | null> {

        return await this.db.user.findFirst({

            where: {

                id: { equals: id }

            }
        
        });
        
    }

    async update(id: string, data: IUser): Promise<IUser> {

        return await this.db.user.update({

            where: {

                id

            },

            data
        
        });
        
    }

}