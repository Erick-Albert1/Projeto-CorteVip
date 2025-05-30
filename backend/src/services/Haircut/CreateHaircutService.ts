import prismaClient from "../../prisma";

interface HaircutRequest{
    user_id: string;
    name: string;
    price: number;
}


class CreateHaircutService{
    async execute({ user_id, name, price}: HaircutRequest){
         if(!name  || !price){
            throw new Error("erro")
         }

         //varificar quantos modelos esse usuário já tem cadastrado
         const myHaircuts = await prismaClient.haircut.count({
            where:{
                user_id: user_id
            }
         })
         //varificar se ele é premium se nao limitar a quantidade.
         const user = await prismaClient.user.findFirst({
            where:{
                id: user_id,
            },
            include:{
                subscriptions: true
            }
         })

         //criar a validação
         if(myHaircuts >=4 && user?.subscriptions?.status !== 'active'){
            throw new Error("não autorizado")
         }



         const haircut = await prismaClient.haircut.create({
            data:{
                name: name,
                price: price,
                user_id: user_id
            }
         })

         return haircut;
    }
} 
export {CreateHaircutService}