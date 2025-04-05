import { Request, Response } from "express";
import { FinishSchedoleService } from "../../services/schedule/FinishSchedoService";

class FinishScheduleController{
    async handle(request: Request, responde: Response){
        const user_id = request.user_id;
        const schedule_id = request.query.schedule_id as string;
        

        const finishScheuleService = new FinishSchedoleService();

        const schedule = await finishScheuleService.execute({
            user_id,
            schedule_id
        })
        return responde.json(schedule);
    }
}
export {FinishScheduleController}