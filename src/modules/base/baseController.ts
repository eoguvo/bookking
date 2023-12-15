import { contextType } from "../../config/config.interface";
import { BaseService } from "./baseService";

export abstract class BaseController<T> {
    
    constructor(public service: BaseService<T>) {}

    abstract findById(ctx: contextType<T>): Promise<void>;

    abstract findAll(ctx: contextType<T>): Promise<void>;

    abstract create(ctx: contextType<T>): Promise<void>;

    abstract update(ctx: contextType<T>): Promise<void>;

    abstract delete(ctx: contextType<T>): Promise<void>;

}