import { Request, Response, NextFunction } from "express";
import { verify} from 'jsonwebtoken'

interface PayLoad{
    sub: string;
}
export function isAthenticated(
    request: Request,
    response: Response,
    next: NextFunction
){


    const authToekn = request.headers.authorization;

    if(!authToekn){
        return response.status(401).end();
    }
    const [, token] = authToekn.split(" ")

    try{

        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        ) as PayLoad;

        request.user_id = sub;

        return next();
    }catch(err){
        return response.status(401).end();
    }
}