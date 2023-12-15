import { prisma } from "../utils/db";
import { nextType } from "../config/config.interface";

export async function prismaHandleConnection(_: unknown, next: nextType) {

    prisma.$connect();
  
    await next();
  
    prisma.$disconnect();
  
}