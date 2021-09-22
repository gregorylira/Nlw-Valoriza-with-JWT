import { Request, Response } from "express";
import { ListUsersService } from "../services/ListUsersService";


class ListUsersController{

    async handle(request: Request, response: Response){
        const listUsers = new ListUsersService();
        const users = await listUsers.execute()

        return response.json(users)

    }
}

export { ListUsersController }