import prismaClient from "../../prisma";

interface CheckSubscription{
    user_id : string;
}//modulo para verificar o status da assinatura do usuario
class CheckSubscriptionSevice{
    async execute({user_id}: CheckSubscription){

        const status = await prismaClient.user.findFirst({
            where:{
                id: user_id
            },
            select:{
                subscriptions:{
                    select:{
                        id: true,
                        status: true,
                    }
                }
            }
        })

        return status;

    }
}
export {CheckSubscriptionSevice}