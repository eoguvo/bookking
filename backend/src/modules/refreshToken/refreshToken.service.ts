import { Prisma } from "@prisma/client";
import { Inject, Service } from "typedi";
import { addDays } from "date-fns";

import { RefreshTokenRepository } from "@/modules/refreshToken/refreshToken.repository";

@Service("RefreshTokenService")
export class RefreshTokenService {

    repository: RefreshTokenRepository;

    constructor( @Inject("RefreshTokenRepository") repository: RefreshTokenRepository ) {

        this.repository = repository;

    }

    async create(userId: string) {

        const serializedRefreshToken = { 
            
            userId,
            
            expiryDate: addDays(Date.now(), 7)
        
        };
    
        const createdRefreshToken = await this.repository.create(serializedRefreshToken);
            
        return createdRefreshToken;

    }

    async findById(id: string) {

        const refreshToken = await this.repository.findById(id);

        return refreshToken;

    }


    async findAll() {

        const refreshTokens = await this.repository.findAll();

        return refreshTokens;

    }

    async update(id: string, data: Prisma.RefreshTokenUpdateInput) {

        return this.repository.update(id, data);

    }

    async delete(id: string) {

        return this.repository.delete(id);

    }

}