import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";


class ListUsersService {

    async execute(){
        const listUsers = getCustomRepository(UsersRepositories)
        const users = await listUsers.find()

        return classToPlain(users)
    }
}

export { ListUsersService }