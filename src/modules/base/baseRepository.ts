import { PrismaClient } from "@prisma/client";

export abstract class BaseRepository<T> {

    constructor(public db: PrismaClient) {}

    abstract create(data: T): Promise<T>;
    abstract update(id: string, data: T): Promise<T>;
    abstract delete(id: string): Promise<T>;
    abstract findById(id: string): Promise<T | null>;
    abstract findAll(): Promise<T[]>;

}
  