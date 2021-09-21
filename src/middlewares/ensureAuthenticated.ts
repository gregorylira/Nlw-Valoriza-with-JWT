import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload{
    sub: string;
}

export function ensureAuthenticated (request: Request, response: Response, next :NextFunction){

    // receber o token
    const authtoken = request.headers.authorization;
    
    // validar se o token esta preenchido
    if(!authtoken){
        return response.status(401).end();
    }

    const token = authtoken.split(" ")[1]

    try {
        // validar se o token é valido
        const { sub } = verify( token, "25de3244523913ea707fcece5bbc92c8" ) as IPayload
        // recuperar informação do usuario
        request.user_id = sub
        return next();
    } catch (err) {
        return response.status(401).end();
    }
    
    
    
}
