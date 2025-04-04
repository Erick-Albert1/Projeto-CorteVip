import { Request, Response } from "express";
import { CheckSubscriptionSevice } from "../../services/Haircut/CheckSubscriptionService";

class CheckSubscriptionController{
    async handle(request: Request, response: Response){

        const user_id = request.user_id;

        const checkSubscription = new CheckSubscriptionSevice();

        const status = await checkSubscription.execute({
            user_id
        })

        return response.json(status);

    }
}
export {CheckSubscriptionController}