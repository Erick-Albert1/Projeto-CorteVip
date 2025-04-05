import prismaClient from "../../prisma";

interface FinishRequest{
    schedule_id: string;
    user_id: string;
}

class FinishSchedoleService{
    async execute({schedule_id, user_id}: FinishRequest){

        if(schedule_id === '' || user_id === ''){
            throw new Error("erro")
        }

        try{
            const bellongsToUser = await prismaClient.service.findFirst({
                where:{
                    id: schedule_id,
                    user_id: user_id
                }
            })
            if(!bellongsToUser){
                throw new Error("não autorizado")
            }

            await prismaClient.service.delete({
                where:{
                    id: schedule_id
                }
            })
            return {message: "Deletado com sucesso!"}

        }catch(err){
            console.log(err);
            throw new Error(err)
        }
    }
}
export {FinishSchedoleService}