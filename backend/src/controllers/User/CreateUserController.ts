
import {Request, response, Response} from 'express'
import { CreateUserService } from '../../services/User/CreateUserService'

class CreateUserController{
    async handle(request: Request, response: Response){
        const { name, email, password} = request.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({
            name,
            email,
            password,
        });

        return response.json(user);
    }
}

export { CreateUserController }