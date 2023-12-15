import { BaseController, BaseService } from "../base/index";
import { IUser, userContextType } from "./user.interface";

export class UserController extends BaseController<IUser> {

    constructor(service: BaseService<IUser>) {

        super(service);

    }

    public async findById(ctx: userContextType): Promise<void> {

        const id = ctx.request.querystring;

        this.service.findById(id);

    }

    public async findAll(): Promise<void> {

        this.service.findAll();

    }

    public async create(ctx: userContextType): Promise<void> {

        const data = ctx.body;

        this.service.create(data);
    }

    public async update(ctx: userContextType): Promise<void> {

        const id = ctx.request.querystring;

        const data = ctx.body;

        this.service.update(id, data);

    }

    public async delete(ctx: userContextType): Promise<void> {

        const id = ctx.request.querystring;

        this.service.delete(id);

    }


}