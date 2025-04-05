import { Response, Request } from "express";
import { ListHaircutService } from "../../services/Haircut/ListHaircutService";
import { ListScheduleSevice } from "../../services/schedule/ListScheduleService";

class ListScheduleController{
    async handle(request:Request, response: Response){
        const user_id = request.user_id;

        const listSchedule = new ListScheduleSevice;

        const schedule = await listSchedule.execute({
            user_id
        })
        return response.json(schedule);
    }
}
export {ListScheduleController}