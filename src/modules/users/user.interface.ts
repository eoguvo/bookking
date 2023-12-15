import type { Role as USER_ROLE } from ".prisma/client";
import { contextType } from "../../config/config.interface";

export interface IUser {

    id: string;
    
    email: string;
    
    password: string;
    
    name: string;
    
    role: USER_ROLE;

}

export type userContextType = contextType<IUser>;