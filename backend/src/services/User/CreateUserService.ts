import prismaClient  from "../../prisma";
import { hash} from 'bcryptjs'


interface UserRequest{
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
    async execute({ name, email, password}: UserRequest){
        if(!email){
            throw new Error("Email incorreto")
        }

        const userAlreadyExistis = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(userAlreadyExistis){
            throw new Error("usuário/email não existe")
        }

        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash
            },
            select:{
                id:true,
                name: true,
                email: true,
            }
        })
        return user;

    }
}
export {CreateUserService}