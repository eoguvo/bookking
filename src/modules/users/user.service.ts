import { BaseService, BaseRepository } from "../base/index";

export class UserService<TypeUser> extends BaseService<TypeUser> {

    constructor(repository: BaseRepository<TypeUser>) {

        super(repository);

    }

}