import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

interface IAuthenticateRequest{
    email: string;
    password: string;
}

class AuthenticateUserService {

    async execute ({email, password}: IAuthenticateRequest){
        const usersRepositories = getCustomRepository(UsersRepositories);

        //verificar se o email existe
        const user = await usersRepositories.findOne({
            email
        });

        if (!user){
            throw new Error ("Email/Password incorrect")
        }

        // verificar se senha esta correta

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error ("Email/Password incorrect")
        }

        //gerar token

        const token = sign({
            email: user.email
        }, "25de3244523913ea707fcece5bbc92c8", {
            subject: user.id,
            expiresIn: "1d"
        })

        return token
    }
}

export { AuthenticateUserService }